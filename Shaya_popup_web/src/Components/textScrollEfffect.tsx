import { useRef, useEffect, useState, type ReactNode } from 'react';

export interface ScrollRevealProps {
  children: ReactNode;
  effect?: 'highlight' | 'move';
  className?: string;
  highlightColor?: string;
  [key: string]: any;
}

export default function ScrollReveal({
  children,
  effect = 'highlight' || 'move',
  className = '',
  highlightColor = 'yellow',
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const triggerDistance = window.innerHeight * 0.8;
      if (rect.top < triggerDistance) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const style =
    effect === 'highlight'
      ? { background: isVisible ? highlightColor : 'none', transition: 'background 1s' }
      : effect === 'move'
      ? { transform: isVisible ? 'translateY(0)' : 'translateY(30px)', opacity: isVisible ? 1 : 0, transition: 'all 1s' }
      : {};

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  );
}
