import { ISavedColors } from '@/constants/types'

export const getSavedColors = () => {
  const savedColors = localStorage.getItem('saved-color')
  return savedColors
}

export const saveColor = (colorInfo: ISavedColors) => {
  const savedColors = getSavedColors()
  console.log(savedColors)

  localStorage.setItem(
    'saved-color',
    JSON.stringify(savedColors?.length ? [...JSON.parse(savedColors), colorInfo] : [colorInfo]),
  )
}
