import { useEffect, useRef, useState } from 'react'

const useImageCrop = () => {
  const [onCropMode, setOnCropMode] = useState<boolean>(false)
  const [isDrawing, setIsDrawing] = useState<boolean>(false) // 크롭 영역 선택중인지 판별
  const [originalImg, setOriginalImg] = useState<HTMLImageElement>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cropLayerRef = useRef<HTMLCanvasElement>(null)
  const selectedAreaRef = useRef({ sX: 0, sY: 0, eX: 0, eY: 0 }) // 선택영역의 시작 및 끝 좌표값

  useEffect(() => {
    if (!onCropMode || !cropLayerRef.current || !canvasRef.current) return

    const cropLayer = cropLayerRef.current
    const canvas = canvasRef.current

    // cropLayer의 실제 크기를 canvas와 동일하게 설정
    cropLayer.width = canvas.width
    cropLayer.height = canvas.height
    // cropLayer.width = canvasRef.current.clientWidth
    // cropLayer.height = canvasRef.current.clientHeight

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
    if (event.key === 'Enter') {
      saveChanges()
    }
    if (event.key === 'Escape') {
      cancelChanges()
    }
  }

  // 좌표 변환을 위한 스케일 계산
  const getCanvasScale = () => {
    if (!canvasRef.current) return { scaleX: 1, scaleY: 1 }

    const canvas = canvasRef.current
    return {
      scaleX: canvas.width / canvas.clientWidth,
      scaleY: canvas.height / canvas.clientHeight,
    }
  }

  const onCropStartHandler = (e: MouseEvent) => {
    if (!cropLayerRef.current) return

    const cropLayer = cropLayerRef.current
    const selectedArea = selectedAreaRef.current
    const { scaleX, scaleY } = getCanvasScale()

    const cropLayerRect = cropLayer.getBoundingClientRect()
    const sX = (e.clientX - cropLayerRect.left) * scaleX // 캔버스의 시작점 - 이미지에서의 x좌표
    const sY = (e.clientY - cropLayerRect.top) * scaleY // 캔버스의 시작점 - 이미에서의 y좌표

    selectedArea.sX = sX
    selectedArea.sY = sY
    setIsDrawing(true)
  }

  const onCropAreaHandler = (e: MouseEvent) => {
    if (!isDrawing || !cropLayerRef.current || !canvasRef.current) return

    const cropLayer = cropLayerRef.current
    const selectedArea = selectedAreaRef.current
    const { scaleX, scaleY } = getCanvasScale()

    const cropLayerRect = cropLayer.getBoundingClientRect()
    const eX = (e.clientX - cropLayerRect.left) * scaleX // 캔버스의 시작점 - 이미지에서의 x좌표
    const eY = (e.clientY - cropLayerRect.top) * scaleY // 캔버스의 시작점 - 이미지에서의 y좌표

    const selectedEndX = eX - selectedArea.sX // 마우스를 이동한 x거리 (넓이)
    const selectedEndY = eY - selectedArea.sY // 마우스를 이동한 y거리 (높이)

    selectedArea.eX = eX // 캔버스 내 좌표
    selectedArea.eY = eY // 캔버스 내 좌표

    const ctx = cropLayer.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, cropLayer.width, cropLayer.width) // 다시 그릴 때 캔버스 초기화 //clientWidth, width 차이?

    // 선택영역 그리기
    ctx.strokeRect(selectedArea.sX, selectedArea.sY, selectedEndX, selectedEndY) // 마우스를 이동한 좌표 영역만큼 사각형 그리기(시작x좌표, 시작y좌표, 넓이, 높이)

    ctx.strokeStyle = 'white'
    ctx.setLineDash([4, 2])
    ctx.shadowOffsetX = 1.5
    ctx.shadowOffsetY = 1.5
    ctx.shadowBlur = 1
    ctx.shadowColor = 'rgb(0 0 0 / 80%)'
  }

  const onCropEndHandler = () => {
    if (!canvasRef.current) return
    setIsDrawing(false)
  }

  const saveChanges = () => {
    if (!canvasRef.current || !cropLayerRef.current) return
    drawCroppedImg()

    const canvas = canvasRef.current
    const cropLayer = cropLayerRef.current
    canvas.width = cropLayer.width
    canvas.height = cropLayer.height

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(cropLayer, 0, 0, cropLayer.clientWidth, cropLayer.clientHeight)
    setOnCropMode(false)
  }

  const cancelChanges = () => {
    if (!cropLayerRef.current || !canvasRef.current) return

    const ctx = cropLayerRef.current.getContext('2d')
    ctx?.clearRect(0, 0, cropLayerRef.current.width, cropLayerRef.current.height)
    setOnCropMode(false)
  }

  const returnToOriginal = () => {
    if (!canvasRef.current || !originalImg || !cropLayerRef.current) return

    const canvas = canvasRef.current
    canvas.width = originalImg.width
    canvas.height = originalImg.height
    const ctx = canvas.getContext('2d')
    ctx?.drawImage(originalImg, 0, 0, originalImg.width, originalImg.height)

    // cropLayer를 원본 이미지크기로 리셋
    const cropLayer = cropLayerRef.current
    cropLayer.width = originalImg.width
    cropLayer.height = originalImg.height
    const layerCtx = cropLayer.getContext('2d')
    layerCtx?.reset()
  }

  const drawCroppedImg = () => {
    if (!cropLayerRef.current || !canvasRef.current) return

    const selectedArea = selectedAreaRef.current

    // 선택 영역의 너비와 높이 계산
    const width = Math.abs(selectedArea.eX - selectedArea.sX)
    const height = Math.abs(selectedArea.eY - selectedArea.sY)

    // 시작점 계산 (음수 선택을 대비해 최소값 사용)
    const startX = Math.min(selectedArea.sX, selectedArea.eX)
    const startY = Math.min(selectedArea.sY, selectedArea.eY)

    // cropLayer의 크기를 선택한 영역 크기로 조정
    const cropLayer = cropLayerRef.current
    cropLayer.width = width
    cropLayer.height = height

    // cropLayer에 선택 영역의 이미지를 그림
    const cropCtx = cropLayer.getContext('2d')
    if (!cropCtx) return

    cropCtx.drawImage(canvasRef.current, startX, startY, width, height, 0, 0, width, height)
  }

  return {
    canvasRef,
    cropLayerRef,
    onCropMode,
    setOriginalImg,
    setOnCropMode,
    saveChanges,
    cancelChanges,
    returnToOriginal,
  }
}

export default useImageCrop
