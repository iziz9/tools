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

  const isSameColorSaved = checkSavedSameColor(colorInfo.hexCode)
  if (isSameColorSaved) return alert('이미 저장된 색상입니다.')
  // 아이콘 클릭 비활성화 필요

  const newList = [...savedColors, colorInfo]
  localStorage.setItem('saved-color', JSON.stringify(newList))
  alert('색상이 저장되었습니다. \n마이페이지에서 저장된 색상을 확인할 수 있습니다.')
  //alert 대신 아이콘 fill로 변경하기
}

export const checkSavedSameColor = (hexCode: string) => {
  const savedColors = getSavedColors()
  if (!savedColors) return false

  const sameColor = savedColors.find((color: ISavedColors) => color.hexCode === hexCode)
  return sameColor ? true : false
}
