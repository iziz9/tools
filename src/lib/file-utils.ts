export const formatFileSize = (size: number) => {
  const KB = 1024
  return (size / KB).toFixed(2) + ' KB'
}

export const removeFormat = (fileName: string) => {
  if (!fileName) return ''
  const idx = fileName.split('.').length - 1
  const originalFormat = `.${fileName.split('.')[idx]}`
  console.log(fileName.replace(originalFormat, ''))
  return fileName.replace(originalFormat, '')
}
