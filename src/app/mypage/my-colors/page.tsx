'use client'
import Modal from '@/components/common/modal'
import MyColorBox from '@/components/mypage/my-color-box'
import { ISavedColors } from '@/constants/types'
import { RefreshIcon } from '@/icons/icons'
import { getSavedColors } from '@/lib/save-utils'
import { useLayoutEffect, useState } from 'react'

export default function MyColors() {
  const [colors, setColors] = useState<ISavedColors[]>([])

  useLayoutEffect(() => {
    const savedColors: ISavedColors[] = getSavedColors()
    setColors(savedColors.reverse())
  }, [])

  return (
    <main className="mb-10">
      <Modal />
      <div className="flex justify-end py-5 px-6">
        <button className="flex gap-1" onClick={() => alert('새로고칠것임')}>
          <span className="text-bold">새로고침</span>
          <RefreshIcon />
        </button>
      </div>
      <div className="w-full flex flex-wrap justify-center">
        {colors.map(color => (
          <div key={color.hexCode} className="w-1/4 min-w-60 h-60">
            <MyColorBox colorInfo={color} />
          </div>
        ))}
      </div>
    </main>
  )
}
