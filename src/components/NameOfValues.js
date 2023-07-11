import style from './styles.module.css'

export function NameOfValues({ nameOfValues }) {
  return (
    <div className={style.values}>
      {nameOfValues}
    </div>
  )
}
