import { FC, PropsWithChildren } from 'react'
import classes from '../../styles/header.module.scss'

type sectionProps = {
  title?: string
  [x: string]: any
}

const Section: FC<PropsWithChildren<sectionProps>> = ({ title, children, ...props }) => (
  <section className={classes.section} {...props}>
    <h2 className={classes.sectionTitle}>{title}</h2>
    {children}
  </section>
)

export default Section
