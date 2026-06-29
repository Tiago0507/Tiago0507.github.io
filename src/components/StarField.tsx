import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Star { x: number; y: number; r: number; phase: number; speed: number; depth: number; }
interface Shooter { x: number; y: number; vx: number; vy: number; tailLen: number; life: number; maxLife: number; }
interface Particle { x: number; y: number; vx: number; vy: number; r: number; cyan: boolean; alpha: number; }
interface Mote { x: number; y: number; vx: number; vy: number; r: number; phase: number; }
interface TrailDot { x: number; y: number; }
interface Rocket { x: number; y: number; vx: number; vy: number; trail: TrailDot[]; }

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const motesRef = useRef<Mote[]>([]);
  const shootersRef = useRef<Shooter[]>([]);
  const rocketRef = useRef<Rocket | null>(null);
  const nextShootRef = useRef<number>(Date.now() + 2500);
  const nextRocketRef = useRef<number>(Date.now() + 4000);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setup = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const area = canvas.width * canvas.height;

      // Stars (night) — depth layers for parallax
      starsRef.current = Array.from({ length: 320 }, () => {
        const depth = Math.random();
        return {
          x: Math.random(), y: Math.random(),
          r: depth * 1.7 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.02,
          depth,
        };
      });

      // Day constellation particles
      const pCount = Math.min(95, Math.round(area / 17000));
      particlesRef.current = Array.from({ length: pCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.3 + Math.random() * 2.4,
        cyan: Math.random() > 0.5,
        alpha: 0.35 + Math.random() * 0.4,
      }));

      // Soft bokeh motes (both modes, for depth)
      const mCount = Math.min(7, Math.round(area / 220000));
      motesRef.current = Array.from({ length: Math.max(4, mCount) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.05 + Math.random() * 0.18),
        r: 60 + Math.random() * 90,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    setup();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const spawnRocket = () => {
      const speed = 3.2 + Math.random() * 1.6;
      rocketRef.current = {
        x: -40,
        y: canvas.height * (0.55 + Math.random() * 0.4),
        vx: speed,
        vy: -speed * (0.55 + Math.random() * 0.25),
        trail: [],
      };
    };

    // Premium hand-drawn rocket (night)
    const drawRocketVector = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Flickering flame behind the rocket
      const fl = 11 + Math.random() * 7;
      const flame = ctx.createLinearGradient(-16, 0, -16 - fl, 0);
      flame.addColorStop(0, 'rgba(255, 224, 130, 0.95)');
      flame.addColorStop(0.45, 'rgba(255, 138, 48, 0.85)');
      flame.addColorStop(1, 'rgba(255, 80, 40, 0)');
      ctx.fillStyle = flame;
      ctx.beginPath();
      ctx.moveTo(-16, -4.5);
      ctx.lineTo(-16 - fl, 0);
      ctx.lineTo(-16, 4.5);
      ctx.closePath();
      ctx.fill();

      // Soft glow on the body
      ctx.shadowColor = 'rgba(167, 139, 250, 0.85)';
      ctx.shadowBlur = 10;

      // Fins (cyan)
      ctx.fillStyle = '#06B6D4';
      ctx.beginPath(); ctx.moveTo(-15, -5); ctx.lineTo(-24, -12); ctx.lineTo(-11, -5); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-15, 5); ctx.lineTo(-24, 12); ctx.lineTo(-11, 5); ctx.closePath(); ctx.fill();

      // Body
      ctx.fillStyle = '#EDEDF7';
      ctx.beginPath();
      ctx.moveTo(-16, -6);
      ctx.lineTo(6, -6);
      ctx.quadraticCurveTo(20, -6, 23, 0);
      ctx.quadraticCurveTo(20, 6, 6, 6);
      ctx.lineTo(-16, 6);
      ctx.closePath();
      ctx.fill();

      // Nose cone (violet)
      ctx.fillStyle = '#7C3AED';
      ctx.beginPath();
      ctx.moveTo(7, -6);
      ctx.quadraticCurveTo(20, -6, 23, 0);
      ctx.quadraticCurveTo(20, 6, 7, 6);
      ctx.closePath();
      ctx.fill();

      // Window
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.arc(-1, 0, 3.4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#67e8f9';
      ctx.beginPath(); ctx.arc(-1, 0, 2.2, 0, Math.PI * 2); ctx.fill();

      ctx.restore();
    };

    // Realistic commercial airliner seen from ABOVE (top-down) — central
    // fuselage, two swept wings with engines, tail stabilisers and a coloured
    // livery tail. Outline + shadow keep it visible on the light background.
    const drawAirplane = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(0.85, 0.85);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const body = ctx.createLinearGradient(0, -4, 0, 4);
      body.addColorStop(0, '#ffffff');
      body.addColorStop(0.5, '#eef2f7');
      body.addColorStop(1, '#cfd8e2');
      const wing = ctx.createLinearGradient(0, -26, 0, 26);
      wing.addColorStop(0, '#c2cdd9');
      wing.addColorStop(0.5, '#eef2f7');
      wing.addColorStop(1, '#c2cdd9');
      const tail = ctx.createLinearGradient(-37, 0, -22, 0);
      tail.addColorStop(0, '#06B6D4');
      tail.addColorStop(1, '#7C3AED');
      const out = 'rgba(71, 85, 105, 0.7)';

      ctx.shadowColor = 'rgba(51, 65, 85, 0.35)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      // Wings (swept) — behind the fuselage
      ctx.fillStyle = wing;
      ctx.strokeStyle = out;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, -3); ctx.lineTo(-14, -26); ctx.lineTo(-19, -26); ctx.lineTo(-4, -3); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10, 3); ctx.lineTo(-14, 26); ctx.lineTo(-19, 26); ctx.lineTo(-4, 3); ctx.closePath();
      ctx.fill(); ctx.stroke();

      // Tail stabilisers
      ctx.beginPath();
      ctx.moveTo(-26, -2.5); ctx.lineTo(-35, -11); ctx.lineTo(-39, -11); ctx.lineTo(-31, -2.5); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-26, 2.5); ctx.lineTo(-35, 11); ctx.lineTo(-39, 11); ctx.lineTo(-31, 2.5); ctx.closePath();
      ctx.fill(); ctx.stroke();

      // Fuselage
      ctx.fillStyle = body;
      ctx.strokeStyle = out;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(34, 0);
      ctx.quadraticCurveTo(29, -3.6, 18, -3.7);
      ctx.lineTo(-26, -3.5);
      ctx.quadraticCurveTo(-34, -3.2, -38, 0);
      ctx.quadraticCurveTo(-34, 3.2, -26, 3.5);
      ctx.lineTo(18, 3.7);
      ctx.quadraticCurveTo(29, 3.6, 34, 0);
      ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Tail livery accent
      ctx.fillStyle = tail;
      ctx.beginPath();
      ctx.moveTo(-24, -3.4); ctx.lineTo(-26, -3.5);
      ctx.quadraticCurveTo(-38, 0, -26, 3.5);
      ctx.lineTo(-24, 3.4); ctx.closePath();
      ctx.fill();

      // Engines on the wings
      ctx.fillStyle = '#475569';
      ctx.beginPath(); ctx.ellipse(-2, -14.5, 4.6, 2.0, -0.78, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-2, 14.5, 4.6, 2.0, 0.78, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath(); ctx.ellipse(1.0, -12.0, 1.6, 1.3, -0.78, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(1.0, 12.0, 1.6, 1.3, 0.78, 0, Math.PI * 2); ctx.fill();

      // Spine stripe + cockpit
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.75)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(22, 0); ctx.lineTo(-24, 0);
      ctx.stroke();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.beginPath();
      ctx.moveTo(30, 0);
      ctx.quadraticCurveTo(26, -2.2, 22, 0);
      ctx.quadraticCurveTo(26, 2.2, 30, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawFlyer = () => {
      const r = rocketRef.current;
      if (!r) return;
      r.x += r.vx;
      r.y += r.vy;
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 44) r.trail.shift();
      const angle = Math.atan2(r.vy, r.vx);

      if (isDark) {
        // Warm sparkle trail
        r.trail.forEach((d, i) => {
          const t = i / r.trail.length;
          const size = 0.6 + t * 5;
          const warm = i > r.trail.length - 12;
          ctx.beginPath();
          ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
          ctx.fillStyle = warm
            ? `rgba(255, ${140 + Math.floor(t * 90)}, 55, ${t * 0.7})`
            : `rgba(190, 170, 255, ${t * 0.4})`;
          ctx.fill();
        });
        drawRocketVector(r.x, r.y, angle);
      } else {
        // Subtle dotted contrail (no fire — fits the daytime paper plane)
        r.trail.forEach((d, i) => {
          if (i % 2 !== 0) return;
          const t = i / r.trail.length;
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1 + t * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(124, 58, 237, ${t * 0.2})`;
          ctx.fill();
        });
        drawAirplane(r.x, r.y, angle);
      }

      if (r.x > canvas.width + 60 || r.y < -60) {
        rocketRef.current = null;
        nextRocketRef.current = Date.now() + 6000 + Math.random() * 7000;
      }
    };

    const drawMotes = () => {
      motesRef.current.forEach(m => {
        m.phase += 0.01;
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -m.r) { m.y = canvas.height + m.r; m.x = Math.random() * canvas.width; }
        if (m.x < -m.r) m.x = canvas.width + m.r;
        if (m.x > canvas.width + m.r) m.x = -m.r;
        const pulse = 0.5 + Math.sin(m.phase) * 0.5;
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
        if (isDark) {
          g.addColorStop(0, `rgba(124, 58, 237, ${0.06 * pulse})`);
          g.addColorStop(1, 'rgba(124, 58, 237, 0)');
        } else {
          g.addColorStop(0, `rgba(99, 102, 241, ${0.10 * pulse})`);
          g.addColorStop(1, 'rgba(6, 182, 212, 0)');
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Reduced motion: one static frame
    if (prefersReduced) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isDark) {
        starsRef.current.forEach(s => {
          ctx.beginPath();
          ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(215, 200, 255, 0.6)';
          ctx.fill();
        });
      } else {
        particlesRef.current.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.cyan ? '6,182,212' : '124,58,237'}, ${p.alpha * 0.6})`;
          ctx.fill();
        });
      }
      return () => {
        window.removeEventListener('mousemove', onMove);
        ro.disconnect();
      };
    }

    let inView = true;
    let active = false;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      drawMotes();

      if (isDark) {
        // ---- NIGHT ----
        const px = (mx / canvas.width - 0.5);
        const py = (my / canvas.height - 0.5);
        starsRef.current.forEach(s => {
          s.phase += s.speed;
          const alpha = 0.1 + (Math.sin(s.phase) * 0.5 + 0.5) * 0.78;
          const ox = isFinite(px) ? px * s.depth * 22 : 0;
          const oy = isFinite(py) ? py * s.depth * 22 : 0;
          ctx.beginPath();
          ctx.arc(s.x * canvas.width + ox, s.y * canvas.height + oy, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(215, 200, 255, ${alpha})`;
          ctx.fill();
        });

        // Shooting stars — up to 2 at a time, frequent
        if (shootersRef.current.length < 2 && now >= nextShootRef.current) {
          const angle = (15 + Math.random() * 28) * (Math.PI / 180);
          const speed = 5 + Math.random() * 6;
          shootersRef.current.push({
            x: Math.random() * canvas.width * 0.8,
            y: Math.random() * canvas.height * 0.4,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            tailLen: 70 + Math.random() * 90,
            life: 0,
            maxLife: 55 + Math.random() * 30,
          });
          nextShootRef.current = now + 1800 + Math.random() * 3200;
        }
        shootersRef.current = shootersRef.current.filter(s => {
          s.life++;
          s.x += s.vx;
          s.y += s.vy;
          const t = s.life / s.maxLife;
          const alpha = Math.sin(t * Math.PI) * 0.9;
          const mag = Math.sqrt(s.vx ** 2 + s.vy ** 2);
          const grad = ctx.createLinearGradient(
            s.x - (s.vx / mag) * s.tailLen, s.y - (s.vy / mag) * s.tailLen, s.x, s.y
          );
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          grad.addColorStop(1, `rgba(230,220,255,${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(s.x - (s.vx / mag) * s.tailLen, s.y - (s.vy / mag) * s.tailLen);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
          return s.life < s.maxLife && s.x < canvas.width + 60 && s.y < canvas.height + 60;
        });
      } else {
        // ---- DAY: interactive constellation network ----
        const parts = particlesRef.current;
        parts.forEach(p => {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 16000 && isFinite(dx)) {
            const dist = Math.sqrt(dist2) || 1;
            const force = (1 - dist / 126) * 0.9;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.97;
          p.vy *= 0.97;
          // keep a gentle minimum drift
          if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.05;
          if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.05;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        });

        // Links between nearby particles
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const a = parts[i], b = parts[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 12000) {
              const alpha = (1 - d2 / 12000) * 0.28;
              ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        // Links to cursor
        if (isFinite(mx)) {
          parts.forEach(p => {
            const dx = p.x - mx, dy = p.y - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < 22000) {
              const alpha = (1 - d2 / 22000) * 0.4;
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mx, my);
              ctx.stroke();
            }
          });
        }

        // Particle dots
        parts.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.cyan ? '6,182,212' : '124,58,237'}, ${p.alpha})`;
          ctx.fill();
        });
      }

      // ---- FLYER: rocket at night, paper plane by day ----
      if (!rocketRef.current && now >= nextRocketRef.current) spawnRocket();
      if (rocketRef.current) drawFlyer();

      if (active) animRef.current = requestAnimationFrame(draw);
    };

    // Only animate while the hero is on-screen and the tab is visible (perf/battery)
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
      window.removeEventListener('mousemove', onMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 4 }}
    />
  );
};

export default StarField;
