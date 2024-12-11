'use client'
import { ISavedColors } from '@/constants/types'
import { FilledHeartIcon } from '@/icons/icons'
import { deleteSavedColor } from '@/lib/save-utils'

type MyColorBoxProps = {
  colorInfo: ISavedColors
  deleteColor: (hexCode: string) => void
}

export default function MyColorBox({ colorInfo, deleteColor }: MyColorBoxProps) {
  return (
    <section
      className={`w-full min-w-36 h-full flex flex-col justify-end items-center py-16`}
      style={{ backgroundColor: colorInfo.hexCode }}
    >
      <div className="flex flex-col gap-5 items-center" style={{ color: colorInfo.textColor }}>
        <button onClick={() => deleteColor(colorInfo.hexCode)}>
          <FilledHeartIcon />
        </button>
        <p className="font-bold text-2xl">{colorInfo.hexCode}</p>
        <p className="text-sm">{colorInfo?.colorName || '?'}</p>
      </div>
    </section>
  )
}
