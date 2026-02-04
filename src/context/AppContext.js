
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';
import { marketCoins } from '@/constants/dummy_data';

const AppContext = createContext();

const COIN_ID_MAP = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'USDT': 'tether',
  'SOL': 'solana'
};

export function AppProvider({ children }) {
  const { user, userData } = useAuth();
  const [assets, setAssets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingFinance, setLoadingFinance] = useState(true);
  const [marketPrices, setMarketPrices] = useState({});

  const fetchMarketPrices = async () => {
    try {
      const ids = Object.values(COIN_ID_MAP).join(',');
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
      const data = await response.json();
      setMarketPrices(data);
      return data;
    } catch (error) {
      console.error("Error fetching market prices:", error);
      return {};
    }
  };

  useEffect(() => {
    fetchMarketPrices();
    // Refresh prices every 2 minutes to avoid rate limits
    const interval = setInterval(fetchMarketPrices, 120000);
    return () => clearInterval(interval);
  }, []);

  const fetchFinanceData = async () => {
    if (!user) {
      setAssets([]);
      setTransactions([]);
      setLoadingFinance(false);
      return;
    }

    setLoadingFinance(true);
    try {
      // 1. Fetch User Assets
      const { data: assetsData, error: assetsError } = await supabase
        .from('user_assets')
        .select('*')
        .eq('user_id', user.id);

      if (assetsError) throw assetsError;

      // Merge with market data
      const mergedAssets = assetsData.map(asset => {
        const coinId = COIN_ID_MAP[asset.symbol];
        const priceData = marketPrices[coinId];

        // Fallback to dummy data if API fails or data not ready
        const dummyData = marketCoins.find(c => c.symbol === asset.symbol) || {};
        const price = priceData?.usd || dummyData.price || 0;
        const change24h = priceData?.usd_24h_change || dummyData.change24h || 0;

        return {
          ...asset,
          price,
          change24h,
          value: (asset.balance || 0) * price
        };
      });
      setAssets(mergedAssets);

      // 2. Fetch Transactions (Involved as Creator, Sender or Recipient)
      // Use .or() syntax correctly: column.operator.value
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .or(`user_id.eq.${user.id},sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('date', { ascending: false });

      if (txError) throw txError;

      // Normalize Transactions
      const normalizedTx = txData.map(tx => {
        let normalized = { ...tx };

        // Calculate Value if 0 using current prices
        if (!normalized.value || normalized.value === 0) {
          const coinId = COIN_ID_MAP[normalized.asset];
          const priceData = marketPrices[coinId];
          const dummyData = marketCoins.find(c => c.symbol === normalized.asset) || {};
          const price = priceData?.usd || dummyData.price || 0;

          normalized.value = (normalized.amount || 0) * price;
        }

        // Persistence logic
        if (normalized.type === 'Transfer') {
          if (normalized.recipient_id === user.id) {
            return { ...normalized, type: 'Receive', sender: normalized.sender || 'Unknown' };
          } else if (normalized.sender_id === user.id) {
            return { ...normalized, type: 'Send', recipient: normalized.recipient || 'Unknown' };
          }
        }
        return normalized;
      });

      setTransactions(normalizedTx);

    } catch (error) {
      console.error("Error fetching finance data:", error);
    } finally {
      setLoadingFinance(false);
    }
  };

  const checkUserByEmail = async (email) => {
    // NOTE: RLS might block this. If it does, we need a secure function.
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('email', email)
      .single();

    if (error) return null;
    return data;
  };

  const checkPendingInbound = async (userId) => {
    const { data, error } = await supabase
      .rpc('has_pending_inbound', { check_user_id: userId });

    if (error) {
      console.error("Error checking pending status:", error);
      return false; // Fail safe? or Fail block? Let's assume false to not block if error, but log it.
    }
    return data; // returns true or false
  };

  const sendTransfer = async ({ asset, amount, recipientId, recipientName }) => {
    // Get current price
    const coinId = COIN_ID_MAP[asset];
    const priceData = marketPrices[coinId];
    const dummyData = marketCoins.find(c => c.symbol === asset) || {};
    const price = priceData?.usd || dummyData.price || 0;

    const estimatedValue = amount * price;

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        user_id: user.id,
        sender_id: user.id,
        recipient_id: recipientId,
        type: 'Transfer',
        asset,
        amount,
        value: estimatedValue,
        status: 'Pending',
        sender: userData?.name || user.email,
        recipient: recipientName,
        date: new Date()
      }])
      .select()
      .single();

    if (!error) {
      fetchFinanceData();
    }
    return { data, error };
  };

  useEffect(() => {
    fetchFinanceData();
  }, [user, marketPrices]); // Re-run when prices update

  return (
    <AppContext.Provider
      value={{
        assets,
        transactions,
        loadingFinance,
        fetchFinanceData,
        checkUserByEmail,
        checkPendingInbound,
        sendTransfer
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
