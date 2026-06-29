import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Don't render on touch-only devices
  const [isTouchOnly] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  );

  useEffect(() => {
    if (isTouchOnly) return;

    // Hide the native cursor (CSS scoped to fine-pointer devices)
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.11;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouchOnly]);

  if (isTouchOnly) return null;

  const dotColor = isDark ? 'rgba(167,139,250,0.95)' : 'rgba(109,40,217,0.85)';
  const ringBorder = isDark ? 'rgba(167,139,250,0.5)' : 'rgba(109,40,217,0.35)';
  const ringBg = isHovering
    ? isDark ? 'rgba(139,92,246,0.08)' : 'rgba(109,40,217,0.06)'
    : 'transparent';

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          zIndex: 99999,
          width: isHovering ? 5 : 8,
          height: isHovering ? 5 : 8,
          borderRadius: '50%',
          background: dotColor,
          boxShadow: `0 0 8px 2px ${dotColor}`,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.4s ease',
        }}
      />
      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          zIndex: 99998,
          width: isHovering ? 42 : 28,
          height: isHovering ? 42 : 28,
          borderRadius: '50%',
          border: `1.5px solid ${ringBorder}`,
          backgroundColor: ringBg,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.22s ease, height 0.22s ease, border-color 0.3s ease, background-color 0.22s ease, opacity 0.4s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
