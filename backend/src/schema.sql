create table if not exists users (
  id serial primary key,
  name text not null,
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

create table if not exists products (
  id serial primary key,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  image_url text,
  stock integer not null default 0
);

create table if not exists cart_items (
  id serial primary key,
  user_id integer not null references users(id) on delete cascade,
  product_id integer not null references products(id),
  quantity integer not null check (quantity > 0),
  unique (user_id, product_id)
);

create table if not exists orders (
  id serial primary key,
  user_id integer not null references users(id),
  total_cents integer not null check (total_cents >= 0),
  created_at timestamptz default now()
);

create table if not exists order_items (
  id serial primary key,
  order_id integer not null references orders(id) on delete cascade,
  product_id integer not null references products(id),
  quantity integer not null check (quantity > 0),
  price_cents integer not null check (price_cents >= 0)
);
