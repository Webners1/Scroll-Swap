/* eslint-disable react/no-unescaped-entities */
import { Flex, Link, Text } from '@pancakeswap/uikit'
import { styled } from 'styled-components'

export const Container = styled(Flex)`
  display: grid;
  max-width: 650px;
  margin: 50px auto;
  padding: 0px 16px;

  h1 {
    margin-bottom: 0.5em;
    font-size: 2.25rem;
    font-width: bold;
  }

  a {
    display: inline-block;
  }

  h3 {
    margin: 1em 0px 0.5em;
    font-weight: bold;
  }

  p {
    opacity: 0.94;
    margin-bottom: 1em;
    line-height: 24px;
  }

  li {
    margin: 0.5em 0px 0px 1em;
    color: ${({ theme }) => theme.colors.white};
  }
`

const GrindMasterPage = () => {
  return (
    <Container>
      <Text as="h1">How to start grinding Layer Zero with $110</Text>
      <Text as="p" color="white">
        1. Buy 130$ of $AVAX and send it to metamask on{' '}
        <Link href="https://chainlist.org/chain/43114" target="_blank">
          Avalanche C-Chain
        </Link>{' '}
        (~9 AVAX).
      </Text>

      <Text as="p" color="white">
        2. Move on{' '}
        <Link href="https://traderjoexyz.com/avalanche/trade" target="_blank">
          TraderJoe
        </Link>{' '}
        and perform two swaps:
      </Text>

      <Text as="p" color="white">
        3. Trade $AVAX for $USDC worth 0.1
      </Text>

      <Text as="p" color="white">
        4. Trade $AVAX for $STG worth 102$
      </Text>

      <Text as="p" color="white">
        5. Move on{' '}
        <Link href="https://theaptosbridge.com/bridge" target="_blank">
          Aptos Bridge
        </Link>
        , connect metamask and{' '}
        <Link
          href="https://chrome.google.com/webstore/detail/martian-wallet-for-sui-ap/efbglgofoippbgcjepnhiblaibcnclgk"
          target="_blank"
        >
          martian wallet
        </Link>{' '}
        =&gt; bridge 0.1 $USDC Avalanche to Aptos, inputting Gas On Destination: 0.05 APT. Wait, click on Claim and
        bridge them back from Aptos to Avalanche, inputting Gas on Destination: NONE.
      </Text>

      <Text as="p" color="white">
        6. Move on{' '}
        <Link href="https://stargate.finance/transfer" target="_blank">
          Stargate Bridge
        </Link>{' '}
        and bridge all $STG from Avalanche to FTM, inputting Gas on Destination: 9 FTM.
      </Text>

      <Text as="p" color="white">
        7. Move on{' '}
        <Link href="https://stargate.finance/stake/ftm" target="_blank">
          Stargate Stake
        </Link>
        , connect{' '}
        <Link href="https://chainlist.org/chain/250" target="_blank">
          Fantom
        </Link>{' '}
        network , stake 0.11 $STG on (max). This move will allow you to vote on{' '}
        <Link href="https://snapshot.org/#/stgdao.eth" target="_blank">
          Snapshot Stargate
        </Link>
        , where we will have to vote at least 3 times.
      </Text>

      <Text as="p" color="white">
        8.{' '}
        <Link href="https://stargate.finance/transfer" target="_blank">
          Bridge
        </Link>{' '}
        all $STG from FTM to{' '}
        <Link href="https://chainlist.org/chain/56" target="_blank">
          BNB
        </Link>
        , Gas on Destination: 0.0026 bnb
      </Text>

      <Text as="p" color="white">
        9.{' '}
        <Link href="https://stargate.finance/transfer" target="_blank">
          Bridge
        </Link>{' '}
        all $STG from BNB to Avalanche (G.on D: NONE)
      </Text>

      <Text as="p" color="white">
        10.{' '}
        <Link href="https://stargate.finance/transfer" target="_blank">
          Bridge
        </Link>
        : AVAX-FTM, FTM-AVAX, AVAX-FTM, FTM-AVAX
      </Text>

      <Text as="p" color="white">
        11. Move on{' '}
        <Link href="https://traderjoexyz.com/avalanche/trade" target="_blank">
          TraderJoe
        </Link>{' '}
        and swap your $STG into $BTC.b, leaving 1 $STG.
      </Text>

      <Text as="p" color="white">
        12. Move on{' '}
        <Link href="https://bitcoinbridge.network/bridge" target="_blank">
          Bitcoin Bridge
        </Link>{' '}
        and bridge $BTC.b to Polygon (G.on D: 0.7 $MATIC) and back to Avalanche.
      </Text>

      <Text as="p" color="white">
        13. Swap on{' '}
        <Link href="https://traderjoexyz.com/avalanche/trade" target="_blank">
          Trader Joe
        </Link>{' '}
        $BTC.b to $USDC.
      </Text>

      <Text as="p" color="white">
        14. Move on{' '}
        <Link href="https://stargate.finance/transfer" target="_blank">
          Stargate Bridge
        </Link>{' '}
        and bridge $USDC from Avalanche to Polygon (Gas on D: 0.15 $MATIC)
      </Text>

      <Text as="p" color="white">
        15. Visit{' '}
        <Link href="https://guild.xyz/stargate" target="_blank">
          Stargate Guild
        </Link>
        , connect wallet and socials, click on Join Guild. Join their Discord and claim role.
      </Text>

      <Text as="h3">Summary:</Text>
      <Text as="p">
        <ul>
          <li>Volume &gt; $1k</li>
          <li>11+ Transactions</li>
          <li>5 Networks: Avalanche, FTM, Polygon, BNB, Aptos</li>
          <li>Used: Stargate Bridge, Bitcoin bridge, Aptos bridge</li>
          <li>$STG is staked, have access to voting and Guild.</li>
          <li>Cost: 11$ fees + 15-20$ hold on account</li>
        </ul>
      </Text>

      <Text as="p" color="white">
        Keeping up the activity: Periodically send 0.01 $STG from Avalanche to FTM
      </Text>
    </Container>
  )
}

export default GrindMasterPage
