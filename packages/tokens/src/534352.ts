import { WETH9, ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import { USDC, USDT, CAKE } from './common'

export const ScrollTokens = {
  weth: WETH9[ChainId.SCROLL],
  usdc: USDC[ChainId.SCROLL],
  usdt: USDT[ChainId.SCROLL],
  uni: new ERC20Token(
    ChainId.SCROLL,
    '0x434cdA25E8a2CA5D9c1C449a8Cb6bCbF719233E8',
    18,
    'UNI',
    'Uniswap',
    'https://uniswap.org/',
  ),
  wbtc: new ERC20Token(ChainId.SCROLL, '0x3C1BCa5a656e69edCD0D4E36BEbb3FcDAcA60Cf1', 8, 'WBTC', 'Wrapped BTC'),
}
