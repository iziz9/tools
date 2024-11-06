import { generateHexCode } from '@/lib/palette-utils'
import { useEffect, useState } from 'react'

const useColors = () => {
  const [hexArray, setHexArray] = useState<string[]>([])
  const [paletteCount, setPaletteCount] = useState<number>(5)
  const [oddRefresh, setOddRefresh] = useState<boolean>(true)

  useEffect(() => {
    generateColors()
  }, [oddRefresh])

  const generateColors = () => {
    for (let i = 0; i < paletteCount; i += 1) {
      const hexCode = generateHexCode()
      setHexArray(prev => [...prev, `#${hexCode}`])
    }
  }

  const refreshColors = () => {
    setOddRefresh(!oddRefresh)
    setHexArray([])
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

  return { hexArray, refreshColors, plusPalette, deleteColor, paletteCount }
}

export default useColors
