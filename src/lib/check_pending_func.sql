-- Function to check if a user has any pending inbound transactions
-- This is SECURITY DEFINER to allow checking other users' transaction states without exposing the rows.

create or replace function has_pending_inbound(check_user_id uuid)
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1 
    from transactions 
    where recipient_id = check_user_id 
    and status = 'Pending'
  );
end;
$$;
