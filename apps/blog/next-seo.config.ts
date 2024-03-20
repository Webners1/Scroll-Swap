import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | LolPadSwap',
  defaultTitle: 'Blog | LolPadSwap',
  description:
    'Cheaper and faster than Uniswap? Discover LolPadSwap, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for CAKE.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@LolPadSwap',
    site: '@LolPadSwap',
  },
  openGraph: {
    title: 'LolPadSwap - LolPadSwap - The most popular DeFi exchange on Scroll',
    description: 'LolPadSwap - The most popular DeFi exchange on Scroll',
    images: [{ url: 'https://scroll.lolpad.finance/lol-logo.png' }],
  },
}
