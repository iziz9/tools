import { IColorInfo } from '@/constants/types'
import { generateHexCode } from '@/lib/palette-utils'
import { getColorInfo } from '@/services/requests'
import { useEffect, useState } from 'react'

const useColors = () => {
  const [hexArray, setHexArray] = useState<string[]>([])
  const [paletteCount, setPaletteCount] = useState<number>(5)

  const generateColors = () => {
    for (let i = 0; i < paletteCount; i += 1) {
      const hexCode = generateHexCode()
      setHexArray(prev => [...prev, `#${hexCode}`])
    }
  }

  const refreshColors = () => {
    setHexArray([])
    generateColors()
  }

  const plusPalette = () => {
    if (paletteCount === 8) return
    setPaletteCount(prev => prev + 1)
    const hexCode = generateHexCode()
    setHexArray(prev => [...prev, `#${hexCode}`])
  }

  const deleteColor = (hexCode: string) => {
    if (paletteCount === 1) return
    setPaletteCount(prev => prev - 1)
    setHexArray(prev => prev.filter(item => item !== hexCode))
  }

  return { refreshColors, plusPalette, deleteColor, paletteCount, hexArray }
}

export default useColors
