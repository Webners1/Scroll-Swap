import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Lolpad Finance',
  defaultTitle: 'Lolpad Finance',
  description:
    'Cheaper and faster than Uniswap? Discover Lolpad Finance, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for CAKE.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@LolpadFinance',
    site: '@LolpadFinance',
  },
  openGraph: {
    title: '🥞 Lolpad Finance - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description:
      'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Lolpad Finance), NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}
