import { ChainId } from '@pancakeswap/chains'

export const SUPPORTED_CHAINS = [ChainId.SCROLL, ChainId.SCROLL_SEPOLIA] as const

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number]
