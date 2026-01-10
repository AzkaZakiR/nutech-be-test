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
