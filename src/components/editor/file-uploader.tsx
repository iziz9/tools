'use client'
import { UploadIcon } from '@/icons/editorIcons'
import { ChangeEvent, RefObject } from 'react'

interface IFileUploader {
  fileChangeAction: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  fileInputRef: RefObject<HTMLInputElement>
}

export default function FileUploader({ fileChangeAction, fileInputRef }: IFileUploader) {
  const openFileSelectWindow = () => {
    fileInputRef.current?.click()
  }

  return (
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
  )
}
