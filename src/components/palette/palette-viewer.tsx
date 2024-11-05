import ColorBox from '@/components/palette/color-box'

export default function PaletteViewer() {
  const hexArray: string[] = []

  const generateColors = () => {
    // 16진수 만들기 : 0x접두사 + 숫자
    // 0~ffffff (=16777215, 16진수로 표현 가능한 색의 범위)사이의 랜덤한 값 얻기
    // 결과값이 6자릿수가 아닐 경우 padStart로 채우기
    for (let i = 0; i < 5; i += 1) {
      const hexCode = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
      hexArray.push(`#${hexCode}`)
    }
  }
  generateColors()

  return (
    <div className="flex w-full justify-between">
      {hexArray.map(hex => (
        <ColorBox key={hex} hexCode={hex} />
      ))}
    </div>
  )
}
