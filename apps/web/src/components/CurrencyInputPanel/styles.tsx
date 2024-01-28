import { styled } from 'styled-components'

export const InputContainerStyled = styled.div``

export const InputLabelStyled = styled.p`
  border-radius: 12px 12px 0px 0px;
  padding: 12px;
  background-color: #505050;
  color: #fff;
`

export const InputStyled = styled.div`
  background-color: #505050;
  border-top: 1px solid #ffffff10;
  border-radius: 0px 0px 12px 12px;
  padding: 12px 40px 12px 12px;
  div:has(> label) {
    background-color: transparent;
    max-width: 300px;
  }
  label:has(input:focus) {
    box-shadow: 0px 0px 0px 1px #f3c00d, 0px 0px 0px 4px #f3c10dd8;
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
