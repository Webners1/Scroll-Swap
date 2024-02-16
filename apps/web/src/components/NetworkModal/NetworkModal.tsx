import { ChainId } from '@pancakeswap/chains'
import { ModalV2 } from '@pancakeswap/uikit'
import { SUPPORT_ONLY_SCROLL_SEPOLIA } from 'config/constants/supportChains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { atom, useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { CHAIN_IDS } from 'utils/wagmi'
import { useNetwork } from 'wagmi'

export const hideWrongNetworkModalAtom = atom(false)

const PageNetworkSupportModal = dynamic(
  () => import('./PageNetworkSupportModal').then((mod) => mod.PageNetworkSupportModal),
  { ssr: false },
)
const WrongNetworkModal = dynamic(() => import('./WrongNetworkModal').then((mod) => mod.WrongNetworkModal), {
  ssr: false,
})
const UnsupportedNetworkModal = dynamic(
  () => import('./UnsupportedNetworkModal').then((mod) => mod.UnsupportedNetworkModal),
  { ssr: false },
)

export const NetworkModal = ({
  pageSupportedChains = SUPPORT_ONLY_SCROLL_SEPOLIA,
}: {
  pageSupportedChains?: number[]
}) => {
  const { chainId, chain, isWrongNetwork } = useActiveWeb3React()
  const { chains } = useNetwork()
  const [dismissWrongNetwork, setDismissWrongNetwork] = useAtom(hideWrongNetworkModalAtom)

  const isScrollSepoliaOnlyPage = useMemo(() => {
    return pageSupportedChains?.length === 1 && pageSupportedChains[0] === ChainId.SCROLL_SEPOLIA
  }, [pageSupportedChains])

  const isPageNotSupported = useMemo(
    () => Boolean(pageSupportedChains.length) && !pageSupportedChains.includes(chainId),
    [chainId, pageSupportedChains],
  )
  if (pageSupportedChains?.length === 0) return null // open to all chains

  if (isPageNotSupported && isScrollSepoliaOnlyPage) {
    return (
      <ModalV2 isOpen closeOnOverlayClick={false}>
        <PageNetworkSupportModal />
      </ModalV2>
    )
  }

  if (isWrongNetwork && !dismissWrongNetwork && !isPageNotSupported) {
    const currentChain = chains.find((c) => c.id === chainId)
    if (!currentChain) return null
    return (
      <ModalV2 isOpen={isWrongNetwork} closeOnOverlayClick onDismiss={() => setDismissWrongNetwork(true)}>
        <WrongNetworkModal currentChain={currentChain} onDismiss={() => setDismissWrongNetwork(true)} />
      </ModalV2>
    )
  }

  if ((chain?.unsupported ?? false) || isPageNotSupported) {
    return (
      <ModalV2 isOpen closeOnOverlayClick={false}>
        <UnsupportedNetworkModal pageSupportedChains={pageSupportedChains?.length ? pageSupportedChains : CHAIN_IDS} />
      </ModalV2>
    )
  }

  return null
}
