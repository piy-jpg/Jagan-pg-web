-- ============================================================
-- Jagan PG Database Schema
-- Compatible with PostgreSQL / MySQL / SQLite
-- ============================================================

-- 1. Rooms Inventory Table
CREATE TABLE IF NOT EXISTS rooms (
    id VARCHAR(50) PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL,
    price_monthly NUMERIC(10, 2) NOT NULL,
    capacity INT NOT NULL DEFAULT 1,
    tag VARCHAR(50),
    available_units INT NOT NULL DEFAULT 0,
    description TEXT,
    features JSON,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Visit & Booking Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(150),
    move_in_date DATE,
    room_preference VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'NEW', -- NEW, CONTACTED, SCHEDULED, CONVERTED, CLOSED
    source VARCHAR(50) DEFAULT 'WEBSITE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Residents Table
CREATE TABLE IF NOT EXISTS residents (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(150),
    room_id VARCHAR(50) REFERENCES rooms(id),
    bed_number VARCHAR(20),
    move_in_date DATE NOT NULL,
    monthly_rent NUMERIC(10, 2) NOT NULL,
    deposit_amount NUMERIC(10, 2) DEFAULT 0,
    emergency_contact VARCHAR(25),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Verified Resident Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(150) NOT NULL,
    role VARCHAR(150),
    avatar_url TEXT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
