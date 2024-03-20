import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | LolPad Finance',
  defaultTitle: 'LolPad Finance',
  description:
    'Cheaper and faster than Uniswap? Discover LolPad Finance, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for CAKE.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@LolPadFinance',
    site: '@LolPadFinance',
  },
  openGraph: {
    title: 'LolPad Finance -LolPadSwap - The most popular DeFi exchange on Scroll',
    description: 'The most popular AMM on Layer2 Chains. Now on Scroll Chain',
    images: [{ url: 'https://scroll.lolpad.finance/lol-logo.png' }],
  },
}
