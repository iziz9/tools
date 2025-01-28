'use client'
import { imgFormat } from '@/constants/names'
import { useModalContext } from '@/context/modal-context'
import { useState } from 'react'

interface ISaveModalProps {
  saveImg: ({ fileName, format }: { fileName: string; format: string }) => void
}

export default function SaveModal({ saveImg }: ISaveModalProps) {
  const [fileName, setNewName] = useState<string>('')
  const [format, setFormat] = useState<string>('png')
  const { modal } = useModalContext()

  if (!modal.isOpen) return null

  return (
    <div className="relative p-10 w-[400px] h-[280px] flex flex-col justify-between items-center">
      <input
        type="text"
        placeholder="파일명을 입력해주세요."
        className="w-full h-12 border-2 p-3 border-gray-200 rounded-md"
        maxLength={24}
        onChange={e => setNewName(e.target.value)}
      />
      <select className="w-full h-12 border-2 p-3 border-gray-200 rounded-md" onChange={e => setFormat(e.target.value)}>
        {imgFormat.map(format => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </select>
      <button className="w-full h-12 bg-tools text-white rounded-md" onClick={() => saveImg({ fileName, format })}>
        저장하기
      </button>
    </div>
  )
}
