'use client'
import Modal from '@/components/common/modal'
import MyColorBox from '@/components/mypage/my-color-box'
import { ISavedColors } from '@/constants/types'
import { deleteSavedColor, getSavedColors } from '@/lib/save-utils'
import { useEffect, useState } from 'react'

export default function MyColors() {
  const [colors, setColors] = useState<ISavedColors[]>([])

  useEffect(() => {
    const savedColors: ISavedColors[] = getSavedColors()
    setColors(savedColors.reverse())
  }, [])

  const deleteColor = (hexCode: string) => {
    deleteSavedColor(hexCode)
    alert('색상이 삭제되었습니다. \n마이페이지에서 저장된 색상을 확인할 수 있습니다.')
  }

  return (
    <main>
      <Modal />
      <div className="w-full h-60 flex flex-wrap">
        {colors.map(color => (
          <MyColorBox key={color.hexCode} colorInfo={color} deleteColor={deleteColor} />
        ))}
      </div>
    </main>
  )
}
