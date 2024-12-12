'use client'
import { useModalContext } from '@/context/modal-context'
import { CopyIcon, HeartIcon, ShadeIcon, FilledHeartIcon } from '@/icons/icons'
import { copyToClipboard } from '@/lib/palette-utils'
import ShadeModal from '@/components/palette/shade-modal'
import { checkSavedSameColor, deleteSavedColor, saveColor } from '@/lib/save-utils'
import { ISavedColors } from '@/constants/types'
import { useEffect, useState } from 'react'

type ColorOverlayProps = {
  colorInfo: ISavedColors
}

export default function MyColorOverlay({ colorInfo }: ColorOverlayProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const { openModal } = useModalContext()
  const { hexCode, textColor } = colorInfo

  useEffect(() => {
    const isColorSaved = checkSavedSameColor(colorInfo.hexCode)
    setIsSaved(isColorSaved)
  }, [colorInfo])

  const openShadeModal = () => {
    openModal({
      title: 'Color Shades',
      content: <ShadeModal hexCode={hexCode} textColor={textColor} />,
    })
  }

  const toggleSaveColor = (hexCode: string) => {
    if (!isSaved) {
      saveColor(colorInfo)
      setIsSaved(true)
    } else {
      deleteSavedColor(hexCode)
      setIsSaved(false)
    }
  }

  const colorBoxIcons = [
    {
      icon: <ShadeIcon />,
      key: 'shade',
      onClick: openShadeModal,
    },
    { icon: <CopyIcon />, key: 'copy', onClick: (hexCode: string) => copyToClipboard(hexCode) },
    {
      icon: isSaved ? <FilledHeartIcon /> : <HeartIcon />,
      key: 'heart',
      onClick: toggleSaveColor,
    },
  ]

  return (
    <div style={{ color: textColor }} className="w-full h-full flex justify-center gap-3 mb-4 items-center">
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
