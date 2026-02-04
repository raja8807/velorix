-- Create table for User Assets
create table user_assets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  symbol text not null,
  name text not null,
  balance numeric default 0,
  avg_buy_price numeric default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for user_assets
alter table user_assets enable row level security;

create policy "Users can view own assets"
  on user_assets for select
  using ( auth.uid() = user_id );

create policy "Users can update own assets"
  on user_assets for update
  using ( auth.uid() = user_id );

create policy "Users can insert own assets"
  on user_assets for insert
  with check ( auth.uid() = user_id );


-- Create table for Transactions
create table transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  type text not null, -- 'Receive', 'Send', 'Swap', 'Buy', 'Sell'
  asset text not null, -- Symbol, e.g., 'BTC'
  amount numeric not null,
  value numeric, -- USD value at time of transaction
  status text default 'Completed', -- 'Pending', 'Completed', 'Failed', 'Declined'
  date timestamp with time zone default timezone('utc'::text, now()),
  sender text,
  recipient text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for transactions
alter table transactions enable row level security;

create policy "Users can view own transactions"
  on transactions for select
  using ( auth.uid() = user_id );

create policy "Users can insert own transactions"
  on transactions for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own transactions"
  on transactions for update
  using ( auth.uid() = user_id );
