'use client'
import { useModalContext } from '@/context/modal-context'
import { CopyIcon, HeartIcon, DeleteIcon, ShadeIcon, FilledHeartIcon } from '@/icons/icons'
import { copyToClipboard } from '@/lib/palette-utils'
import ShadeModal from '@/components/palette/shade-modal'
import { checkSavedSameColor, deleteSavedColor, saveColor } from '@/lib/save-utils'
import { IColorInfo } from '@/constants/types'
import { useEffect, useState } from 'react'

type ColorOverlayProps = {
  hexCode: string
  textColor: string
  deleteColor?: (hexCode: string) => void
  colorInfo: IColorInfo | undefined
}

export default function ColorOverlay({ hexCode, textColor, deleteColor, colorInfo }: ColorOverlayProps) {
  const { openModal } = useModalContext()
  const [isSaved, setIsSaved] = useState<boolean>(false)

  useEffect(() => {
    const isColorSaved = checkSavedSameColor(hexCode)
    setIsSaved(isColorSaved)
  }, [hexCode])

  const saveMyColor = () => {
    saveColor({ hexCode, textColor, colorName: colorInfo?.name.value || '?' })
    setIsSaved(true)
  }

  const removeMyColor = () => {
    deleteSavedColor(hexCode)
    setIsSaved(false)
  }

  const openShadeModal = () => {
    openModal({
      title: 'Color Shades',
      content: <ShadeModal hexCode={hexCode} textColor={textColor} />,
    })
  }

  const colorBoxIcons = [
    { icon: <DeleteIcon />, key: 'delete', onClick: (hexCode: string) => deleteColor && deleteColor(hexCode) },
    {
      icon: <ShadeIcon />,
      key: 'shade',
      onClick: openShadeModal,
    },
    { icon: <CopyIcon />, key: 'copy', onClick: (hexCode: string) => copyToClipboard(hexCode) },
    {
      icon: isSaved ? <FilledHeartIcon /> : <HeartIcon />,
      key: 'heart',
      onClick: isSaved ? removeMyColor : saveMyColor,
    },
  ].filter(item => {
    if (!deleteColor) return item.key !== 'delete'
    else return true
  })

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
