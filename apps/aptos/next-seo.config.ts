import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | LolPadSwap',
  defaultTitle: 'LolPadSwap',
  description: 'The most popular AMM DEX on SCROLL',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@LolPadSwap',
    site: '@LolPadSwap',
  },
  openGraph: {
    title: 'LolPadSwap - The most popular DeFi exchange on Scroll',
    description: 'The most popular AMM on Scroll is here.',
    images: [{ url: 'https://scroll.lolpad.finance/lol-logo.png' }],
  },
}
