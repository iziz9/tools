import PaletteViewer from '@/components/palette/palette-viewer'
import { CopyIcon, HeartIcon, RefreshIcon } from '@/icons/icons'

const menuButtons = [
  {
    icon: <RefreshIcon />,
    tooltip: '새로고침',
    onclick: () => console.log('새로고침'),
  },
  {
    icon: <CopyIcon />,
    tooltip: '전체 코드 복사',
    onclick: () => console.log('전체 코드 복사'),
  },
  {
    icon: <HeartIcon />,
    tooltip: '전체 코드 저장',
    onclick: () => console.log('전체 코드 저장'),
  },
]

export default function PalettePage() {
  return (
    <main>
      <div className="h-12 flex justify-end items-center gap-5">
        {menuButtons.map(button => (
          <button className="tooltip" data-tooltip={button.tooltip}>
            {button.icon}
          </button>
        ))}
      </div>
      <PaletteViewer />
    </main>
  )
}
