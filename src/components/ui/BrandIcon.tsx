import Image from 'next/image';

export type BrandIconName =
  | 'gift'
  | 'shipping'
  | 'stationery'
  | 'jewelry'
  | 'bag'
  | 'plant'
  | 'food'
  | 'digital'
  | 'camera'
  | 'like'
  | 'best'
  | 'cheer';

const ICON_SRC: Record<BrandIconName, string> = {
  gift: '/brand/brand assets/선물.png',
  shipping: '/brand/brand assets/배송박스.png',
  stationery: '/brand/brand assets/문구사무용품.png',
  jewelry: '/brand/brand assets/주얼리_목걸이.png',
  bag: '/brand/brand assets/가방.png',
  plant: '/brand/brand assets/플랜트.png',
  food: '/brand/brand assets/식품.png',
  digital: '/brand/brand assets/카메라.png',
  camera: '/brand/brand assets/카메라.png',
  like: '/brand/brand assets/좋아요.png',
  best: '/brand/brand assets/최고.png',
  cheer: '/brand/brand assets/힘내요.png',
};

type BrandIconProps = {
  name: BrandIconName;
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
};

export default function BrandIcon({ name, size = 28, className = '', alt = '', priority }: BrandIconProps) {
  return (
    <Image
      src={ICON_SRC[name]}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}




