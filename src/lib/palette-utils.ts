export const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text) //구형 브라우저 지원 확인 필요
    alert(text + ' 코드가 복사되었습니다.')
  } catch (err) {
    alert('복사에 실패했습니다. 코드를 직접 복사해주세요.')
  }
}
