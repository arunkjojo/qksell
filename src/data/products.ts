import { Product } from '@common/types';

// SELECT p.Id AS post_id, p.Title AS title, p.PostRate AS price, p.Description AS description, c.Name AS category, l.Name AS location, p.CreatedAt AS createdAt, u.Id AS seller_id, u.Name AS seller_name, pa.AssetUrl AS image_url, CASE WHEN p.OrderCreateType = 'paid' OR p.OrderCreateType != 'free' THEN TRUE ELSE FALSE END AS featured FROM post p JOIN users u ON p.UserId = u.Id LEFT JOIN locations l ON p.LocationId = l.Id LEFT JOIN category c ON p.CategoryId = c.Id LEFT JOIN post_assets pa ON p.Id = pa.PostId WHERE p.PostStatus = 'Approved';

export const products: Product[] = [
  {
    id: '1',
    title: 'Luxury Apartment at Prime Location',
    price: 2500000,
    description: 'Spacious 3 bedroom luxury apartment with modern amenities in a prime location with beautiful views.',
    category: 'House - Apartments',
    location: {
      id: '1',
      name: 'Downtown',
    },
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    ],
    seller: {
      id: 'seller1',
      name: 'John Doe',
    },
    createdAt: '2023-10-15T09:30:00Z',
    featured: true,
  },
  {
    id: '2',
    title: 'Commercial Land for Sale',
    price: 1500000,
    description: 'Prime commercial land available for business development. Great investment opportunity.',
    category: 'Land - Plots',
    location: {
      id: '2',
      name: 'Business District',
    },
    images: [
      'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg',
      'https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg',
    ],
    seller: {
      id: 'seller2',
      name: 'Jane Smith',
    },
    createdAt: '2023-10-12T14:45:00Z',
  },
  {
    id: '3',
    title: 'Mountain Bike in Great Condition',
    price: 450,
    description: 'High-quality mountain bike with minimal usage. Perfect for trails and off-road rides.',
    category: 'Bikes',
    location: {
      id: '3',
      name: 'West End',
    },
    images: [
      'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
      'https://images.pexels.com/photos/2158761/pexels-photo-2158761.jpeg',
    ],
    seller: {
      id: 'seller3',
      name: 'Mike Johnson',
    },
    createdAt: '2023-10-10T11:20:00Z',
  },
  {
    id: '4',
    title: '2020 Tesla Model 3',
    price: 42000,
    description: 'Well-maintained Tesla Model 3 with all premium features and autopilot capabilities.',
    category: 'Cars',
    location: {
      id: '4',
      name: 'Eastside',
    },
    images: [
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg',
      'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg',
    ],
    seller: {
      id: 'seller4',
      name: 'Sara Wilson',
    },
    createdAt: '2023-10-08T16:50:00Z',
    featured: true,
  },
  {
    id: '5',
    title: 'Cargo Van for Sale',
    price: 18000,
    description: 'Reliable cargo van perfect for business or personal use. Low mileage and well maintained.',
    category: 'Vehicles',
    location: {
      id: '5',
      name: 'North End',
    },
    images: [
      'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
      'https://images.pexels.com/photos/12060562/pexels-photo-12060562.jpeg',
    ],
    seller: {
      id: 'seller5',
      name: 'Robert Brown',
    },
    createdAt: '2023-10-05T10:15:00Z',
  },
  {
    id: '6',
    title: 'Residential Plot in Gated Community',
    price: 950000,
    description: 'Beautiful residential plot in a secure gated community with all amenities and great neighborhood.',
    category: 'Land - Plots',
    location: {
      id: '6',
      name: 'Suburbs',
    },
    images: [
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
      'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
    ],
    seller: {
      id: 'seller6',
      name: 'Emily Davis',
    },
    createdAt: '2023-10-03T09:45:00Z',
  },
  {
    id: '7',
    title: 'Vintage Racing Bike',
    price: 850,
    description: 'Classic vintage racing bike in excellent condition. Collector\'s item with original parts.',
    category: 'Bikes',
    location: {
      id: '7',
      name: 'Old Town',
    },
    images: [
      'https://images.pexels.com/photos/545004/pexels-photo-545004.jpeg',
      'https://images.pexels.com/photos/5485161/pexels-photo-5485161.jpeg',
    ],
    seller: {
      id: 'seller7',
      name: 'Alex Turner',
    },
    createdAt: '2023-10-01T13:30:00Z',
  },
  {
    id: '8',
    title: 'Beach House with Ocean View',
    price: 3800000,
    description: 'Stunning beach house with direct ocean views. Modernly furnished with premium finishes.',
    category: 'House - Apartments',
    location: {
      id: '8',
      name: 'Coastal Area',
    },
    images: [
      'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg',
      'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg',
    ],
    seller: {
      id: 'seller8',
      name: 'Sophia Miller',
    },
    createdAt: '2023-09-28T15:20:00Z',
    featured: true,
  },
];