import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Decorative "matrix" code-rain for the dark theme. The caller positions it
 * (via className/style) in the empty side areas so it never sits behind text.
 */
const MatrixRain: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!isDark) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chars = 'アカサタナ0123456789ABCDEFGHJKLMNPQRSTUVWXYZ#$%&<>{}[]*+=/'.split('');
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    let cssW = 0;
    let cssH = 0;

    const setup = () => {
      cssW = canvas.offsetWidth;
      cssH = canvas.offsetHeight;
      // Scale to the screen's pixel ratio so the glyphs stay sharp.
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(cssW / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -cssH / fontSize);
    };

    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    setup();

    let inView = true;
    let active = false;
    let frame = 0;

    const draw = () => {
      frame++;
      // Update every third frame for a calmer pace.
      if (frame % 3 === 0) {
        // Fade the previous frame slightly to leave trailing glyphs.
        ctx.fillStyle = 'rgba(4, 4, 15, 0.10)';
        ctx.fillRect(0, 0, cssW, cssH);
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < columns; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          // Brighter leading glyph, dimmer one just above it.
          ctx.fillStyle = 'rgba(196, 181, 253, 0.85)';
          ctx.fillText(char, x, y);
          ctx.fillStyle = 'rgba(139, 92, 246, 0.45)';
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);

          if (y > cssH && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      if (active) animRef.current = requestAnimationFrame(draw);
    };

    // Pause when off-screen or the tab is hidden, to save battery.
    const start = () => {
      if (!active) {
        active = true;
        animRef.current = requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      active = false;
      cancelAnimationFrame(animRef.current);
    };
    const sync = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={style}
    />
  );
};

export default MatrixRain;
