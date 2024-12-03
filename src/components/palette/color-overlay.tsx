'use client'
import { useModalContext } from '@/context/modal-context'
import { CopyIcon, HeartIcon, DeleteIcon, ShadeIcon } from '@/icons/icons'
import { copyToClipboard } from '@/lib/palette-utils'
import ShadeModal from './shade-modal'
import { saveColor } from '@/lib/save-utils'
import { IColorInfo } from '@/constants/types'

type ColorOverlayProps = {
  hexCode: string
  textColor: string
  deleteColor: (hexCode: string) => void
  colorInfo: IColorInfo | undefined
}

export default function ColorOverlay({ hexCode, textColor, deleteColor, colorInfo }: ColorOverlayProps) {
  const { openModal } = useModalContext()

  const openShadeModal = (hexCode: string) => {
    openModal({
      title: 'Color Shades',
      content: <ShadeModal hexCode={hexCode} textColor={textColor} />,
    })
  }

  const colorBoxIcons = [
    { icon: <DeleteIcon />, key: 'delete', onClick: (hexCode: string) => deleteColor(hexCode) },
    {
      icon: <ShadeIcon />,
      key: 'shade',
      onClick: (hexCode: string) => openShadeModal(hexCode),
    },
    { icon: <CopyIcon />, key: 'copy', onClick: (hexCode: string) => copyToClipboard(hexCode) },
    {
      icon: <HeartIcon />,
      key: 'heart',
      onClick: (hexCode: string) => saveColor({ hexCode, textColor, colorName: colorInfo?.name.value || '?' }),
    },
  ]

  return (
    <div style={{ color: textColor }} className="w-full h-full flex flex-col justify-center gap-3 items-center">
      {colorBoxIcons.map(item => (
        <button
          key={item.key}
          style={{ color: textColor }}
          className="hover:bg-overlay p-2 rounded-lg"
          onClick={() => item.onClick(hexCode)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}
