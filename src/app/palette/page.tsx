'use client'
import ColorBox from '@/components/palette/color-box'
import useColors from '@/hooks/useColors'
import { CopyIcon, HeartIcon, PlusIcon, RefreshIcon } from '@/icons/icons'
import { useEffect } from 'react'
import { copyToClipboard } from '@/lib/palette-utils'
import { ModalProvider } from '@/context/modal-context'
import Modal from '@/components/common/modal'

export default function PalettePage() {
  const { refreshColors, plusPalette, deleteColor, paletteCount, hexArray } = useColors()

  useEffect(() => {
    refreshColors()
  }, [])

  const copyAllHexCodes = () => {
    const allHexCodes = hexArray.join(', ')
    copyToClipboard(allHexCodes)
  }

  const menuButtons = [
    {
      key: 'plus',
      icon: <PlusIcon />,
      tooltip: '팔레트 1칸 추가',
      onclick: plusPalette,
    },
    {
      key: 'refresh',
      icon: <RefreshIcon />,
      tooltip: '새로고침',
      onclick: refreshColors,
    },
    {
      key: 'copy',
      icon: <CopyIcon />,
      tooltip: '전체 코드 복사',
      onclick: copyAllHexCodes,
    },
    {
      key: 'save',
      icon: <HeartIcon />,
      tooltip: '팔레트 저장',
      onclick: () => console.log('팔레트 저장'),
    },
  ]

  return (
    <ModalProvider>
      <Modal />
      <main>
        <div className="h-12 flex justify-end items-center gap-5">
          {menuButtons.map(button => {
            return button.key === 'plus' && paletteCount === 6 ? null : (
              <button key={button.key} className="tooltip" data-tooltip={button.tooltip} onClick={button.onclick}>
                {button.icon}
              </button>
            )
          })}
        </div>
        <div className="flex w-full justify-between">
          {hexArray.map(hex => (
            <ColorBox key={hex} hexCode={hex} deleteColor={deleteColor} />
          ))}
        </div>
      </main>
    </ModalProvider>
  )
}
