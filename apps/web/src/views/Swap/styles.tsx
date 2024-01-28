import { Box, Flex } from '@pancakeswap/uikit'
import { styled } from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  padding: 0 16px;
  width: 100%;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    ${({ $isChartExpanded }) => ($isChartExpanded ? 'padding: 0 120px' : 'padding: 0 40px')};
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  max-width: 600px;
  width: 100%;
`

export const StyledFormWrapper = styled(Box)`
  background-color: #4b4b4b;
`
