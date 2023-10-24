import { useState } from 'react'
import style from './styles.module.css'
import { Modal } from './Modal/Modal'
import { GetModulationByPoints } from './GetModulationByPoints/GetModulationByPoints'
import { GetModulationForCST } from './GetModulationForCST/GetModulationForCST'
import { ListOfRows } from './ListOfRows/ListOfRows'

export function ListOfValues({ listOfvariables }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [content, setContent] = useState(null)
  const [preparedRows, setPreparedRows] = useState(listOfvariables.filter((el) => el.length > 0)
    .map((element) => (
      {
        element,
        checked: false,
        id: crypto.randomUUID(),
      }
    )))

  const checkRow = (id) => {
    setPreparedRows((prev) => prev.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          checked: !el.checked,
        }
      }
      return el
    }))
  }

  const deletRow = () => {
    setPreparedRows((prev) => prev.filter((el) => !el.checked))
  }

  const checkAllRows = () => {
    setPreparedRows((prev) => prev.map((el) => ({
      ...el,
      checked: true,
    })))
  }

  const unCheckAllRows = () => {
    setPreparedRows((prev) => prev.map((el) => ({
      ...el,
      checked: false,
    })))
  }

  const onClickCheckAllRows = (e) => {
    e.stopPropagation()
    if (e.target.checked) {
      checkAllRows()
    } else {
      unCheckAllRows()
    }
  }

  const onDeleteButtonHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    deletRow()
  }

  const openModalClickHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
    if (e.target.id === 'CST') { setContent(<GetModulationForCST rows={preparedRows} />) }
    if (e.target.id === 'points') { setContent(<GetModulationByPoints rows={preparedRows} />) }
  }

  const closeModalClickHandler = () => {
    setIsModalOpen(false)
  }

  if (preparedRows.length === 0) {
    return (
      <div>
        no data
      </div>
    )
  }
  return (
    <div className={style.column}>
      <div className={style.deleteButton}>
        <div>
          <input type="checkbox" id="checkAllRows" onClick={onClickCheckAllRows} />
          <span>Check all rows</span>
        </div>
        <button className={style.button} type="button" onClick={onDeleteButtonHandler}>Delete checked</button>
      </div>

      <div className={style.openModalsButton}>
        <button className={style.button} type="button" onClick={openModalClickHandler} id="CST">
          Get modulation for CST
        </button>

        <button className={style.button} type="button" onClick={openModalClickHandler} id="points">
          Get modulation by points
        </button>

        <Modal isOpen={isModalOpen} closeModal={closeModalClickHandler}>
          {content}
        </Modal>
      </div>
      <br />
      <div className={style.data}>
        {/* <RowsOfValues rows={rows} /> */}
        <ListOfRows rows={preparedRows} checkRow={checkRow} />
      </div>
    </div>
  )
}
