export const generateHexCode = () => {
  // 16진수 만들기 : 0x접두사 + 숫자
  // 0~ffffff (=16777215, 16진수로 표현 가능한 색의 범위)사이의 랜덤한 값 얻기
  // 결과값이 6자릿수가 아닐 경우 padStart로 채우기
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase()
}

export const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text) //구형 브라우저 지원 확인 필요
    alert(text + ' 코드가 복사되었습니다.')
  } catch {
    alert('복사에 실패했습니다. 코드를 직접 복사해주세요.')
  }
}
