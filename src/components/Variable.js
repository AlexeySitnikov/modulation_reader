import style from './styles.module.css'

export function Variable({ variable }) {
  return (
    <p className={style.variable}>{variable}</p>
  )
}
