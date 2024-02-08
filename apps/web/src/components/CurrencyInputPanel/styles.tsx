import { styled } from 'styled-components'

export const InputContainerStyled = styled.div``

export const InputLabelStyled = styled.div`
  border-radius: 12px 12px 0px 0px;
  padding: 12px;
  background-color: #505050;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const InputStyled = styled.div`
  background-color: #505050;
  border-top: 1px solid #ffffff10;
  border-radius: 0px 0px 12px 12px;
  padding: 12px 12px 12px 12px;
  div:has(> label) {
    background-color: transparent;
    max-width: 100%;

    @media (min-width: 576px) {
      max-width: 300px;
    }
  }
  label:has(input:focus) {
    box-shadow: none;
  }
  div:has(> input) {
    background-color: #787878;
    border-radius: 12px;
  }
  input {
    text-align: left;
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }
`
