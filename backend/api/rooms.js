// Rooms inventory API handler
module.exports = (req, res) => {
  const rooms = [
    {
      id: 'single',
      type: 'Single Occupancy',
      price: 15500,
      acSurcharge: 2000,
      period: 'month',
      tag: 'Most Private',
      availability: '2 Rooms Left',
      description: 'Ideal for professionals & scholars seeking total privacy and dedicated workspace.',
      features: [
        'Private Single Bedroom',
        'Attached Private Modern Bathroom',
        'Air Conditioning & High-Speed WiFi',
        'Dedicated Study Desk & Ergonomic Chair',
        'Full Wardrobe with Key Lock',
        '3 Nutritious Homely Meals Daily',
        'Daily Room Housekeeping'
      ],
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800'
    },
    {
      id: 'double',
      type: 'Double Sharing',
      price: 9500,
      acSurcharge: 2000,
      period: 'month',
      tag: 'Most Popular',
      availability: '4 Beds Available',
      description: 'Spacious sharing room with comfortable private corners for young professionals.',
      features: [
        '2 Separate Single Orthopedic Beds',
        'Attached/Shared Modern Bath with Geyser',
        '100 Mbps Dual-Band Fiber WiFi',
        'Individual Secure Lockers & Study Desks',
        '3 Fresh Homely Meals Daily',
        'Daily Room Housekeeping & Fresh Linen'
      ],
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800'
    },
    {
      id: 'triple',
      type: 'Triple Sharing',
      price: 7500,
      acSurcharge: 2000,
      period: 'month',
      tag: 'Great Value',
      availability: 'Instant Move-in',
      description: 'Balanced living with study zones, friendly peers, and complete amenities.',
      features: [
        '3 Ergonomic Beds with Premium Mattresses',
        'High-Speed WiFi Included',
        'Personal Secure Storage & Wardrobe',
        'Air Cooling & 100% DG Power Backup',
        '3 Homely Meals Daily',
        'Washing Machine & Laundry Access'
      ],
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800'
    },
    {
      id: 'quadruple',
      type: 'Quadruple Sharing',
      price: 6500,
      acSurcharge: 2000,
      period: 'month',
      tag: 'Budget Friendly',
      availability: 'Available Now',
      description: 'Maximum savings with all full PG amenities and zero compromise on hygiene.',
      features: [
        '4 Individual Single Beds',
        'Personal Key Lockers',
        '100 Mbps High-Speed WiFi',
        'Hot Water Geyser & Daily Cleaning',
        '3 Nutritious Meals Daily',
        '24/7 Security & Biometric Gate Access'
      ],
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800'
    }
  ];

  res.status(200).json({ success: true, count: rooms.length, data: rooms });
};
