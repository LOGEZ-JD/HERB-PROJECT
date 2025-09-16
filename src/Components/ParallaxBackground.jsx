// src/components/ParallaxBackground.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ParallaxBackground({ intensity = 25 }) {
  const wrap = useRef(null);
  const leaves = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // subtle infinite float for each leaf (y oscillation)
      leaves.current.forEach((el, i) => {
        if (!el) return;
        const dur = 6 + Math.abs(Math.sin(i + 1)) * 4;
        gsap.to(el, {
          y: `+=${6 + (i % 3) * 3}`, // small amplitude
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: dur,
          delay: i * 0.35,
        });
        // tiny rotation
        gsap.to(el, {
          rotation: (i % 2 === 0 ? -3 : 3),
          repeat: -1,
          yoyo: true,
          duration: dur * 1.6,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
          delay: i * 0.35,
        });
      });

      // mouse parallax handler
      const onMove = (e) => {
        const rect = wrap.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        leaves.current.forEach((el, i) => {
          if (!el) return;
          const depth = (i + 1) / (leaves.current.length + 1); // 0..1
          const tx = -px * intensity * (0.3 + depth * 1.2);
          const ty = -py * intensity * (0.2 + depth * 1.0);
          gsap.to(el, { x: tx, y: `+=${ty}`, duration: 0.6, ease: "power3.out" });
        });
      };

      // subtle automatic slow drift to avoid static
      const driftTl = gsap.timeline({ repeat: -1 });
      driftTl.to(wrap.current, { x: -6, duration: 6, ease: "sine.inOut" });
      driftTl.to(wrap.current, { x: 6, duration: 6, ease: "sine.inOut" });

      // pointer events: listen on window for desktop only (mobile will not use pointer)
      window.addEventListener("mousemove", onMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", onMove);
        driftTl.kill();
      };
    }, wrap);

    return () => ctx.revert();
  }, [intensity]);

  // helper to set refs
  const setLeafRef = (el, idx) => {
    leaves.current[idx] = el;
  };

  return (
    // container positioned absolute; sizing handled by parent
    <div ref={wrap} className="parallax-wrap pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Background soft radial */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="g1" cx="30%" cy="20%">
            <stop offset="0%" stopColor="#ecfdf5" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g1)" />
      </svg>

      {/* Leaf 1 - large left */}
      <svg ref={(el) => setLeafRef(el, 0)} className="leaf leaf-1 absolute w-[360px] left-[-6%] top-[6%] opacity-95" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g transform="translate(10,10)">
          <path d="M20 100 C40 20, 140 20, 160 100 C140 140, 60 160, 20 100Z" fill="#DFF7EE" />
          <path d="M60 60 C80 40, 120 40, 140 60" stroke="#A9E7C8" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </svg>

      {/* Leaf 2 - right medium */}
      <svg ref={(el) => setLeafRef(el, 1)} className="leaf leaf-2 absolute w-[260px] right-[-4%] top-[12%] opacity-90" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g transform="translate(10,10)">
          <path d="M20 100 C50 10, 160 30, 160 100 C140 150, 60 160, 20 100Z" fill="#E6FBF0" />
          <path d="M60 55 C80 35, 120 35, 140 55" stroke="#9FE4B8" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </svg>

      {/* Leaf 3 - center small */}
      <svg ref={(el) => setLeafRef(el, 2)} className="leaf leaf-3 absolute w-[200px] left-[30%] top-[40%] opacity-95" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g transform="translate(10,10)">
          <path d="M10 100 C60 20, 140 40, 180 100 C160 140, 60 160, 10 100Z" fill="#F0FFF7" />
          <path d="M60 60 C80 40, 120 40, 140 60" stroke="#CFF6DE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      </svg>

      {/* Leaf 4 - lower left */}
      <svg ref={(el) => setLeafRef(el, 3)} className="leaf leaf-4 absolute w-[220px] left-[6%] top-[60%] opacity-85" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g transform="translate(10,10)">
          <path d="M10 100 C60 20, 140 40, 180 100 C160 140, 60 160, 10 100Z" fill="#F6FFF9" />
          <path d="M60 70 C80 50, 120 50, 140 70" stroke="#C9F3DA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      </svg>

      {/* Leaf 5 - lower right (subtle) */}
      <svg ref={(el) => setLeafRef(el, 4)} className="leaf leaf-5 absolute w-[180px] right-[10%] top-[62%] opacity-80" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g transform="translate(10,10)">
          <path d="M20 110 C60 10, 160 30, 160 110 C140 150, 60 160, 20 110Z" fill="#F8FFF9" />
          <path d="M60 60 C80 40, 120 40, 140 60" stroke="#D8F8E0" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
