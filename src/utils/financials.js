export const calculateWalletBalance = (assets) => {
    if (!assets || assets.length === 0) {
        return {
            total: 0,
            currency: "USD",
            change24h: 0
        };
    }

    // Calculate Total Balance
    const totalBalance = assets.reduce((acc, asset) => acc + (asset.balance * asset.price), 0);

    // Calculate Weighted Average 24h Change
    const weightedChange = assets.reduce((acc, asset) => {
        const assetValue = asset.balance * asset.price;
        return acc + (asset.change24h * (assetValue / totalBalance));
    }, 0);

    return {
        total: totalBalance,
        currency: "USD",
        change24h: parseFloat(weightedChange.toFixed(2)),
    };
};

export const calculatePendingBalance = (transactions) => {
    if (!transactions || transactions.length === 0) return 0;

    // We need market data to calculate value if it's 0. 
    // Ideally this should be passed in or available. 
    // For now, we'll assume the transaction object might have been enhanced or we used a fixed logic.
    // Actually, AppContext enhancement is better. But let's import dummy data here as a fallback or assume 
    // AppContext normalizes it. 
    // Best approach: Update AppContext to fill in 'value' using marketCoins.

    return transactions
        .filter(tx => tx.status === "Pending" && tx.type === "Receive")
        .reduce((acc, tx) => acc + (tx.value || 0), 0);
};
