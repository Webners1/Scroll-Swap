import { Box, Text } from '@pancakeswap/uikit'
import { XSwapWidget } from '@xyfinance/widget'

const config = {
  disabledChains: [],
  fromInput: '0.1',
  fromToken: {
    address: '0x5300000000000000000000000000000000000004',
    chainId: '534352',
  },
  toToken: {
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    chainId: '56',
  },
  referrer: '0xFD19727868A8197F42e7a52d024374598F62953B',
  featuredTokens: [
    {
      address: '0x5300000000000000000000000000000000000004',
      chainId: '534352',
    },
  ],
}

const theme = {
  mode: 'dark',
  fontFamily: 'proxima-nova',
  borderRadius: {
    container: '12px',
    inner: '8px',
    button: '32px',
  },
  colors: {
    primary: '#f7e32f',
    gradient: ['#e0cc10', '#f7d32f'],
  },
  components: {
    button: {
      variant: 'gradient',
    },
  },
}

const BridgePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        margin: '0px auto',
      }}
    >
      <div
        style={{
          width: '480px',
        }}
      >
        <XSwapWidget config={config} theme={theme} />
      </div>
    </div>
  )
}

export default BridgePage
