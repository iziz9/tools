export const formatFileSize = (size: number) => {
  const KB = 1024
  return (size / KB).toFixed(2) + ' KB'
}

export const removeFormat = (fileName: string) => {
  if (!fileName) return ''
  const idx = fileName.split('.').length - 1
  const originalFormat = `.${fileName.split('.')[idx]}`
  return fileName.replace(originalFormat, '')
}

export const imgUrlToBlob = (dataURL: string) => {
  // canvas의 url을 blob(file)로 만들기
  const byteString = atob(dataURL.split(',')[1])
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i)
  }

  const fileblob = new Blob([ab], { type: mimeString })
  return fileblob
}

export const checkNameValidation = (fileName: string) => {
  const invalidChars = /[\\/:*?"<>|]/
  if (!fileName || fileName.replaceAll('.', '') === '') return alert('파일명을 입력해주세요.')

  if (invalidChars.test(fileName)) {
    alert('파일명에 다음 특수문자를 포함할 수 없습니다: \\ / : * ? " < > |')
    return false
  }
  return true
}
