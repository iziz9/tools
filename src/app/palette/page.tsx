'use client'
import ColorBox from '@/components/palette/color-box'
import useColors from '@/hooks/useColors'
import { CheckIcon, CopyIcon, HeartIcon, PlusIcon, RefreshIcon } from '@/icons/icons'
import { KeyboardEvent, useEffect, useRef } from 'react'
import { copyToClipboard } from '@/lib/palette-utils'
import { ModalProvider } from '@/context/modal-context'
import Modal from '@/components/common/modal'

export default function PalettePage() {
  const { refreshColors, plusPalette, deleteColor, paletteCount, hexArray } = useColors()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    refreshColors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const checkHexValidate = () => {
    if (!inputRef.current) return false

    if (inputRef.current.value.length < 7) {
      alert('#과 6자리 코드를 모두 입력해주세요.')
      return false
    }

    const regex = /^[A-Fa-f0-9#]+$/
    if (!regex.test(inputRef.current.value)) {
      alert('특수문자 #과 숫자, 영문자(A-F)만 입력 가능합니다.')
      return false
    }

    return true
  }

  const addSpecificColor = () => {
    if (!inputRef.current) return
    const isValid = checkHexValidate()

    if (isValid) return plusPalette(inputRef.current.value.replace('#', ''))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return

    switch (e.key) {
      case 'Enter':
        addSpecificColor()
        break
      case 'Escape':
        e.currentTarget.value = ''
        e.currentTarget.blur()
        break
    }
  }

  return (
    <ModalProvider>
      <Modal />
      <main>
        <div className="h-12 flex justify-end items-center gap-5">
          <div className="tooltip" data-tooltip={'색상코드로 팔레트 추가'}>
            <input
              type="text"
              placeholder="#FFFFFF"
              maxLength={7}
              className="w-40 h-9 leading-9 border-2 border-black rounded-sm px-3 py-1 text-sm placeholder:text-sm focus:outline-none"
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute top-1.5 right-2" onClick={addSpecificColor}>
              <CheckIcon />
            </div>
          </div>
          {menuButtons.map(button => {
            return button.key === 'plus' && paletteCount === 6 ? null : (
              <button
                key={button.key}
                className="tooltip"
                data-tooltip={button.tooltip}
                onClick={() => button.onclick()}
              >
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
