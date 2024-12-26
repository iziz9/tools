import { useEffect, useRef, useState } from 'react'

const useImageCrop = () => {
  const [onCropMode, setOnCropMode] = useState<boolean>(false)
  const [isDrawing, setIsDrawing] = useState(false) // 크롭 영역 선택중인지 판별
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cropLayerRef = useRef<HTMLCanvasElement>(null)
  const selectedAreaRef = useRef({ sX: 0, sY: 0, eX: 0, eY: 0 }) // 선택영역의 시작 및 끝 좌표값

  useEffect(() => {
    if (!onCropMode || !cropLayerRef.current || !canvasRef.current) return

    const cropLayer = cropLayerRef.current
    cropLayer.width = canvasRef.current.width
    cropLayer.height = canvasRef.current.height

    window.addEventListener('keydown', onEditKeyDownHandler)
    cropLayer.addEventListener('mousedown', onCropStartHandler) //마우스를 누르기 시작할 때
    cropLayer.addEventListener('mouseup', onCropEndHandler)

    return () => {
      window.removeEventListener('keydown', onEditKeyDownHandler)
      cropLayer.removeEventListener('mousedown', onCropStartHandler)
      cropLayer.removeEventListener('mouseup', onCropEndHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCropMode])

  useEffect(() => {
    if (!isDrawing || !cropLayerRef.current) return

    const cropLayer = cropLayerRef.current

    cropLayer.addEventListener('mousemove', onCropAreaHandler) // 마우스를 누르고 끌 때
    return () => {
      cropLayer.removeEventListener('mousemove', onCropAreaHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawing])

  const onEditKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') console.log('적용하기')
    if (event.key === 'Escape') setOnCropMode(false) //편집 취소
  }

  const onCropStartHandler = (e: MouseEvent) => {
    if (!cropLayerRef.current) return

    const cropLayer = cropLayerRef.current
    const selectedArea = selectedAreaRef.current

    const canvasX = cropLayer.getBoundingClientRect().left // 캔버스의 시작점 - 뷰포트에서의 x좌표
    const canvasY = cropLayer.getBoundingClientRect().top // 캔버스의 시작점 - 뷰포트에서의 y좌표

    const sX = e.clientX - canvasX // 캔버스 안에서의 x좌표
    const sY = e.clientY - canvasY // 캔버스 안에서의 y좌표

    selectedArea.sX = sX
    selectedArea.sY = sY
    setIsDrawing(true)
  }

  const onCropAreaHandler = (e: MouseEvent) => {
    if (!isDrawing || !cropLayerRef.current || !canvasRef.current) return

    const cropLayer = cropLayerRef.current
    const selectedArea = selectedAreaRef.current

    const canvasX = cropLayer.getBoundingClientRect().left // 캔버스의 시작점 - 뷰포트에서의 x좌표
    const canvasY = cropLayer.getBoundingClientRect().top // 캔버스의 시작점 - 뷰포트에서의 y좌표

    const eX = e.clientX - canvasX
    const eY = e.clientY - canvasY

    const selectedEndX = eX - selectedArea.sX // 마우스를 이동한 x거리 (넓이)
    const selectedEndY = eY - selectedArea.sY // 마우스를 이동한 y거리 (높이)

    const ctx = cropLayer.getContext('2d')
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height) // 다시 그릴 때 캔버스 초기화
    ctx?.strokeRect(selectedArea.sX, selectedArea.sY, selectedEndX, selectedEndY) // 마우스를 이동한 좌표 영역만큼 사각형 그리기(시작x좌표, 시작y좌표, 넓이, 높이)

    selectedArea.eX = eX // 캔버스 내 좌표
    selectedArea.eY = eY // 캔버스 내 좌표
  }

  const onCropEndHandler = () => {
    setIsDrawing(false)
    drawCroppedImg()
  }

  const drawCroppedImg = () => {
    if (!cropLayerRef.current) return
    console.log(selectedAreaRef.current)
    const selectedArea = selectedAreaRef.current
    const cropLayer = cropLayerRef.current
    if (!cropLayer) return new Error('canvas를 사용할 수 없습니다.')

    const img = new Image()
    img.onload = () => {
      img.width = selectedArea.eX - selectedArea.sX
      img.height = selectedArea.eY - selectedArea.sY

      cropLayer.width = img.width
      cropLayer.height = img.height

      const ctx = cropLayer.getContext('2d')
      ctx?.drawImage(img, selectedArea.sX, selectedArea.sY, cropLayer.width, cropLayer.height)
    }
    img.onerror = () => {
      new Error('이미지를 로드하는 데 실패했습니다.')
    }
  }

  return { canvasRef, cropLayerRef, selectedAreaRef, onCropMode, setOnCropMode }
}

export default useImageCrop
