CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  balance BIGINT DEFAULT 0,
  profile_image VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE banner (
  id SERIAL PRIMARY KEY,
  banner_name VARCHAR(255),
  banner_image VARCHAR(255),
  description TEXT
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  service_code VARCHAR(100) UNIQUE NOT NULL,
  service_name VARCHAR(255),
  service_icon VARCHAR(255),
  service_tariff BIGINT
);
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  service_id INTEGER,
  invoice_number VARCHAR(255) UNIQUE,
  total_amount BIGINT NOT NULL,
  transaction_type VARCHAR(50),
  description TEXT,
  transaction_date TIMESTAMP,
  createdOn TIMESTAMP,

  CONSTRAINT fk_transactions_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_transactions_service
    FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE SET NULL
);

INSERT INTO services (service_code, service_name, service_icon, service_tariff) VALUES
('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000),
('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000),
('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000);

INSERT INTO banner (id, banner_name, banner_image, description) VALUES
(11, 'Promo Ramadhan', 'ramadhan.jpg', 'Nikmati diskon spesial Ramadhan untuk semua produk.'),
(12, 'Diskon Akhir Tahun', 'akhir_tahun.jpg', 'Penawaran menarik menyambut akhir tahun 2026.'),
(13, 'Belanja Hemat', 'belanja_hemat.jpg', 'Hemat lebih banyak dengan promo belanja hemat bulan ini.'),
(14, 'Promo Hari Kemerdekaan', 'hari_kemerdekaan.jpg', 'Rayakan kemerdekaan dengan diskon hingga 50%.'),
(15, 'Flash Sale Akhir Pekan', 'flash_sale.jpg', 'Jangan lewatkan flash sale setiap akhir pekan.'),
(16, 'Promo Spesial Anak', 'promo_anak.jpg', 'Produk anak-anak dengan harga spesial minggu ini.'),
(17, 'Liburan Seru', 'liburan_seru.jpg', 'Persiapkan liburan Anda dengan penawaran paket seru.'),
(18, 'Diskon Online Exclusive', 'online_exclusive.jpg', 'Diskon khusus untuk pembelian melalui toko online kami.');
