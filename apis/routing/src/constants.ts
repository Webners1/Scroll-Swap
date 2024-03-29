import { ChainId } from '@pancakeswap/chains'

export const SUPPORTED_CHAINS = [ChainId.SCROLL] as const

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number]
