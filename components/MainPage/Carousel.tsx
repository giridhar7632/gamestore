import { FC, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classes from '../../styles/header.module.scss'
import { ChevronLeft, ChevronRight } from '../../utils/icons'
import { Games } from '../../utils/types'

type carouselProps = {
  mounted: boolean
  games: Games[]
}

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

const Carousel: FC<carouselProps> = ({ mounted, games }) => {
  const [[page, direction], setPage] = useState([0, 0])
  const getPage = (page) =>
    page < 0 ? games[(page + games?.length) % games?.length] : games[page % games?.length]
  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection])
    },
    [page],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1)
    }, 50000)
    return () => clearInterval(interval)
  }, [paginate])

  return (
    mounted && (
      <div>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className={classes.carousel}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.35), rgba(17, 17, 17, 0.4)), url(${
                getPage(page)?.backgroundImage
              })`,
              zIndex: -1,
            }}
          >
            <div className={classes.carouselContent}>
              <motion.p className={classes.title}>{getPage(page)?.title}</motion.p>
              <motion.a
                className={classes.btn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`${process.env.NEXT_PUBLIC_URL}/game/${getPage(page)?.slug}`}
              >
                Play now
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className={classes.controls}>
          <div className={classes.prev} onClick={() => paginate(-1)}>
            <ChevronLeft width={24} height={24} />
          </div>
          <div className={classes.next} onClick={() => paginate(1)}>
            <ChevronRight width={24} height={24} />
          </div>
        </div>
      </div>
    )
  )
}

export default Carousel
