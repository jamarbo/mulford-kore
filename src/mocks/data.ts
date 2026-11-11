import type { Product, Category } from '../types';

export const mockCategories: Category[] = [
  { id: 'skincare', name: 'Skincare', description: 'Nourishing care for your skin' },
  { id: 'makeup', name: 'Makeup', description: 'Enhance your natural beauty' },
  { id: 'haircare', name: 'Haircare', description: 'Healthy and shiny hair' },
  { id: 'fragrance', name: 'Fragrance', description: 'Captivating scents' }
];

export const mockProducts: Product[] = [
  {
    "id": "p1",
    "name": "Intense Cream",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 26.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 77
  },
  {
    "id": "p2",
    "name": "Essential Concealer",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 43.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 9
  },
  {
    "id": "p3",
    "name": "Revitalizing Scalp Treatment",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 83.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 138
  },
  {
    "id": "p4",
    "name": "Velvet Body Mist",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 38.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 57
  },
  {
    "id": "p5",
    "name": "Silky Cream",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 87.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 97
  },
  {
    "id": "p6",
    "name": "Purifying Lipstick",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 23.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 55
  },
  {
    "id": "p7",
    "name": "Purifying Hair Mask",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 27.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 53
  },
  {
    "id": "p8",
    "name": "Purifying Eau de Parfum",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 20.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 7
  },
  {
    "id": "p9",
    "name": "Velvet Serum",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 47.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 49
  },
  {
    "id": "p10",
    "name": "Velvet Blush",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 21.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 109
  },
  {
    "id": "p11",
    "name": "Divine Conditioner",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 54.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 135
  },
  {
    "id": "p12",
    "name": "Intense Body Mist",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 82.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 86
  },
  {
    "id": "p13",
    "name": "Purifying Cleanser",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 74.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 111
  },
  {
    "id": "p14",
    "name": "Revitalizing Highlighter",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 22.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 47
  },
  {
    "id": "p15",
    "name": "Silky Hair Mask",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 55.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 142
  },
  {
    "id": "p16",
    "name": "Velvet Cologne",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 29.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 90
  },
  {
    "id": "p17",
    "name": "Silky Oil",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 68.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 69
  },
  {
    "id": "p18",
    "name": "Matte Bronzer",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 20.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 104
  },
  {
    "id": "p19",
    "name": "Hydrating Heat Protectant",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 47.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 146
  },
  {
    "id": "p20",
    "name": "Intense Solid Perfume",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 53.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 146
  },
  {
    "id": "p21",
    "name": "Matte Exfoliator",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 59.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 129
  },
  {
    "id": "p22",
    "name": "Hydrating Foundation",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 35.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 133
  },
  {
    "id": "p23",
    "name": "Silky Heat Protectant",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 62.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 62
  },
  {
    "id": "p24",
    "name": "Luminous Perfume Oil",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 68.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 144
  },
  {
    "id": "p25",
    "name": "Silky Cream",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 64.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 49
  },
  {
    "id": "p26",
    "name": "Divine Eyeshadow",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 45.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 66
  },
  {
    "id": "p27",
    "name": "Radiant Heat Protectant",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 83.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 127
  },
  {
    "id": "p28",
    "name": "Radiant Perfume Oil",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 83.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 47
  },
  {
    "id": "p29",
    "name": "Purifying Moisturizer",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 32.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 69
  },
  {
    "id": "p30",
    "name": "Radiant Lipstick",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 24.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 125
  },
  {
    "id": "p31",
    "name": "Intense Shampoo",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 41.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 53
  },
  {
    "id": "p32",
    "name": "Essential Perfume Oil",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 92.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 115
  },
  {
    "id": "p33",
    "name": "Essential Mask",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 93.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 125
  },
  {
    "id": "p34",
    "name": "Purifying Concealer",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 62.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 136
  },
  {
    "id": "p35",
    "name": "Silky Styling Cream",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 34.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 77
  },
  {
    "id": "p36",
    "name": "Intense Body Mist",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 15.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 11
  },
  {
    "id": "p37",
    "name": "Velvet Exfoliator",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 82.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 123
  },
  {
    "id": "p38",
    "name": "Hydrating Concealer",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 90.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 85
  },
  {
    "id": "p39",
    "name": "Intense Hair Mask",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 72.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 99
  },
  {
    "id": "p40",
    "name": "Intense Eau de Toilette",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 28.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 43
  },
  {
    "id": "p41",
    "name": "Revitalizing Moisturizer",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 66.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 21
  },
  {
    "id": "p42",
    "name": "Divine Lipstick",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 47.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 79
  },
  {
    "id": "p43",
    "name": "Divine Hair Oil",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 38.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 56
  },
  {
    "id": "p44",
    "name": "Revitalizing Eau de Parfum",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 74.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 57
  },
  {
    "id": "p45",
    "name": "Luminous Oil",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 55.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 87
  },
  {
    "id": "p46",
    "name": "Matte Bronzer",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 59.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 68
  },
  {
    "id": "p47",
    "name": "Silky Heat Protectant",
    "description": "A premium haircare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 26.99,
    "category": "haircare",
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 63
  },
  {
    "id": "p48",
    "name": "Revitalizing Eau de Parfum",
    "description": "A premium fragrance product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 86.99,
    "category": "fragrance",
    "image": "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 31
  },
  {
    "id": "p49",
    "name": "Divine Toner",
    "description": "A premium skincare product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 57.99,
    "category": "skincare",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 131
  },
  {
    "id": "p50",
    "name": "Matte Highlighter",
    "description": "A premium makeup product designed to elevate your daily routine with high-quality ingredients and proven results.",
    "price": 49.99,
    "category": "makeup",
    "image": "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    "ingredients": [
      "Water",
      "Glycerin",
      "Natural Extracts",
      "Essential Oils"
    ],
    "stock": 27
  }
];
