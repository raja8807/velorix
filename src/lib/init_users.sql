-- Create a table for public profiles
create table users (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  name text,
  email text,
  avatar text,
  wallet_address text,
  joined text, -- Keeping as text to match dummy data format "March 2023", or typically timestamp
  previous_subscription_expired text,
  previous_subscription text,
  current_subscription text default 'VIP-0'
);

-- Set up Row Level Security (RLS)
alter table users enable row level security;

create policy "Public profiles are viewable by everyone."
  on users for select
  using ( true );

create policy "Users can insert their own profile."
  on users for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on users for update
  using ( auth.uid() = id );

-- Optional: Function to handle new user signup automatically (if using triggers)
-- But we will handle it in the client side as per the plan.
