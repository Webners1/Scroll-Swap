import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | LolPadSwap',
  defaultTitle: 'Game | LolPadSwap',
  description: 'Play different games on LolPadSwap, using CAKE and LolPadSwap NFTs',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@LolPadSwap',
    site: '@LolPadSwap',
  },
  openGraph: {
    title: '🥞 LolPadSwap - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description: 'Play different games on LolPadSwap, using CAKE and LolPadSwap NFTs',
    images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}
