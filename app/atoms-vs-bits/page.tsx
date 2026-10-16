import type { Metadata } from 'next'
import { PageContainer } from '@/components/page-container'

// Intentionally unlisted: do not add this route to navigation or a sitemap.
export const metadata: Metadata = {
  title: 'Atoms, Not Bits',
  description: 'From automation to autonomy, and making the physical world programmable.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
}

export default function AtomsVsBits() {
  return (
    <PageContainer>
      <article aria-labelledby="article-title">
        <h1 id="article-title" className="text-3xl font-bold mb-6">Atoms, Not Bits</h1>
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
          <p>{"In 2011, Marc Andreessen wrote Software Is Eating the World."}</p>
          <p>{"The argument was simple: more and more of the economy could be represented as software, and software had extraordinary economics. Bits could be copied almost for free, transmitted instantly, and recombined endlessly."}</p>
          <p>{"Over the next fifteen years, that happened."}</p>
          <p>{"Media became bits. Money became bits. Commerce, communication, maps, coordination, much of work itself—all moved onto computers."}</p>
          <p>{"Software made the physical world run better too. It could route a DoorDash order, schedule a factory, or tell a truck where to go."}</p>
          <p>{"But there was always a boundary."}</p>
          <p>{"The software could tell the truck where to go. Someone still had to drive it."}</p>
          <p>{"It could optimize a mine. Someone still had to move the rock."}</p>
          <p>{"It could take the order. Someone still had to carry it to your door."}</p>
          <p>{"We got very good at moving bits."}</p>
          <p>{"Atoms remained stubborn."}</p>
          <p>{"Lately, I’ve started hearing that distinction everywhere: “atoms,” the “war for atoms,” “physical AI.”"}</p>
          <p>{"Maybe you will too. Call it the Baader–Meinhof phenomenon."}</p>
          <p>{"But I think the frequency is actually increasing."}</p>
          <h2 className="text-2xl font-bold pt-6 text-black dark:text-white">{"From automation to autonomy"}</h2>
          <p>{"We have been automating the physical world for decades."}</p>
          <p>{"Factories have robots. Warehouses have conveyors. Mines have autonomous equipment. Airplanes have autopilot."}</p>
          <p>{"The difference is that most automation assumes a predictable world: follow this path, make this movement, stop when this sensor fires."}</p>
          <p>{"AI gives machines the beginnings of something different: the ability to see, interpret, decide, act, and adjust when the world does not behave exactly as expected."}</p>
          <p>{"That is the shift from automation to autonomy."}</p>
          <p>{"Mining makes this easier to see. Komatsu introduced commercial autonomous haulage in 2008. This year it commissioned its 1,000th autonomous ultra-class mining truck; together, the fleet has moved more than 11.5 billion metric tons of material."}</p>
          <p>{"These aren’t humanoids."}</p>
          <p>{"They’re enormous machines that have become increasingly capable of doing one useful job without a human sitting inside them."}</p>
          <p>{"And newer systems can add autonomy to equipment that already exists by retrofitting trucks with sensors, computers, and autonomous controls."}</p>
          <p>{"That feels like a better mental model for what is coming:"}</p>
          <p>{"Give the physical world a new control layer."}</p>
          <h2 className="text-2xl font-bold pt-6 text-black dark:text-white">{"Making atoms programmable"}</h2>
          <p>{"Travis Kalanick has a useful way of describing this."}</p>
          <p>{"A computer stores, moves, and transforms bits. The physical economy does the same with atoms:"}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{"Manufacturing transforms them."}</li>
            <li>{"Real estate stores them."}</li>
            <li>{"Transportation moves them."}</li>
          </ul>
          <p>{"Uber did not transport anyone. Cars did. Uber built a digital control layer over cars, drivers, roads, and demand."}</p>
          <p>{"DoorDash works similarly. Its software understands the order and coordinates the transaction, but something still has to move dinner through space."}</p>
          <p>{"Now DoorDash’s autonomous delivery system can decide whether that should be a person, a delivery robot, or a drone."}</p>
          <p>{"The software is getting closer to the physical outcome."}</p>
          <p>{"Intent → decision → machine → action."}</p>
          <p>{"That, to me, is the interesting version of the atoms thesis."}</p>
          <p>{"Not that everything becomes a robot."}</p>
          <p>{"That more of the physical world becomes programmable."}</p>
          <h2 className="text-2xl font-bold pt-6 text-black dark:text-white">{"Atoms are still atoms"}</h2>
          <p>{"This is also why the physical world is harder than the digital one."}</p>
          <p>{"A language model can predict the wrong word."}</p>
          <p>{"A mining truck cannot casually predict the wrong turn."}</p>
          <p>{"Machines need an understanding of space, motion, cause and effect. This is why so much work is going into simulation and world models: systems that help machines predict what might happen before acting in the real world."}</p>
          <p>{"And even then, atoms have properties bits don’t."}</p>
          <p>{"They have weight. They need energy. They break. They encounter weather and friction. Old factories need retrofitting. Robots need maintaining. Trucks need charging."}</p>
          <p>{"Humanoids may eventually matter because our world was built around the human body. But they are only one expression of this shift."}</p>
          <p>{"A tractor doesn’t need hands."}</p>
          <p>{"A mining truck doesn’t need legs."}</p>
          <p>{"A long-haul truck doesn’t need a face."}</p>
          <p>{"The larger opportunity is giving existing machines and infrastructure more intelligence—and gradually removing the requirement that every physical action has a human attached to it."}</p>
          <p>{"We spent decades building a digital representation of the world."}</p>
          <p>{"Now we are beginning to connect that intelligence back to the world it represents."}</p>
          <p>{"Sense. Understand. Decide. Act."}</p>
          <p>{"That is why I think we’re going to hear a lot more about atoms."}</p>
          <p>{"We made bits extraordinarily powerful."}</p>
          <p>{"Now we’re figuring out how to make them move things."}</p>
        </div>
      </article>
    </PageContainer>
  )
}
