'use client'
import useImageCrop from '@/hooks/useImageCrop'
import { CancelIcon, CropIcon, DeleteBinIcon, SaveIcon, UploadIcon } from '@/icons/editorIcons'
import { CheckIcon } from '@/icons/icons'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export default function ImageEditor() {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const downloadRef = useRef<HTMLAnchorElement>(null)
  const {
    canvasRef,
    cropLayerRef,
    onCropMode,
    setOnCropMode,
    saveChanges,
    cancelChanges,
    setOriginalImg,
    returnToOriginal,
  } = useImageCrop()

  useEffect(() => {
    drawImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const openFileSelectWindow = () => {
    fileInputRef.current?.click()
  }

  const fileChangeAction = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    setFile(file)
  }

  const deleteFile = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0)
    setFile(null)
    setOnCropMode(false)
  }

  const drawImage = () => {
    if (!file) return

    const img = new Image() // 동적으로 이미지 생성
    const imgUrl = URL.createObjectURL(file) // 업로드한 파일에서 생성한 url을 img.src로 지정
    img.src = imgUrl
    setOriginalImg(img)

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

  const saveImg = () => {
    if (!downloadRef.current || !canvasRef.current) return

    const fileName = prompt('저장할 파일명을 입력해주세요.') //모달로 변경하기, 파일 형식 선택창 추가
    if (!fileName) return

    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL(`image/${'png'}`)

    downloadRef.current.href = dataURL
    downloadRef.current.download = `${fileName}.png` // 다운로드 시 파일이름 설정
    downloadRef.current.click() //다운로드 링크 클릭이벤트 발생
  }

  return (
    <div>
      {file ? (
        <div className="w-full flex flex-col gap-3">
          <section className="flex justify-between border border-[#e5e7eb] rounded-lg px-5 py-2 text-gray-600">
            <button onClick={deleteFile}>
              <DeleteBinIcon />
            </button>
            <div className="flex gap-5">
              {onCropMode ? (
                <div className="flex gap-3">
                  <button className="text-sm px-3 rounded-md flex gap-1 items-center" onClick={cancelChanges}>
                    <CancelIcon />
                    <span>편집 취소</span>
                  </button>
                  <button className="text-sm px-3 rounded-md flex gap-1 items-center" onClick={saveChanges}>
                    <CheckIcon />
                    <span>적용하기</span>
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={returnToOriginal}>초기화</button>
                  <button
                    onClick={() => {
                      setOnCropMode(true)
                    }}
                  >
                    <CropIcon />
                  </button>
                  <button onClick={saveImg}>
                    <SaveIcon />
                  </button>
                  <a href="" ref={downloadRef} className="hidden"></a>
                </>
              )}
            </div>
          </section>
          <section className="relative border-2 w-full border-[#e5e7eb] bg-[#e5e7eb] p-5">
            <div className="relative max-w-[80%] m-auto">
              <canvas ref={canvasRef} className="relative max-w-full m-auto" />
              <canvas
                ref={cropLayerRef}
                style={{ cursor: onCropMode ? 'cell' : 'auto' }}
                className="absolute inset-0 max-w-full max-h-full m-auto"
              />
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-20">
          <label
            htmlFor="file"
            onClick={openFileSelectWindow}
            className="w-full h-80 flex flex-col justify-center items-center gap-3 border-2 border-dashed rounded-lg text-center cursor-pointer border-[#e5e7eb]"
          >
            <UploadIcon />
            <span>이미지를 선택해주세요.</span>
          </label>
          <input
            type="file"
            name="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={fileChangeAction}
          />
        </div>
      )}
    </div>
  )
}
