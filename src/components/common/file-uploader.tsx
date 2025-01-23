'use client'
import { UploadIcon } from '@/icons/editorIcons'
import { ChangeEvent, RefObject } from 'react'

interface IFileUploader {
  fileChangeAction: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  fileInputRef: RefObject<HTMLInputElement>
  size: { width: string; height: string }
  openSelectWindow: () => void
}

export default function FileUploader({ fileChangeAction, fileInputRef, size, openSelectWindow }: IFileUploader) {
  return (
    <div>
      <label
        htmlFor="file"
        onClick={openSelectWindow}
        style={{ width: size.width, height: size.height }}
        className="flex flex-col justify-center items-center gap-3 border-2 border-dashed rounded-lg text-center cursor-pointer border-[#e5e7eb]"
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
