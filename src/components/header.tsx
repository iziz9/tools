import { PATH, PATH_NAMES } from '@/constants/path'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-stone-200 min-w-[750px]">
      <div className="w-full h-full lg:max-w-5xl p-4 m-auto flex gap-16 items-center">
        <Image src="/logo.webp" alt="logo" width={120} height={48} priority />
        <nav className="flex w-full justify-between">
          <div className="flex gap-10">
            <Link href={PATH.PALETTE}>{PATH_NAMES[PATH.PALETTE]}</Link>
            <Link href={PATH.CONVERTER}>{PATH_NAMES[PATH.CONVERTER]}</Link>
            <Link href={PATH.EDITOR}>{PATH_NAMES[PATH.EDITOR]}</Link>
          </div>
          <Link href={PATH.MYPAGE}>{PATH_NAMES[PATH.MYPAGE]}</Link>
        </nav>
      </div>
    </header>
  )
}
