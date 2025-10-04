insert into products (name, description, price_cents, image_url, stock) values
('T‑Shirt', 'Soft cotton tee', 1999, 'https://picsum.photos/seed/t/400/300', 100),
('Mug', 'Ceramic mug 350ml', 1299, 'https://picsum.photos/seed/m/400/300', 80),
('Backpack', 'Everyday carry bag', 4999, 'https://picsum.photos/seed/b/400/300', 50)
on conflict do nothing;
