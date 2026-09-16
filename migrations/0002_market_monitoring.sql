create table if not exists market_monitor_state (
  id integer primary key default 1,
  source text not null default 'OANDA',
  instrument text not null,
  last_price numeric not null default 0,
  updated_at timestamptz not null default now(),
  scan_count integer not null default 0,
  new_signals integer not null default 0,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists market_analyses (
  id bigserial primary key,
  signal_id text not null unique,
  setup_id text not null,
  instrument text not null,
  timeframe text not null,
  direction text not null,
  entry numeric not null,
  sl numeric not null,
  tp numeric not null,
  strategy_match numeric not null,
  ai_match numeric,
  risk_score numeric,
  verdict text not null,
  created_at timestamptz not null default now(),
  evaluated_at timestamptz,
  outcome text,
  outcome_price numeric,
  outcome_reason text,
  payload jsonb not null default '{}'::jsonb
);

create index if not exists market_analyses_created_at_idx on market_analyses(created_at);
create index if not exists market_analyses_outcome_idx on market_analyses(outcome);
