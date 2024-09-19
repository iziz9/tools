import { PATH } from '@/constants/path';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-20 border-b border-stone-200">
      <div className="w-full h-full lg:max-w-5xl p-4 m-auto flex gap-16 items-center">
        <Link href={PATH.HOME}>
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </Link>
        <nav className="flex w-full justify-between text-lg">
          <div className="flex gap-10">
            <Link href={PATH.CONVERTER}>이미지 변환</Link>
            <Link href={PATH.EDITOR}>이미지 편집</Link>
          </div>
          <Link href={PATH.MYPAGE}>내 파일</Link>
        </nav>
      </div>
    </header>
  );
}
