
import React, { useRef, useEffect } from 'react';

function SmokeBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');

    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speedY: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 5 + 2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.speedY = Math.random() * 1 + 0.1;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 150, 0, ${this.opacity})`;
        ctx!.fill();
      }

      update() {
        this.y -= this.speedY;
        if (this.y < -this.radius) {
          this.y = canvas!.height + this.radius;
          this.x = Math.random() * canvas!.width;
        }
        this.draw();
      }
    }

    const numParticles = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * canvas!.width;
      const y = Math.random() * canvas!.height;
      particles.push(new Particle(x, y));
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(particle => particle.update());
      setTimeout(() => requestAnimationFrame(animate), 50);
    }

    animate();

    const handleResize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      particles.length = 0;

      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas!.width;
        const y = Math.random() * canvas!.height;
        particles.push(new Particle(x, y));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="smoke-background" />;
}

export default SmokeBackground;

