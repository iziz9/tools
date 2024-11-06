'use client'
import { useState } from 'react'
import ColorOverlay from './color-overlay'

type ColorBoxProps = {
  hexCode: string
  deleteColor: (hexCode: string) => void
}

export default function ColorBox({ hexCode, deleteColor }: ColorBoxProps) {
  const [overlay, setOverlay] = useState(false)

  return (
    <section
      className={`w-full h-[32rem] flex flex-col justify-end items-center py-16`}
      style={{ backgroundColor: hexCode }}
      onMouseOver={() => setOverlay(true)}
      onMouseLeave={() => setOverlay(false)}
    >
      {overlay && <ColorOverlay hexCode={hexCode} deleteColor={deleteColor} />}

      <div className="flex flex-col gap-5 items-center">
        <p className="font-bold text-2xl [text-shadow:_3px_1px_10px_rgb(255_255_255_/_100%)]">{hexCode}</p>
        <p className="text-sm">ColorName</p>
      </div>
    </section>
  )
}
