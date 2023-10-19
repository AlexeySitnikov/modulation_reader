import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import style from './modalWr.module.css'

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
    <div className={style.modalContent}>
      {children}
      <button className={style.button} type="button" onClick={closeModal}>
        Close Modal
      </button>
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
