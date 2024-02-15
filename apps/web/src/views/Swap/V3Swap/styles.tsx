import { Box } from '@pancakeswap/uikit'
import { styled } from 'styled-components'

export const StyledButtonWrapper = styled(Box)`
  button {
    background-color: #f3c00d;
  }
`
export const StyledFormWrapper = styled.div`
  .form-header-border-color {
    border-color: #333;
  }
`
export const StyledTabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 767px) {
    flex: 1;
    width: 100%;
  }

  a {
    width: 100%;
  }

  button {
    width: 100%;
    background-color: #262626;
    box-shadow: none;
    border: 2px solid #f3c00d;
    color: #f3c00d;
  }
  .active {
    background-color: #f3c00d;
    color: #fff;
  }
`

export const DetailsContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 32px 32px;
`
