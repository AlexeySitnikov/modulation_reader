import React from 'react'
import style from './styles.module.css'

export const SingleValue = React.memo(({ variable }) => (
  <div className={style.variable}>
    {variable}
  </div>
), (prevProps, nextProps) => {
  console.log(prevProps, nextProps)
})
