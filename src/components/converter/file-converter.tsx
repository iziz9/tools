'use client'
import { imgFormat } from '@/constants/names'
import { formatFileSize, imgUrlToBlob, removeFormat } from '@/lib/file-utils'
import { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import FileUploader from '../common/file-uploader'
import useFileUpload from '@/hooks/useFileUpload'

export default function FileConverter() {
  const [selectedFormat, setSelectedFormat] = useState<string>('...')
  const [convertedFileSize, setConvertedFileSize] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const downloadRef = useRef<HTMLAnchorElement>(null)
  const { file, fileInputRef, changeFile, openFileSelectWindow, deleteFile } = useFileUpload()

  const fileChangeAction = async (e: ChangeEvent<HTMLInputElement>) => {
    changeFile(e)
    setConvertedFileSize('')
  }

  const deleteAction = () => {
    deleteFile()
    setConvertedFileSize('')
  }

  const convertImage = (e: MouseEvent<HTMLButtonElement>) => {
    if (!file) return
    if (selectedFormat === '...') {
      e.preventDefault()
      return alert('파일 형식을 선택해주세요.')
    }

    const img = new Image()
    const imgUrl = URL.createObjectURL(file)
    img.src = imgUrl

    const canvas = canvasRef.current
    if (!canvas) return new Error('canvas를 사용할 수 없습니다.')

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const dataURL = canvas.toDataURL(`image/${selectedFormat}`)

      if (downloadRef.current) {
        downloadRef.current.download = `${removeFormat(file.name)}.${selectedFormat}` // 다운로드 시 파일이름 설정
        downloadRef.current.href = dataURL // 다운로드 링크 설정
        downloadRef.current.click() //다운로드 링크 클릭이벤트 발생

        const convertedFile = imgUrlToBlob(dataURL) // 변환된 파일 사이즈 체크
        setConvertedFileSize(formatFileSize(convertedFile.size))

        return URL.revokeObjectURL(imgUrl)
      }
    }
    img.onerror = () => {
      new Error('이미지를 로드하는 데 실패했습니다.')
      URL.revokeObjectURL(imgUrl)
    }
  }

  return (
    <div className="w-full flex flex-col gap-12">
      <FileUploader
        fileChangeAction={fileChangeAction}
        fileInputRef={fileInputRef}
        size={{ width: '100%', height: '150px' }}
        openSelectWindow={openFileSelectWindow}
      />
      {file && (
        <div className="flex flex-col gap-12">
          <div className="flex justify-between border-2 p-4">
            <span>{file.name}</span>
            <span>{formatFileSize(file.size)}</span>
            <button onClick={deleteAction} className=" hover:text-blue-300">
              X
            </button>
          </div>
          <div className="flex h-10 gap-3 justify-center items-center">
            <select
              className="border border-gray-200 p-2 text-center"
              onChange={e => setSelectedFormat(e.target.value)}
            >
              {selectedFormat === '...' && <option value={'...'}>...</option>}
              {imgFormat.map(format => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
            <span>형식으로</span>
            <button
              onClick={e => convertImage(e)}
              className="w-24 h-10 bg-gray-200 rounded-lg box-border hover:border-gray-400 hover:border hover:bg-white"
            >
              변환하기
            </button>
            <a href="" ref={downloadRef} className="hidden"></a>
          </div>

          {convertedFileSize && (
            <div className="text-center">
              파일 사이즈가
              <span className="text-red-400 font-semibold"> {formatFileSize(file.size)} </span>
              에서
              <span className="text-red-400 font-semibold"> {convertedFileSize} </span>로 변경되었습니다.
            </div>
          )}
        </div>
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  )
}
