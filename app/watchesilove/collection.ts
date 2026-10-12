import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Watch } from './types'

function image(filename: string, mime: string) {
  const bytes = readFileSync(join(process.cwd(), 'app/watchesilove/images', filename))
  return `data:${mime};base64,${bytes.toString('base64')}`
}

export function getWatches(): Watch[] {
  return [
    {
      name: 'Seiko Speedtimer',
      reference: 'SSC813',
      detail: 'White dial · Solar chronograph',
      href: 'https://www.seikowatches.com/us-en/products/prospex/special/speedtimer/solar/index',
      image: image('seiko-ssc813.jpg', 'image/jpeg'),
    },
    {
      name: 'Tudor Pelagos 39',
      reference: 'M25407N-0001',
      detail: 'Black dial · Titanium bracelet',
      href: 'https://www.tudorwatch.com/en/watches/pelagos/m25407n-0001',
      image: image('tudor-pelagos-39.png', 'image/png'),
    },
    {
      name: 'Rolex Cosmograph Daytona',
      reference: '126500LN · Black dial',
      detail: 'Oystersteel · Chronograph',
      href: 'https://www.rolex.com/watches/cosmograph-daytona/m126500ln-0002',
      image: image('rolex-daytona.png', 'image/png'),
      imageScale: 1.5,
    },
    {
      name: 'Citizen Zenshin',
      reference: 'AW0130-85M',
      detail: 'Turquoise dial · Eco-Drive',
      href: 'https://www.citizenwatches.com.au/products/aw0130-85m',
      image: image('citizen-zenshin-turquoise.webp', 'image/webp'),
    },
    {
      name: 'Studio Underd0g Watermel0n',
      reference: '01WMB · Gen3',
      detail: 'Watermelon dial · Manual chronograph',
      href: 'https://underd0g.com/products/01wmb',
      image: image('studio-underdog-watermelon.png', 'image/png'),
    },
    {
      name: 'Omega Speedmaster Moonwatch',
      reference: '310.30.42.50.01.002',
      detail: 'Black dial · Sapphire crystal',
      href: 'https://www.omegawatches.com/en-us/watch-omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425001002',
      image: image('omega-speedmaster-moonwatch.png', 'image/png'),
    },
    {
      name: 'Omega Seamaster Aqua Terra 150M',
      reference: '220.10.41.21.03.004',
      detail: 'Blue dial · Steel bracelet',
      href: 'https://www.omegawatches.com/en-us/watch-omega-seamaster-aqua-terra-150m-co-axial-master-chronometer-41-mm-22010412103004',
      image: image('omega-aqua-terra-blue.png', 'image/png'),
    },
  ]
}
