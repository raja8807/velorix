-- Insert Dummy Data for User 4303202c-15cd-4767-95ed-7beb70b52ca1
-- Target Total: ~$80,000
-- Prices roughly: BTC ~$76k, ETH ~$2.2k, SOL ~$100

-- 1. User Assets
INSERT INTO user_assets (user_id, symbol, name, balance, avg_buy_price) VALUES
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'USDT', 'Tether', 5000.0, 1.00),
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'BTC', 'Bitcoin', 0.46, 68000.00),
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'ETH', 'Ethereum', 11.00, 1950.00),
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'SOL', 'Solana', 150.0, 60.00);

-- 2. Transactions
INSERT INTO transactions (user_id, type, asset, amount, value, status, date, sender, recipient) VALUES

-- BTC Flow (Net 0.46)
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Receive', 'BTC', 0.50, 34000.00, 'Completed', NOW() - INTERVAL '1 month', '0xBTC...WalletMain', NULL),
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Send', 'BTC', 0.04, 2800.00, 'Completed', NOW() - INTERVAL '5 days', NULL, '0xBTC...Payment'),

-- ETH Flow (Net 11.0)
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Receive', 'ETH', 10.00, 19000.00, 'Completed', NOW() - INTERVAL '2 months', 'Coinbase', NULL),
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Buy', 'ETH', 2.00, 4000.00, 'Completed', NOW() - INTERVAL '3 weeks', NULL, NULL),
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Send', 'ETH', 1.00, 2100.00, 'Completed', NOW() - INTERVAL '1 week', NULL, '0xETH...Service'),

-- SOL Flow (Net 150.0)
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Buy', 'SOL', 200.00, 12000.00, 'Completed', NOW() - INTERVAL '3 months', NULL, NULL),
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Send', 'SOL', 50.00, 4500.00, 'Completed', NOW() - INTERVAL '2 days', NULL, '0xSOL...External'),

-- USDT Flow (Net 5000.0)
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Receive', 'USDT', 6000.00, 6000.00, 'Completed', NOW() - INTERVAL '15 days', 'Binance P2P', NULL),
('4303202c-15cd-4767-95ed-7beb70b52ca1', 'Send', 'USDT', 1000.00, 1000.00, 'Completed', NOW() - INTERVAL '1 day', NULL, 'Merchant');
