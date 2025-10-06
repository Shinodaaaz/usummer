import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CarouselWrapper = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

const Slide = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  cursor: grab;
`;


const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function Gallery() {
  const photos: string[] = [
    "/photos/ann.jpg",
    "/photos/sergey.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Автопрокрутка каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + photos.length) % photos.length);
  };

  return (
    <GalleryWrapper>
      <CarouselWrapper>
        <AnimatePresence initial={false} custom={direction}>
          <Slide
            key={index}
            src={photos[index]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x * velocity.x;
              if (swipe < -1000) paginate(1);
              else if (swipe > 1000) paginate(-1);
            }}
          />
        </AnimatePresence>
      </CarouselWrapper>
{/*      <MusicPlayer/>*/}
 {/*     <LotteryWheel/>*/}
    </GalleryWrapper>
  );
}
