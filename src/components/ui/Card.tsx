'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'custom';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', hoverable = false, children, ...props }, ref) => {
    // 'custom' variant는 className에서 배경색을 지정할 때 사용
    const variants = {
      default: 'bg-white',
      outlined: 'bg-white border-2 border-idus-black-10',
      elevated: 'bg-white shadow-lg',
      custom: 'shadow-lg', // 배경색 없음 - className에서 지정
    };
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    
    const hoverStyles = hoverable 
      ? 'transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 cursor-pointer active:translate-y-0 active:shadow-lg' 
      : 'transition-shadow duration-300';
    
    return (
      <div
        ref={ref}
        className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
        role={hoverable ? 'button' : undefined}
        tabIndex={hoverable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

