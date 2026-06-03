import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Star { x: number; y: number; r: number; phase: number; speed: number; }
interface Shooter { x: number; y: number; vx: number; vy: number; tailLen: number; life: number; maxLife: number; }

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shooterRef = useRef<Shooter | null>(null);
  const nextShootRef = useRef<number>(Date.now() + 5000);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setup = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      starsRef.current = Array.from({ length: 170 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.7 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.018,
      }));
    };

    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    setup();

    let running = true;

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isDark) {
        starsRef.current.forEach(s => {
          s.phase += s.speed;
          const alpha = 0.1 + (Math.sin(s.phase) * 0.5 + 0.5) * 0.75;
          ctx.beginPath();
          ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(215, 200, 255, ${alpha})`;
          ctx.fill();
        });

        const now = Date.now();
        if (!shooterRef.current && now >= nextShootRef.current) {
          const angle = (15 + Math.random() * 25) * (Math.PI / 180);
          const speed = 5 + Math.random() * 5;
          shooterRef.current = {
            x: Math.random() * canvas.width * 0.7,
            y: Math.random() * canvas.height * 0.35,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            tailLen: 70 + Math.random() * 80,
            life: 0,
            maxLife: 55 + Math.random() * 30,
          };
        }

        if (shooterRef.current) {
          const s = shooterRef.current;
          s.life++;
          s.x += s.vx;
          s.y += s.vy;

          const t = s.life / s.maxLife;
          const alpha = Math.sin(t * Math.PI) * 0.9;
          const mag = Math.sqrt(s.vx ** 2 + s.vy ** 2);

          ctx.save();
          const grad = ctx.createLinearGradient(
            s.x - (s.vx / mag) * s.tailLen,
            s.y - (s.vy / mag) * s.tailLen,
            s.x, s.y
          );
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          grad.addColorStop(1, `rgba(230,220,255,${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(s.x - (s.vx / mag) * s.tailLen, s.y - (s.vy / mag) * s.tailLen);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
          ctx.restore();

          if (s.life >= s.maxLife || s.x > canvas.width + 50 || s.y > canvas.height + 50) {
            shooterRef.current = null;
            nextShootRef.current = Date.now() + 5000 + Math.random() * 7000;
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

export default StarField;
