import { useEffect, useRef } from "react";

interface MatrixRainProps {
  color?: string;
  fontSize?: number;
  opacity?: number;
  speed?: number;
}

export function MatrixRain({ 
  color = "#173E7D", // Arsenic Imperial Blue
  fontSize = 14,
  opacity = 0.3,
  speed = 2
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    // Focus characters on "ARSENIC" to make it more visible
    const chars = "ARSENIC";

    let frameCount = 0;
    const draw = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly pick from ARSENIC characters
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let animationId: number;
    const animate = () => {
      frameCount++;
      if (frameCount % speed === 0) {
        draw();
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-initialize drops on resize if needed
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, fontSize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex: 0 }}
    />
  );
}
