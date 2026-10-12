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
  ]
}
