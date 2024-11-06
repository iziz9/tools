import { CopyIcon, HeartIcon, DeleteIcon, ShadeIcon } from '@/icons/icons'
import { copyToClipboard } from '@/lib/palette-utils'

type ColorOverlayProps = {
  hexCode: string
  textColor: string
  deleteColor: (hexCode: string) => void
}

export default function ColorOverlay({ hexCode, textColor, deleteColor }: ColorOverlayProps) {
  const colorBoxIcons = [
    { icon: <DeleteIcon />, key: 'delete', onClick: (hexCode: string) => deleteColor(hexCode) },
    { icon: <ShadeIcon />, key: 'shade', onClick: (hexCode: string) => console.log(hexCode + ' shade 표시') },
    { icon: <CopyIcon />, key: 'copy', onClick: (hexCode: string) => copyToClipboard(hexCode) },
    { icon: <HeartIcon />, key: 'heart', onClick: (hexCode: string) => console.log(hexCode + ' 마이페이지로..') },
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
