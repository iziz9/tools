import { useModalContext } from '@/context/modal-context'
import { CloseIcon } from '@/icons/icons'
import { MouseEvent } from 'react'

export default function Modal() {
  const { modal, closeModal } = useModalContext()

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log(e)
  }

  if (!modal.isOpen) return null

  return (
    <div className="fixed w-full h-full bg-overlay">
      <div className="my-5 mx-auto p-3 w-[450px] h-[600px] border-[3px] border-solid border-black rounded-lg bg-white">
        <section className="relative flex justify-center">
          <p className="text-center text-lg font-semibold">{modal.title}</p>
          <button className="absolute right-0" onClick={closeModal}>
            <CloseIcon />
          </button>
        </section>
        <section className="relative flex justify-center">{modal.content}</section>
      </div>
    </div>
  )
}
