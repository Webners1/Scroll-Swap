import Image from 'next/image'
import { HelpIcon } from '@pancakeswap/uikit'
import { isChainSupported } from 'utils/wagmi'
import { memo } from 'react'
import { ASSET_CDN } from 'config/constants/endpoints'

export const ChainLogo = memo(
  ({ chainId, width = 24, height = 24 }: { chainId: number; width?: number; height?: number }) => {
    if (isChainSupported(chainId)) {
      return (
        <Image
          alt={`chain-${chainId}`}
          style={{ maxHeight: `${height}px` }}
          src={
            chainId === 534352
              ? 'https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg'
              : `${ASSET_CDN}/web/chains/${chainId}.png`
          }
          width={width}
          height={height}
          unoptimized
        />
      )
    }

    return <HelpIcon width={width} height={height} />
  },
)
