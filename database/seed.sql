-- ============================================================
-- Jagan PG Seed Data
-- ============================================================

-- Insert Rooms
INSERT INTO rooms (id, type_name, price_monthly, capacity, tag, available_units, description, image_url)
VALUES 
('single', 'Single Occupancy', 9000.00, 1, 'Most Private', 2, 'Ideal for professionals & scholars seeking total privacy.', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800'),
('double', 'Double Sharing', 7000.00, 2, 'Most Popular', 4, 'Spacious sharing room with comfortable private corners.', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800'),
('triple', 'Triple Sharing', 5500.00, 3, 'Great Value', 3, 'Balanced living with study zones and friendly peers.', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800'),
('quadruple', 'Quadruple Sharing', 4500.00, 4, 'Budget Friendly', 5, 'Maximum savings with all full PG amenities included.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800')
ON CONFLICT (id) DO UPDATE SET price_monthly = EXCLUDED.price_monthly;

-- Insert Verified Resident Reviews
INSERT INTO reviews (author_name, role, rating, review_text, is_verified, display_order)
VALUES
('Rahul Sharma', 'Software Engineer • Single Room', 5, 'Clean rooms, fast WiFi, and delicious homely food. The management is polite and resolves any query immediately. Best PG in the area!', true, 1),
('Priya Singh', 'Medical Student • Single Room', 5, 'Safety was my top priority, and Jagan PG provides 24/7 CCTV and secure biometric access. The rooms are spacious and well ventilated.', true, 2),
('Ankit Verma', 'Data Analyst • Double Sharing', 5, 'The quiet study environment and high-speed fiber internet make it super convenient for work from home. Great community vibe here.', true, 3),
('Neha Kapoor', 'UI Designer • Double Sharing', 5, 'Affordable, clean, and truly homely. Daily housekeeping keeps everything spotless, and the hygienic food menu has great variety.', true, 4),
('Aman Gupta', 'Financial Analyst • Triple Sharing', 5, 'Unbeatable value for money. 100% power backup and quick metro access save me hours of commuting every day.', true, 5),
('Sneha Verma', 'Software Developer • Quadruple Sharing', 5, 'Super budget-friendly without any compromise on amenities. The roommate matching was great and I feel completely safe.', true, 6);
