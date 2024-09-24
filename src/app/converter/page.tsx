import FileConverter from '@/components/converter/file-converter'

export default function ConverterPage() {
  return (
    <main>
      <div className="flex flex-col text-center mb-8">
        <h1 className="text-red-500 text-2xl">이미지 변환기</h1>
        <span className="text-lg">파일을 원하는 포맷으로 변경하세요.</span>
      </div>
      <FileConverter />
    </main>
  )
}
