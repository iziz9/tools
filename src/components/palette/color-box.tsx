type ColorBoxProps = {
  hexCode: string
}

export default function ColorBox({ hexCode }: ColorBoxProps) {
  return (
    <section
      className={`w-full h-96 flex flex-col justify-end items-center pb-14`}
      style={{ backgroundColor: hexCode }}
    >
      <p className="font-bold [text-shadow:_3px_1px_10px_rgb(255_255_255_/_100%)]">{hexCode}</p>
      <p>ColorName</p>
    </section>
  )
}
