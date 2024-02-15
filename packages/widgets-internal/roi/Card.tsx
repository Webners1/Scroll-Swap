import { Box } from "@pancakeswap/uikit";
import type {} from "csstype";
import { styled } from "styled-components";

export const Card = styled(Box)<{
  width?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width ?? "100%"};
  padding: ${({ padding }) => padding ?? "1.25rem"};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius ?? "16px"};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LightGreyCard = styled(Card)`
  background-color: #2e2e2e;
`;
