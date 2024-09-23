'use client'
import { imgFormat } from '@/constants/names'
import { formatFileSize, removeFormat } from '@/lib/file-utils'
import { ChangeEvent, useRef, useState } from 'react'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<string>('...')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const downloadRef = useRef<HTMLAnchorElement>(null)

  const openFileSelectWindow = () => {
    fileInputRef.current?.click()
  }

  const fileChangeAction = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    setFile(file)
  }

  const deleteFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      setFile(null)
    }
  }

  const convertAction = async () => {
    if (!file) return
    if (selectedFormat === '...') return alert('파일 형식을 선택해주세요.')
    convertImage(file)
  }

  const convertImage = (file: Blob) => {
    const img = new Image() // 동적으로 이미지 생성
    img.src = URL.createObjectURL(file) // 업로드한 파일에서 생성한 url을 img.src로 지정

    const canvas = canvasRef.current
    if (!canvas) return new Error('canvas를 사용할 수 없습니다.')

    img.onload = () => {
      // 이미지가 성공적으로 로드되면
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d') // 2d 드로잉 영역에 접근
      ctx?.drawImage(img, 0, 0) // 업로드한 이미지를 캔버스에 그리기(이미지객체, x좌표, y좌표)

      if (!downloadRef.current) return new Error('이미지 변환에 실패했습니다.')
      return (downloadRef.current.href = canvas.toDataURL(`image/${selectedFormat}`))
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <label
        htmlFor="file"
        onClick={openFileSelectWindow}
        className="w-40 h-10 leading-10 bg-red-400 m-auto text-lg text-center cursor-pointer"
      >
        파일 선택
      </label>
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={fileChangeAction}
      />
      {file && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between border-2 p-4">
            <span>{file.name}</span>
            <span>{formatFileSize(file.size)}</span>
            <button onClick={deleteFile} className=" hover:text-blue-300">
              X
            </button>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <select
              className="border border-gray-200 p-2 text-center"
              onChange={e => setSelectedFormat(e.target.value)}
            >
              <option value={'...'}>...</option>
              {imgFormat.map(format => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
            <span>형식으로</span>
            <a
              role="button"
              href=""
              ref={downloadRef}
              download={`${removeFormat(file.name)}.${selectedFormat}`}
              onClick={convertAction}
              className="p-3 bg-gray-200 rounded-lg hover:border-gray-400 hover:border hover:bg-white"
            >
              다운로드
            </a>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  )
}
