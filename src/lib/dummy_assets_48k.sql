-- Insert Dummy Assets for User 06c747ca-8ccf-4e4b-bc22-6a6752548e9d
-- Target Total: ~$48,000
-- Prices used for calculation (Feb 2026 approx): 
-- BTC: ~$76,500 | ETH: ~$2,260 | SOL: ~$98 | USDT: $1

INSERT INTO user_assets (user_id, symbol, name, balance, avg_buy_price) VALUES
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'USDT', 'Tether', 5045.0, 1.00);      -- Value: $5,045   (Remainder)
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'BTC', 'Bitcoin', 0.26, 65000.00),    -- Value: ~$19,890 (Allocated ~$20k)
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'ETH', 'Ethereum', 6.65, 1800.00),    -- Value: ~$15,029 (Allocated ~$15k)
('06c747ca-8ccf-4e4b-bc22-6a6752548e9d', 'SOL', 'Solana', 82.0, 55.00),        -- Value: ~$8,036  (Allocated ~$8k)

-- Total Value: ~$48,000
