import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import style from './styles.module.css'
import { RowsOfValues } from './RowsOfValues'
import {
  addAllRows, deleteCheckedRows, setCheckedAllRows, setUncheckedAllRows,
} from './Redux/Slices/rowCheckSlice/rowCheckSlice'
import { Modal } from './Modal/Modal'
import { GetModulationByPoints } from './GetModulationByPoints/GetModulationByPoints'
import { GetModulationForCST } from './GetModulationForCST/GetModulationForCST'

export function ListOfValues({ listOfvariables }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [content, setContent] = useState(null)
  const dispatch = useDispatch()
  const preparedRows = (listOfvariables.filter((el) => el.length > 0).map((element, index) => (
    {
      element,
      checked: false,
      id: index,
    }
  )))
  dispatch(addAllRows(preparedRows))

  const rows = useSelector((store) => store.rows)

  const onClickCheckAllRows = (e) => {
    e.stopPropagation()
    if (e.target.checked) {
      dispatch(setCheckedAllRows(rows))
    } else {
      dispatch(setUncheckedAllRows(rows))
    }
  }

  const onDeleteButtonHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteCheckedRows(rows))
  }

  const openModalClickHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
    if (e.target.id === 'CST') { setContent(<GetModulationForCST rows={rows} />) }
    if (e.target.id === 'points') { setContent(<GetModulationByPoints rows={rows} />) }
  }

  const closeModalClickHandler = () => {
    setIsModalOpen(false)
  }

  if (!rows) {
    return (
      <div>
        no data
      </div>
    )
  }
  return (
    <div className={style.column}>
      <div>
        <button type="button" onClick={onDeleteButtonHandler}>Delete checked</button>
      </div>
      <div>
        <input type="checkbox" id="checkAllRows" onClick={onClickCheckAllRows} />
        <span>Check all rows</span>
      </div>
      <div>
        <button type="button" onClick={openModalClickHandler} id="CST">
          Get modulation for CST
        </button>

        <button type="button" onClick={openModalClickHandler} id="points">
          Get modulation by points
        </button>

        <Modal isOpen={isModalOpen} closeModal={closeModalClickHandler}>
          {content}
        </Modal>

      </div>
      <RowsOfValues rows={rows} />
    </div>
  )
}
