export type TImage = {
  src: string;
  setting: string;
};

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  baseImages: {
    front: string;
    back: string;
  };
  images: {
    front: TImage[];
    back: TImage[];
  };
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
};
