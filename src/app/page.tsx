'use client'
import styles from '@/styles/main.module.css'
import { useRef } from 'react'

export default function Home() {
  const frameRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)

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
    <main className="py-12 w-full h-full">
      <p className="text-center pb-10 text-3xl font-bold">Hi! Welcome.</p>
      <div className="flex align-middle gap-28 w-full h-full">
        <section className="flex flex-col gap-8 items-center">
          <div
            ref={frameRef}
            className={styles.frame}
            onMouseEnter={addMouseMoveEvent}
            onMouseLeave={deleteMouseMoveEvent}
          >
            <a href="https://github.com/iziz9" target="blank">
              <div ref={cardRef} className={styles.card}>
                <div ref={lightRef} className={styles.light}></div>
              </div>
            </a>
          </div>
          <div className="text-gray-400">Enter your mouse!</div>
        </section>
        <section className="flex items-center">
          <span>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl nisl sociosqu sed nullam non sociosqu potenti enim
            odio. Auctor donec efficitur cursus ridiculus lectus. At integer dui vivamus nibh inceptos primis lectus
            habitant. Nisi imperdiet nunc fames facilisi euismod dui adipiscing. Cubilia sem hac cras gravida aliquet
            lacus amet non. Non blandit pellentesque dictumst laoreet blandit. Euismod mattis proin viverra ridiculus
            sociosqu felis nec arcu. Suscipit per imperdiet ullamcorper curabitur primis blandit. Pellentesque senectus
            semper efficitur turpis gravida. Sit risus magna maecenas habitasse litora tincidunt ligula! Porta magnis
            sapien magnis hendrerit taciti ligula; magna nostra accumsan. Efficitur dapibus convallis luctus risus
            senectus iaculis. Ornare elementum curae netus facilisi senectus. Varius ullamcorper sed est ut torquent
            massa ad montes. Auctor sit ridiculus class fermentum a eleifend erat. Finibus nostra lobortis phasellus
            ultricies commodo imperdiet. Duis suspendisse tortor imperdiet dapibus ad facilisis non gravida. Metus
            sollicitudin porta mus quisque nibh vulputate tincidunt. Elit gravida dignissim blandit felis consectetur
            nisi nullam risus potenti.
          </span>
        </section>
      </div>
    </main>
  )
}
