'use client'
import useCanvas from '@/hooks/useCanvas'
import useFileUpload from '@/hooks/useFileUpload'
import styles from '@/styles/main.module.css'
import { useEffect, useRef } from 'react'

export default function Card() {
  const frameRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const { canvasRef, drawImage } = useCanvas()
  const { file, fileInputRef, changeFile, openFileSelectWindow } = useFileUpload()

  useEffect(() => {
    if (!file) return

    const ratio = {
      canvasWidth: 300,
      canvasHeight: 400,
    }
    drawImage({ file, ratio })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

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
    <section className="flex flex-col gap-8 items-center">
      <div ref={frameRef} className={styles.frame} onMouseEnter={addMouseMoveEvent} onMouseLeave={deleteMouseMoveEvent}>
        <label htmlFor="file" onClick={() => openFileSelectWindow()} className="cursor-pointer">
          <div ref={cardRef} className={styles.card} style={!file ? { backgroundImage: 'url("/card.webp")' } : {}}>
            {file && <canvas ref={canvasRef} className={styles.card}></canvas>}
            <div ref={lightRef} className={styles.light}></div>
          </div>
        </label>
        <input type="file" name="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={changeFile} />
      </div>
      <div className="text-gray-400">Enter your mouse!</div>
    </section>
  )
}
