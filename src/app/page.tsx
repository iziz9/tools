import Card from '@/components/card/card'

export default function Home() {
  return (
    <main className="py-20 px-10 w-full h-full">
      <div className="flex align-middle gap-28 w-full h-full">
        <Card />
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
