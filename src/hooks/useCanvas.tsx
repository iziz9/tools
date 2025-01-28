import SaveModal from '@/components/editor/save-modal'
import { useModalContext } from '@/context/modal-context'
import { checkNameValidation } from '@/lib/file-utils'
import { SetStateAction, useRef } from 'react'

interface IDrawImageArgs {
  file: File
  setOriginalImg?: (value: SetStateAction<HTMLImageElement | undefined>) => void
}

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const downloadRef = useRef<HTMLAnchorElement>(null)
  const { openModal, closeModal } = useModalContext()

  const drawImage = ({ file, setOriginalImg }: IDrawImageArgs) => {
    if (!file) return

    const img = new Image() // 동적으로 이미지 생성
    const imgUrl = URL.createObjectURL(file) // 업로드한 파일에서 생성한 url을 img.src로 지정
    img.src = imgUrl

    if (setOriginalImg) {
      setOriginalImg(img) // 원본 이미지 저장
    }

    const canvas = canvasRef.current
    if (!canvas) return new Error('canvas를 사용할 수 없습니다.')

    img.onload = () => {
      // 이미지가 성공적으로 로드되면
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, img.width, img.height) // 업로드한 이미지를 캔버스에 그리기(이미지객체, x좌표, y좌표)
      URL.revokeObjectURL(imgUrl) // 캐싱된 이미지 URL 해제(메모리관리, 같은 url 중복 생성 및 다운로드 중복 방지)
    }
    img.onerror = () => {
      new Error('이미지를 로드하는 데 실패했습니다.')
      URL.revokeObjectURL(imgUrl)
    }
  }

  const saveImg = ({ fileName, format }: { fileName: string; format: string }) => {
    if (!downloadRef.current || !canvasRef.current) return
    const isValid = checkNameValidation(fileName)
    if (!isValid) return

    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL(`image/${format}`)
    downloadRef.current.href = dataURL
    downloadRef.current.download = `${fileName}.${format}`
    downloadRef.current.click()

    closeModal()
  }

  const openSaveModal = () => {
    openModal({
      title: '이미지 저장',
      content: <SaveModal saveImg={saveImg} />,
    })
  }

  return { canvasRef, downloadRef, drawImage, openSaveModal }
}

export default useCanvas
