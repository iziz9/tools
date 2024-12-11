import { ISavedColors } from '@/constants/types'

export const getSavedColors = () => {
  const savedColors = localStorage.getItem('saved-color')
  return savedColors ? JSON.parse(savedColors) : null
}

export const saveColor = (colorInfo: ISavedColors) => {
  const savedColors = getSavedColors()
  if (!savedColors) {
    return localStorage.setItem('saved-color', JSON.stringify([colorInfo]))
  }
  const newList = [...savedColors, colorInfo]
  localStorage.setItem('saved-color', JSON.stringify(newList))
}

export const checkSavedSameColor = (hexCode: string) => {
  const savedColors = getSavedColors()
  if (!savedColors) return false

  const sameColor = savedColors.find((color: ISavedColors) => color.hexCode === hexCode)
  return sameColor ? true : false
}

export const deleteSavedColor = (hexCode: string) => {
  const savedColors = getSavedColors()
  if (!savedColors) return

  const newList = savedColors.filter((color: ISavedColors) => color.hexCode !== hexCode)
  localStorage.setItem('saved-color', JSON.stringify(newList))
}
