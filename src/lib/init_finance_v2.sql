-- Table: user_assets (As requested)
create table if not exists user_assets (
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


-- Table: transactions (Updated for Internal Transfers)
-- Dropping existing if strictly needed to rebuild, or use ALTER commands if preserving data.
-- For development, we'll define the ideal full schema here.

create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null, -- The creator of the transaction record
  type text not null, -- 'Receive', 'Send', 'Swap', 'Buy', 'Sell', 'Transfer'
  asset text not null,
  amount numeric not null,
  value numeric,
  status text default 'Completed', -- 'Pending', 'Completed', 'Failed', 'Declined'
  date timestamp with time zone default timezone('utc'::text, now()),
  
  -- Tracking participants
  sender_id uuid references auth.users(id),
  recipient_id uuid references auth.users(id),
  
  sender text, -- text fallback or display name
  recipient text, -- text fallback or display name
  
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for transactions
alter table transactions enable row level security;

-- Allow users to view transactions where they are the creator, sender, OR recipient
create policy "Users can view involved transactions"
  on transactions for select
  using ( 
    auth.uid() = user_id 
    OR auth.uid() = sender_id 
    OR auth.uid() = recipient_id 
  );

create policy "Users can insert own transactions"
  on transactions for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own transactions"
  on transactions for update
  using ( auth.uid() = user_id );
