import { ReactNode, createContext, useCallback, useContext, useState } from 'react'

interface IOpenModal {
  title: string
  content: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (arg?: any) => void
}
interface IModalState extends IOpenModal {
  isOpen: boolean
}
interface IModalContext {
  modal: IModalState
  openModal: ({ title, content, action }: IOpenModal) => void
  closeModal: () => void
}

//초기값 선언 및 컨텍스트 생성
const modalContext = createContext<IModalContext | null>(null)

// 프로바이더 컴포넌트 세팅
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<IModalState>({
    isOpen: false,
    title: '',
    content: null,
    action: undefined,
  })

  const openModal = useCallback(
    ({ title, content, action }: IOpenModal) =>
      setModal({
        isOpen: true,
        title: title,
        content: content,
        action: action,
      }),
    [setModal],
  )

  const closeModal = useCallback(
    () => setModal({ isOpen: false, title: '', content: null, action: undefined }),
    [setModal],
  )

  return <modalContext.Provider value={{ modal, openModal, closeModal }}>{children}</modalContext.Provider>
}

// 클라이언트 컴포넌트 내부에서 사용할 훅
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useModalContext: any = () => useContext(modalContext)
