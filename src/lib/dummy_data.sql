-- Insert Dummy Assets for User 06c747ca-8ccf-4e4b-bc22-6a6752548e9d
INSERT INTO user_assets (user_id, symbol, name, balance, avg_buy_price) VALUES
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'BTC', 'Bitcoin', 0.45, 65000.00),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'ETH', 'Ethereum', 4.20, 3200.00),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'USDT', 'Tether', 5430.00, 1.00),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'SOL', 'Solana', 150.00, 85.00);

-- Insert Dummy Transactions for User 06c747ca-8ccf-4e4b-bc22-6a6752548e9d
INSERT INTO transactions (user_id, type, asset, amount, value, status, date, sender, recipient) VALUES
-- Recent Received
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'BTC', 0.05, 3400.00, 'Completed', NOW() - INTERVAL '2 hours', '0x123...abc', NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'USDT', 1000.00, 1000.00, 'Completed', NOW() - INTERVAL '1 day', 'Binance', NULL),

-- Recent Sent
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Send', 'ETH', 0.5, 1600.00, 'Completed', NOW() - INTERVAL '2 days', NULL, '0x456...def'),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Send', 'USDT', 50.00, 50.00, 'Completed', NOW() - INTERVAL '3 days', NULL, 'Merchant Service'),

-- Swaps
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Swap', 'SOL', 20.00, 1800.00, 'Completed', NOW() - INTERVAL '5 days', NULL, NULL),

-- Pending Transactions
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'BTC', 0.1, 6800.00, 'Pending', NOW() - INTERVAL '30 minutes', '0x789...xyz', NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'ETH', 2.0, 6400.00, 'Pending', NOW() - INTERVAL '1 hour', 'Coinbase', NULL),

-- Older Transactions
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Buy', 'BTC', 0.5, 30000.00, 'Completed', NOW() - INTERVAL '1 month', NULL, NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Sell', 'SOL', 50.00, 4000.00, 'Completed', NOW() - INTERVAL '2 months', NULL, NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'USDT', 500.00, 500.00, 'Failed', NOW() - INTERVAL '3 months', 'Unknown', NULL);
