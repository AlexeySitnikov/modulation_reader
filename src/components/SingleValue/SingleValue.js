import style from './style.module.css'

export function SingleValue({ value }) {
  return (
    <div className={style.variable}>
      {value}
    </div>
  )
}
