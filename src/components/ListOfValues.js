/* eslint-disable camelcase */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import style from './styles.module.css'
import { RowsOfValues } from './RowsOfValues'
import {
  addAllRows, deleteCheckedRows, setCheckedAllRows, setUncheckedAllRows,
} from './Redux/Slices/rowCheckSlice/rowCheckSlice'
import { Modal } from './Modal/Modal'
import { Form } from './Form/Form'
import { Modulation } from './ModulationForCST/Modulation'
import { Radius } from './ModulationForCST/Radius'
import { ZLength } from './ModulationForCST/ZLength'
import { VerticalModulation } from './ModulationByPoints/VerticalModulation'
import { HorizontalModulation } from './ModulationByPoints/HorizontalModulation'

export function ListOfValues({ listOfvariables }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  // async function download(data, filename) {
  //   const file = new Blob((data), { type: 'text/plain' })
  //   const a = document.createElement('a')
  //   const url = URL.createObjectURL(file)
  //   a.href = url
  //   a.download = filename
  //   document.body.appendChild(a)
  //   a.click()
  //   setTimeout(() => {
  //     document.body.removeChild(a)
  //     window.URL.revokeObjectURL(url)
  //   }, 0)
  //   // if (window.navigator.msSaveOrOpenBlob) { // IE10+
  //   //   window.navigator.msSaveOrOpenBlob(file, filename)
  //   // } else { // Others
  //   //   const a = document.createElement('a')
  //   //   const url = URL.createObjectURL(file)
  //   //   a.href = url
  //   //   a.download = filename
  //   //   document.body.appendChild(a)
  //   //   a.click()
  //   //   setTimeout(() => {
  //   //     document.body.removeChild(a)
  //   //     window.URL.revokeObjectURL(url)
  //   //   }, 0)
  //   // }
  // }

  const makeModulationColumn = () => {
    Modulation({ rows })
  }

  const makeRColumn = () => {
    Radius({ rows })
  }

  const makeZColumn = () => {
    ZLength({ rows })
  }

  const makeVaneVerticalModulation = () => {
    VerticalModulation({ rows })
  }

  const makeVaneHorizontalModulation = () => {
    HorizontalModulation({ rows })
  }

  const openModalClickHandler = () => {
    setIsModalOpen(true)
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
        <button
          type="button"
          onClick={() => {
            makeModulationColumn()
          }}
        >
          Download m
        </button>
        <button
          type="button"
          onClick={() => {
            makeRColumn()
          }}
        >
          Download R
        </button>
        <button
          type="button"
          onClick={() => {
            makeZColumn()
          }}
        >
          Download Z
        </button>
        <button
          type="button"
          onClick={() => {
            makeVaneVerticalModulation()
          }}
        >
          Make vane vertical modulation
        </button>
        <button
          type="button"
          onClick={() => {
            makeVaneHorizontalModulation()
          }}
        >
          Make vane horizontal modulation
        </button>

        <button
          type="button"
          onClick={openModalClickHandler}
        >
          Open Modal
        </button>

        <Modal isOpen={isModalOpen} closeModal={closeModalClickHandler}>
          <Form rows={rows} />
        </Modal>

      </div>
      <RowsOfValues rows={rows} />
    </div>
  )
}
