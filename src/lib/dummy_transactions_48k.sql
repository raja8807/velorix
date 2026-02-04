-- Insert Dummy Transactions for User 06c747ca-8ccf-4e4b-bc22-6a6752548e9d
-- Designed to match approximate balances:
-- BTC: 0.26 | ETH: 6.65 | SOL: 82.0 | USDT: 5045.0
-- NO Pending transactions.

INSERT INTO transactions (user_id, type, asset, amount, value, status, date, sender, recipient) VALUES

-- BTC Flow (Net 0.26)
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'BTC', 0.30, 19500.00, 'Completed', NOW() - INTERVAL '5 days', '0xBTC...WalletA', NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Send', 'BTC', 0.04, 2600.00, 'Completed', NOW() - INTERVAL '2 days', NULL, '0xBTC...Merchant'),

-- ETH Flow (Net 6.65)
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'ETH', 5.00, 10000.00, 'Completed', NOW() - INTERVAL '10 days', 'Coinbase', NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'ETH', 2.00, 4000.00, 'Completed', NOW() - INTERVAL '1 week', '0xETH...Friend', NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Send', 'ETH', 0.35, 700.00, 'Completed', NOW() - INTERVAL '3 days', NULL, '0xETH...Service'),

-- SOL Flow (Net 82.0)
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Buy', 'SOL', 100.00, 6000.00, 'Completed', NOW() - INTERVAL '2 weeks', NULL, NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Send', 'SOL', 18.00, 1080.00, 'Completed', NOW() - INTERVAL '1 day', NULL, '0xSOL...External'),

-- USDT Flow (Net 5045.0)
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'USDT', 2000.00, 2000.00, 'Completed', NOW() - INTERVAL '1 month', 'Binance P2P', NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'USDT', 3500.00, 3500.00, 'Completed', NOW() - INTERVAL '2 weeks', 'Kraken', NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Send', 'USDT', 455.00, 455.00, 'Completed', NOW() - INTERVAL '12 hours', NULL, 'Online Store'),

-- Failed Transactions (History only, no balance effect)
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Receive', 'USDT', 1000.00, 1000.00, 'Failed', NOW() - INTERVAL '4 days', 'Unknown', NULL),
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'Send', 'ETH', 10.00, 20000.00, 'Failed', NOW() - INTERVAL '6 days', NULL, '0xETH...Invalid');
