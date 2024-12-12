'use client'
import { ISavedColors } from '@/constants/types'
import { useState } from 'react'
import MyColorOverlay from './my-color-overlay'

type MyColorBoxProps = {
  colorInfo: ISavedColors
}

export default function MyColorBox({ colorInfo }: MyColorBoxProps) {
  const [overlay, setOverlay] = useState(false)

  return (
    <section
      className={`w-full h-full flex flex-col justify-end items-center py-16`}
      style={{ backgroundColor: colorInfo.hexCode }}
      onMouseOver={() => setOverlay(true)}
      onMouseLeave={() => setOverlay(false)}
    >
      {overlay && <MyColorOverlay colorInfo={colorInfo} />}
      <div className="flex flex-col gap-5 items-center" style={{ color: colorInfo.textColor }}>
        <p className="font-bold text-2xl">{colorInfo.hexCode}</p>
        <p className="text-sm">{colorInfo?.colorName || '?'}</p>
      </div>
    </section>
  )
}
