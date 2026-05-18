create table if not exists appointments (
  id                       uuid primary key default uuid_generate_v4(),
  name                     text not null,
  email                    text not null,
  phone                    text,
  service                  text not null,
  appointment_date         date not null,
  appointment_time         text not null,
  amount_cents             integer not null default 5000,
  status                   text not null default 'pending',
  stripe_payment_intent_id text unique,
  stripe_session_id        text unique,
  notes                    text,
  created_at               timestamptz default now()
);

alter table appointments enable row level security;

create policy "Public: insert appointment"
  on appointments for insert
  with check (true);

create policy "Service: full access appointments"
  on appointments for all
  using (auth.role() = 'service_role');
