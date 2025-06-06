import { motion } from 'framer-motion';

interface FloatingImageProps {
  src: string;
  size?: number;
  anchor: { x: number; y: number }; // точка размещения в vw/vh
  floatAmplitude?: number; // амплитуда колебания (в vw/vh)
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  src,
  size = 100,
  anchor,
  floatAmplitude = 2, // ±2vw/vh
}) => {
  return (
    <motion.img
      src={src}
      alt=""
      style={{
        position: 'fixed',
        width: size,
        height: size,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        opacity: 0.15,
      }}
      animate={{
        x: [
          `${anchor.x}vw`,
          `${anchor.x + floatAmplitude}vw`,
          `${anchor.x}vw`,
          `${anchor.x - floatAmplitude}vw`,
          `${anchor.x}vw`,
        ],
        y: [
          `${anchor.y}vh`,
          `${anchor.y - floatAmplitude}vh`,
          `${anchor.y}vh`,
          `${anchor.y + floatAmplitude}vh`,
          `${anchor.y}vh`,
        ],
      }}
      transition={{
        duration: 10,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: "mirror"
      }}
    />
  );
};

export default FloatingImage;
