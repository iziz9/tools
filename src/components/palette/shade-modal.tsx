'use client'
import { IColorSchemes } from '@/constants/types'
import { useModalContext } from '@/context/modal-context'
import { copyToClipboard } from '@/lib/palette-utils'
import { getColorSchemes } from '@/services/requests'
import { useEffect, useState } from 'react'

export default function ShadeModal({ hexCode, textColor }: { hexCode: string; textColor: string }) {
  const { modal } = useModalContext()
  const [schemes, setSchemes] = useState<IColorSchemes>()

  useEffect(() => {
    const requestGetColorSchemes = async () => {
      const res = await getColorSchemes(hexCode)
      console.log(res)
      setSchemes(res)
    }
    requestGetColorSchemes()
  }, [hexCode, textColor])

  if (!modal.isOpen) return null

  return (
    <div className="relative p-10 w-[400px] h-[560px]">
      {schemes ? (
        <div className="flex relative h-full">
          <div
            style={{ backgroundColor: hexCode, color: textColor }}
            className="relative w-40 h-full flex flex-col justify-center items-center gap-4"
          >
            <span>Selected Color</span>
            <span className="font-semibold">{hexCode}</span>
          </div>
          <div>
            {schemes.colors.map(item => (
              <div
                key={item.hex.clean}
                style={{ backgroundColor: item.hex.value, color: item.contrast.value }}
                className="w-40 h-12 flex justify-center items-center text-sm"
              >
                <button onClick={() => copyToClipboard(item.hex.value)}>{item.hex.value}</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative text-center my-52 text-2xl font-bold text-overlay">loading...</div>
      )}
    </div>
  )
}
