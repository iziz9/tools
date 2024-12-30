import FileConverter from '@/components/converter/file-converter'

export default function ConverterPage() {
  return (
    <main className="pt-12">
      <div className="flex flex-col text-center mb-8">
        <h1 className="text-tools text-2xl">이미지 변환</h1>
        <span className="text-lg">파일을 원하는 포맷으로 변경하세요.</span>
      </div>
      <FileConverter />
    </main>
  )
}
