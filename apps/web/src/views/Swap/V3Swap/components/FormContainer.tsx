import { Column } from '@pancakeswap/uikit'
import { PropsWithChildren, memo } from 'react'

import { Wrapper } from '../../components/styleds'

export const FormContainer = memo(function FormContainer({ children }: PropsWithChildren) {
  return (
    <Wrapper id="swap-page">
      <Column gap="32px">{children}</Column>
    </Wrapper>
  )
})
