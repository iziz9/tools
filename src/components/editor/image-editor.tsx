'use client'
import useImageCrop from '@/hooks/useImageCrop'
import { CancelIcon, CropIcon, DeleteBinIcon, SaveIcon } from '@/icons/editorIcons'
import { CheckIcon } from '@/icons/icons'
import { useEffect } from 'react'
import FileUploader from '../common/file-uploader'
import useFileUpload from '@/hooks/useFileUpload'
import useCanvas from '@/hooks/useCanvas'

export default function ImageEditor() {
  const { canvasRef, downloadRef, drawImage, openSaveModal } = useCanvas()
  const { file, fileInputRef, changeFile, openFileSelectWindow, deleteFile } = useFileUpload()
  const { cropLayerRef, onCropMode, setOnCropMode, saveChanges, cancelChanges, setOriginalImg, returnToOriginal } =
    useImageCrop(canvasRef)

  useEffect(() => {
    if (!file) return

    drawImage({ file, setOriginalImg })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const deleteAction = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0)

    deleteFile()
    setOnCropMode(false)
  }

  if (!file)
    return (
      <div className="py-20">
        <FileUploader
          fileChangeAction={changeFile}
          fileInputRef={fileInputRef}
          size={{ width: '100%', height: '320px' }}
          openSelectWindow={openFileSelectWindow}
        />
      </div>
    )

  return (
    <div className="w-full flex flex-col gap-3">
      <section className="flex justify-between border border-[#e5e7eb] rounded-lg px-5 py-2 text-gray-600">
        <button onClick={deleteAction}>
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
              <button onClick={openSaveModal}>
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
  )
}
