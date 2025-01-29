import { useModalContext } from '@/context/modal-context'
import { CloseIcon } from '@/icons/icons'

export default function Modal() {
  const { modal, closeModal } = useModalContext()

  if (!modal.isOpen) return null

  return (
    <div className="fixed inset-0 bg-overlay z-50">
      <div className="my-20 mx-auto p-3 w-fit h-fit border-[3px] border-solid border-black rounded-lg bg-white">
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
