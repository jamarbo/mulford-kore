import type { Product, Category } from '../types';

export const mockCategories: Category[] = [
  { id: 'skincare', name: 'Skincare', description: 'Nourishing care for your skin' },
  { id: 'makeup', name: 'Makeup', description: 'Enhance your natural beauty' },
  { id: 'haircare', name: 'Haircare', description: 'Healthy and shiny hair' },
  { id: 'fragrance', name: 'Fragrance', description: 'Captivating scents' }
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Hydrating Rose Serum',
    description: 'A lightweight serum that deeply hydrates and plumps the skin.',
    price: 45.00,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Water', 'Glycerin', 'Rose Extract', 'Hyaluronic Acid'],
    stock: 50
  },
  {
    id: 'p2',
    name: 'Matte Velvet Lipstick - Ruby',
    description: 'Long-lasting matte lipstick in a bold ruby red shade.',
    price: 28.00,
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Beeswax', 'Castor Oil', 'Pigment Red 57:1'],
    stock: 120
  },
  {
    id: 'p3',
    name: 'Argan Oil Hair Mask',
    description: 'Intensive repairing mask for damaged and dry hair.',
    price: 35.00,
    category: 'haircare',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Water', 'Argania Spinosa Kernel Oil', 'Cetearyl Alcohol'],
    stock: 30
  },
  {
    id: 'p4',
    name: 'Midnight Bloom Eau de Parfum',
    description: 'A sensual and mysterious fragrance with floral and woody notes.',
    price: 85.00,
    category: 'fragrance',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Alcohol Denat', 'Fragrance', 'Water'],
    stock: 20
  },
  {
    id: 'p5',
    name: 'Purifying Clay Mask',
    description: 'Deep cleansing mask that minimizes pores and absorbs excess oil.',
    price: 32.00,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Kaolin Clay', 'Water', 'Charcoal Powder'],
    stock: 80
  },
  {
    id: 'p6',
    name: 'Luminous Foundation',
    description: 'Lightweight foundation for a natural, glowing finish.',
    price: 42.00,
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Water', 'Dimethicone', 'Titanium Dioxide'],
    stock: 65
  }
];