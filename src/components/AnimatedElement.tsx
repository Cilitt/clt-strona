import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.2,
  as: Component = 'div'
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, delay });

  return (
    <Component
      ref={ref}
      className={`${className} ${
        isVisible
          ? 'animate-in'
          : 'opacity-0 translate-y-5'
      } transition-all duration-700 ease-out`}
    >
      {children}
    </Component>
  );
};