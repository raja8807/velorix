export const userProfile = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    walletAddress: "0x71C...9A23",
    joined: "March 2023",
    previousSubscriptionExpired: "2023-10-25",
    previousSubscription: "VIP-2",
    currentSubscription: "VIP-0",
};

// Assets Data
export const userAssets = [
    {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        balance: 0.45,
        price: 77485.00,
        change24h: -20.4, // percentage
    },
    {
        id: 2,
        name: "Ethereum",
        symbol: "ETH",
        balance: 4.20,
        price: 2250.00,
        change24h: 1.8,
    },
    {
        id: 3,
        name: "Tether",
        symbol: "USDT",
        balance: 5430.00,
        price: 1.00,
        change24h: 0.0,
    },
    {
        id: 4,
        name: "Solana",
        symbol: "SOL",
        balance: 150.00,
        price: 98.00,
        change24h: -1.2,
    }
];

// Calculations moved to src/utils/financials.js

export const transactions = [
    // BTC: 0.5 - 0.05 = 0.45
    {
        id: "tx1",
        type: "Receive",
        asset: "BTC",
        amount: 0.5,
        value: 17250.00, // Approx value at time
        status: "Completed",
        date: "2023-10-25",
        sender: "0x89...234",
    },
    {
        id: "tx2",
        type: "Send",
        asset: "BTC",
        amount: 0.05,
        value: 1725.00,
        status: "Completed",
        date: "2023-10-26",
        recipient: "0x45...789",
    },

    // ETH: 5.0 - 0.8 = 4.2
    {
        id: "tx3",
        type: "Receive",
        asset: "ETH",
        amount: 5.0,
        value: 9000.00,
        status: "Completed",
        date: "2023-10-22",
        sender: "Binance",
    },
    {
        id: "tx4",
        type: "Send",
        asset: "ETH",
        amount: 0.8,
        value: 1440.00,
        status: "Completed",
        date: "2023-10-24",
        recipient: "0xaa...bbb",
    },

    // USDT: 6000 - 570 = 5430
    {
        id: "tx5",
        type: "Receive",
        asset: "USDT",
        amount: 6000.00,
        value: 6000.00,
        status: "Completed",
        date: "2023-10-20",
        sender: "Kraken",
    },
    {
        id: "tx6",
        type: "Send",
        asset: "USDT",
        amount: 570.00,
        value: 570.00,
        status: "Completed",
        date: "2023-10-21",
        recipient: "Merchant",
    },

    // SOL: 200 - 50 = 150
    {
        id: "tx7",
        type: "Receive",
        asset: "SOL",
        amount: 200.0,
        value: 6500.00,
        status: "Completed",
        date: "2023-10-18",
        sender: "Phantom",
    },
    {
        id: "tx8",
        type: "Swap",
        asset: "SOL",
        amount: 50.0,
        value: 1625.00,
        status: "Completed",
        date: "2023-10-19",
    },

    // Pending (Does not count towards Available Balance)
    {
        id: "tx9",
        type: "Receive",
        asset: "USDT",
        amount: 250.00,
        value: 250.00,
        status: "Pending",
        date: "2023-10-28",
        sender: "0x12...999",
    },
];

export const marketCoins = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price: 34500.00,
        change24h: 1.2,
        marketCap: "670B",
        chartData: [33000, 33500, 33200, 34000, 34500, 34200, 34500],
    },
    {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: 1800.00,
        change24h: -0.5,
        marketCap: "210B",
        chartData: [1820, 1810, 1805, 1800, 1790, 1795, 1800],
    },
    {
        id: "tether",
        name: "Tether",
        symbol: "USDT",
        price: 1.00,
        change24h: 0.0,
        marketCap: "83B",
        chartData: [1.00, 1.00, 0.99, 1.00, 1.00, 1.00, 1.00],
    },
    {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        price: 32.50,
        change24h: 5.4,
        marketCap: "13B",
        chartData: [28, 29, 30, 31, 31.5, 32, 32.5],
    },
];

export const features = [
    {
        id: 1,
        title: "Bank-Grade Security",
        description: "Your assets are protected by industry-leading encryption and cold storage protocols.",
        icon: "security",
    },
    {
        id: 2,
        title: "Lightning Fast",
        description: "Experience zero-latency trading and instant transfers across major networks.",
        icon: "speed",
    },
    {
        id: 3,
        title: "Low Fees",
        description: "Keep more of your profits with our competitive trading and withdrawal fees.",
        icon: "fees",
    },
];
