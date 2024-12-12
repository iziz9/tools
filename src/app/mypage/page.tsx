'use client'
import Modal from '@/components/common/modal'
import MyColorBox from '@/components/mypage/my-color-box'
import { PATH } from '@/constants/path'
import { ISavedColors } from '@/constants/types'
import { PaletteIcon } from '@/icons/icons'
import { getSavedColors } from '@/lib/save-utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MyPage() {
  const [colors, setColors] = useState<ISavedColors[]>([])

  useEffect(() => {
    const savedColors: ISavedColors[] = getSavedColors()
    setColors(savedColors?.length > 5 ? savedColors.slice(-5).reverse() : savedColors)
  }, [])

  return (
    <main className="pt-12 relative">
      <Modal />
      <section>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <PaletteIcon />
            <h2 className="font-semibold text-lg">저장된 색상</h2>
          </div>
          <Link href={PATH.MY_COLORS} className="flex text-sm">
            전체보기
          </Link>
        </div>
        <div className="border border-gray-200 w-full h-60 mt-2 flex justify-around items-center">
          {colors ? (
            colors.map(color => (
              <div key={color.hexCode} className="w-full h-full">
                <MyColorBox colorInfo={color} />
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>저장된 색상이 없습니다.</p>
              <span className="font-bold text-tools">컬러 팔레트</span>
              <span>에서 ❤️ 버튼을 눌러보세요!</span>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
