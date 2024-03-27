import Image from "next/image";
import { memo } from "react";
import { HelpIcon, Box } from "@pancakeswap/uikit";
import { SpaceProps } from "styled-system";

export const ChainLogo = memo(
  ({
    chainId,
    width = 24,
    height = 24,
    ...props
  }: { chainId?: number; width?: number; height?: number } & SpaceProps) => {
    const icon = chainId ? (
      <Image
        alt={`chain-${chainId}`}
        style={{ maxHeight: `${height}px` }}
        src={
          chainId === 534352
            ? "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg"
            : `https://assets.pancakeswap.finance/web/chains/${chainId}.png`
        }
        width={width}
        height={height}
        unoptimized
      />
    ) : (
      <HelpIcon width={width} height={height} />
    );
    return <Box {...props}>{icon}</Box>;
  }
);
