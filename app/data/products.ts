export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 'product-1',
    name: 'Clothing Product 1',
    price: 999,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Clothing',
    rating: 4.5,
    reviews: 120,
    description: 'Beautiful clothing item for your wardrobe.',
    tags: ['clothing', 'fashion', 'trendy', 'casual']
  },
  {
    id: 'product-2',
    name: 'Ornaments Product 1',
    price: 499,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Ornaments',
    rating: 4.2,
    reviews: 85,
    description: 'Elegant ornament to enhance your space.',
    tags: ['ornaments', 'decor', 'home', 'elegant']
  },
  {
    id: 'product-3',
    name: 'Home Decor Product 1',
    price: 799,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Home Decor',
    rating: 4.7,
    reviews: 150,
    description: 'Stylish home decor piece for your living space.',
    tags: ['home decor', 'interior', 'modern', 'stylish']
  },
  {
    id: 'product-4',
    name: 'Furnishing Product 1',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Furnishing',
    rating: 4.3,
    reviews: 95,
    description: 'Comfortable furnishing for your home.',
    tags: ['furnishing', 'furniture', 'comfort', 'home']
  }
]; 