'use client'
import { useEffect, useState } from 'react'
import ColorOverlay from './color-overlay'
import { IColorInfo } from '@/constants/types'
import { getColorInfo } from '@/services/requests'

type ColorBoxProps = {
  hexCode: string
  deleteColor: (hexCode: string) => void
}

export default function ColorBox({ hexCode, deleteColor }: ColorBoxProps) {
  const [overlay, setOverlay] = useState(false)
  const [colorInfo, setColorInfo] = useState<IColorInfo>()
  // const isInitialRender = useRef(true)

  useEffect(() => {
    // if (isInitialRender.current) {
    //   isInitialRender.current = false
    //   return
    // }

    const requestGetColorInfo = async () => {
      const info = await getColorInfo(hexCode)
      console.log(info)
      setColorInfo(info)
    }
    requestGetColorInfo()
  }, [hexCode])

  const textColor = colorInfo && colorInfo.contrast.value === '#ffffff' ? '#eeeeee' : '#000'

  return (
    <section
      className={`w-full h-[32rem] flex flex-col justify-end items-center py-16`}
      style={{ backgroundColor: hexCode }}
      onMouseOver={() => setOverlay(true)}
      onMouseLeave={() => setOverlay(false)}
    >
      {overlay && <ColorOverlay hexCode={hexCode} textColor={textColor} deleteColor={deleteColor} />}

      <div className="flex flex-col gap-5 items-center">
        <p className="font-bold text-2xl" style={{ color: textColor }}>
          {hexCode}
        </p>
        <p className="text-sm" style={{ color: textColor }}>
          {colorInfo ? colorInfo.name.value : '?'}
        </p>
      </div>
    </section>
  )
}
