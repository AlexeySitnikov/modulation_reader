import style from './styles.module.css'

export function SingleValue({ variable }) {
  return (
    <div className={style.variable}>
      {variable}
    </div>
  )
}
