import { useRef, useState, useCallback, CSSProperties } from 'react';

export const useTilt = (maxTilt = 7) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * maxTilt * 2;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * maxTilt * 2;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`,
      transition: 'transform 0.12s ease-out',
      boxShadow: '0 25px 60px rgba(124, 58, 237, 0.18)',
      willChange: 'transform',
    });
  }, [maxTilt]);

  const onMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      boxShadow: '',
    });
  }, []);

  return { ref, tiltStyle, onMouseMove, onMouseLeave };
};
