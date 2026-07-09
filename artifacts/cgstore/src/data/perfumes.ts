import bleuDeChanelImg from '../assets/bleu-de-chanel.jpg';
import sauvageImg from '../assets/sauvage.jpg';
import goodGirlImg from '../assets/good-girl.jpg';
import blackOpiumImg from '../assets/black-opium.jpg';
import ckOneImg from '../assets/ck-one.jpg';
import laVieEstBelleImg from '../assets/la-vie-est-belle.jpg';

export type PerfumeVariant = {
  ml: number;
  price: number;
};

export type Perfume = {
  id: number;
  name: string;
  brand: string;
  gender: 'Hombre' | 'Mujer' | 'Unisex';
  description: string;
  variants: PerfumeVariant[];
  imagePath?: string;
};

export const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Bleu de Chanel",
    brand: "CHANEL",
    gender: "Hombre",
    description: "Frescura cítrica con fondo de madera y almizcle",
    variants: [
      { ml: 30, price: 89 },
      { ml: 50, price: 130 },
      { ml: 100, price: 185 },
    ],
    imagePath: bleuDeChanelImg,
  },
  {
    id: 2,
    name: "Sauvage",
    brand: "DIOR",
    gender: "Hombre",
    description: "Fresco y crudo, con notas de bergamota y ambroxan",
    variants: [
      { ml: 30, price: 79 },
      { ml: 50, price: 115 },
      { ml: 100, price: 160 },
    ],
    imagePath: sauvageImg,
  },
  {
    id: 3,
    name: "Good Girl",
    brand: "CAROLINA HERRERA",
    gender: "Mujer",
    description: "Dualidad femenina de tuberosa y cacao oscuro",
    variants: [
      { ml: 30, price: 72 },
      { ml: 50, price: 105 },
      { ml: 80, price: 145 },
    ],
    imagePath: goodGirlImg,
  },
  {
    id: 4,
    name: "Black Opium",
    brand: "YVES SAINT LAURENT",
    gender: "Mujer",
    description: "Adictiva mezcla de café negro, vainilla y jazmín blanco",
    variants: [
      { ml: 30, price: 78 },
      { ml: 50, price: 112 },
      { ml: 90, price: 155 },
    ],
    imagePath: blackOpiumImg,
  },
  {
    id: 5,
    name: "CK One",
    brand: "CALVIN KLEIN",
    gender: "Unisex",
    description: "Icónico fresco unisex con té verde y mandarina",
    variants: [
      { ml: 50, price: 55 },
      { ml: 100, price: 85 },
      { ml: 200, price: 120 },
    ],
    imagePath: ckOneImg,
  },
  {
    id: 6,
    name: "La Vie Est Belle",
    brand: "LANCÔME",
    gender: "Mujer",
    description: "Iris y praliné con un corazón de jazmín y naranja",
    variants: [
      { ml: 30, price: 82 },
      { ml: 50, price: 118 },
      { ml: 75, price: 148 },
    ],
    imagePath: laVieEstBelleImg,
  },
];
