import { Card, CardProps } from '@pancakeswap/uikit'
import { styled } from 'styled-components'

export const BodyWrapper = styled(Card)`
  border-radius: 1rem;
  width: 100%;
  z-index: 1;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...cardProps }: { children: React.ReactNode } & CardProps) {
  return <BodyWrapper {...cardProps}>{children}</BodyWrapper>
}
