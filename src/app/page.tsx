'use client'

import styles from '@/styles/main.module.css'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!file) return
    drawImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const fileChangeAction = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file) return

    setFile(file)
  }

  const drawImage = () => {
    if (!file) return

    const img = new Image()
    const imgUrl = URL.createObjectURL(file)
    img.src = imgUrl

    const canvas = canvasRef.current
    if (!canvas) return new Error('canvas를 사용할 수 없습니다.')

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, img.width, img.height)
      URL.revokeObjectURL(imgUrl)
    }
    img.onerror = () => {
      new Error('이미지를 로드하는 데 실패했습니다.')
      URL.revokeObjectURL(imgUrl)
    }
  }
  const openFileSelectWindow = () => {
    fileInputRef.current?.click()
  }

  const mouseMove = (e: MouseEvent) => {
    if (!frameRef.current || !cardRef.current || !lightRef.current) return

    const { x, y, width, height } = frameRef.current?.getBoundingClientRect()
    const left = e.clientX - x
    const top = e.clientY - y
    const centerX = left - width / 2
    const centerY = top - height / 2
    const d = Math.sqrt(centerX ** 2 + centerY ** 2)

    cardRef.current.style.transform = `rotate3D(${-centerY / 100}, ${centerX / 100}, 0, ${d / 10}deg)`
    cardRef.current.style.boxShadow = `${-centerX / 10}px ${centerY / 10}px 10px rgba(0,0,0,0.2)`
    lightRef.current.style.backgroundImage = `radial-gradient(circle at ${left}px ${top}px, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.2))`
  }

  const addMouseMoveEvent = () => {
    frameRef.current?.addEventListener('mousemove', mouseMove)
  }
  const deleteMouseMoveEvent = () => {
    frameRef.current?.removeEventListener('mousemove', mouseMove)

    if (cardRef.current && lightRef.current) {
      cardRef.current.style.transform = ''
      cardRef.current.style.boxShadow = ''
      lightRef.current.style.backgroundImage = ''
    }
  }

  return (
    <main className="py-20 w-full h-full">
      <div className="flex align-middle gap-28 w-full h-full">
        <section className="flex flex-col gap-8 items-center">
          <div
            ref={frameRef}
            className={styles.frame}
            onMouseEnter={addMouseMoveEvent}
            onMouseLeave={deleteMouseMoveEvent}
          >
            <label htmlFor="file" onClick={openFileSelectWindow} className="cursor-pointer">
              <div ref={cardRef} className={styles.card} style={!file ? { backgroundImage: 'url("/card.webp")' } : {}}>
                {file && <canvas ref={canvasRef} className={styles.card}></canvas>}
                <div ref={lightRef} className={styles.light}></div>
              </div>
            </label>
            <input
              type="file"
              name="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={fileChangeAction}
            />
          </div>
          <div className="text-gray-400">Enter your mouse!</div>
        </section>
        <section className="flex flex-col mt-24">
          <p className=" pb-10 text-3xl font-bold">Hi! Welcome.</p>
          <span>
            This is a simple example of a 3D card effect. When you hover over the card, the card rotates and the light
            moves. This effect is implemented using CSS and JavaScript.
          </span>
          <span>Click on the card to apply 3D effect to the image you want!</span>
        </section>
      </div>
    </main>
  )
}
