import { styled } from "styled-components";

import { ButtonMenu } from "@pancakeswap/uikit";

export const FullWidthButtonMenu = styled(ButtonMenu)<{ disabled?: boolean }>`
  width: 100%;
  background-color: #262626aa;

  & > button {
    width: 100%;
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
