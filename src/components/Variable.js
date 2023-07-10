import style from './styles.module.css'

export function Variable({ variable }) {
  return (
    <div className={style.variable}>
      <input type="checkbox" />
      {variable}
    </div>
  )
}
