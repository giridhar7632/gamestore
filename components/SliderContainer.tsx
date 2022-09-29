import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { FC, PropsWithChildren, useRef, useState } from 'react'
import classes from '../styles/Slider.module.scss'
import { ChevronLeft, ChevronRight } from '../utils/icons'
import useWindowSize from '../lib/hooks/useWindowSize'

type controlProps = {
  isVisible: boolean
  type?: string
  children?: React.ReactNode | React.ReactNode[]
  [x: string]: any
}

const Control: FC<PropsWithChildren<controlProps>> = ({
  isVisible,
  type,
  children,
  ...props
}: controlProps) => (
  <div className={clsx(classes.control, classes[type], isVisible && classes.visible)}>
    <motion.button
      initial={{ opacity: isVisible ? 0 : 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        scale: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
        opacity: {
          duration: 0.3,
        },
      }}
      {...props}
    >
      {children}
    </motion.button>
  </div>
)

const SliderContainer: FC<PropsWithChildren> = ({ children }) => {
  const [scrollX, setscrollX] = useState(0)
  const [end, setEnd] = useState(false)
  let scrollRef = useRef(null)
  const { width } = useWindowSize()

  const slide = (shift) => {
    scrollRef.current.scrollLeft += shift
    setscrollX(scrollX + shift)
    setEnd(
      Math.floor(scrollRef.current.scrollWidth - scrollRef.current.scrollLeft) <=
        scrollRef.current.offsetWidth,
    )
  }

  const scrollCheck = () => {
    setscrollX(scrollRef.current.scrollLeft)
    setEnd(
      Math.floor(scrollRef.current.scrollWidth - scrollRef.current.scrollLeft) <=
        scrollRef.current.offsetWidth,
    )
  }

  return (
    <div>
      <motion.div className={classes.carousel}>
        <motion.div className={classes.innerCarousel} ref={scrollRef} onScroll={scrollCheck}>
          {children}
        </motion.div>
        <motion.div className={classes.controls}>
          <Control
            isVisible={scrollX !== 0}
            type={'left'}
            onClick={() => {
              scrollCheck()
              slide(-(width > 720 ? 500 : 300))
            }}
            className={classes.controlBtn}
            aria-label={'navigation button left'}
          >
            <ChevronLeft />
          </Control>
          <Control
            isVisible={!end}
            type={'right'}
            onClick={() => {
              scrollCheck()
              slide(width > 720 ? 500 : 300)
            }}
            className={classes.controlBtn}
            aria-label={'navigation button right'}
          >
            <ChevronRight />
          </Control>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SliderContainer
