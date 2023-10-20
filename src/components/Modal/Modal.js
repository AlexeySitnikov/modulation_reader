import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import style from './style.module.css'

function ModalContent({ children, closeModal }) {
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [closeModal])

  return (
    <div className={style.modal}>
      <div className={style.content}>
        <div className={style.functionalButtons}>
          {children}
        </div>
        <div className={style.closeButton}>
          <button className={style.button} type="button" onClick={closeModal}>
            Close Modal
          </button>
        </div>
      </div>
    </div>
  )
}

export function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null

  return (
    createPortal(
      <div className={style.modalWr}>
        <ModalContent closeModal={closeModal}>
          {children}
        </ModalContent>
      </div>,
      document.getElementById('modal'),
    ))
}
