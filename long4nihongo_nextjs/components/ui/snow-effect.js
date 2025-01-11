"use client";

import React, { useEffect, useRef } from "react";

const SubtleParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x, y) => ({
      x,
      y,
      size: Math.random() * 2 + 0.7, // Smaller size for subtlety
      speedY: Math.random() * 0.3 + 0.1, // Slower vertical speed
      speedX: (Math.random() - 0.5) * 0.2, // Slower horizontal speed
      opacity: Math.random() * 0.5 + 0.4, // Lower opacity for subtlety
    });

    const drawParticle = (particle) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const updateParticle = (particle) => {
      particle.y += particle.speedY;
      particle.x += particle.speedX;

      // Wrap around screen
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;

      // Subtle opacity change
      particle.opacity += (Math.random() - 0.5) * 0.01;
      particle.opacity = Math.max(0.1, Math.min(0.5, particle.opacity));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        drawParticle(particle);
        updateParticle(particle);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      // Add fewer particles on mouse move for subtlety
      if (Math.random() < 1) {
        particles.push(createParticle(clientX, clientY));
      }

      // Limit the number of particles
      if (particles.length > 200) {
        particles = particles.slice(-200);
      }
    };

    // Initialize
    resizeCanvas();
    for (let i = 0; i < 100; i++) {
      particles.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }

    // Start animation
    animate();

    // Event listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default SubtleParticleBackground;
