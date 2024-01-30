import { styled } from "styled-components";

import { ArrowDownIcon, ButtonProps, IconButton } from "@pancakeswap/uikit";
import { CurrencyInputHeader, CurrencyInputHeaderSubTitle, CurrencyInputHeaderTitle } from "./CurrencyInputHeader";
import { CurrencyInputPanel } from "./CurrencyInputPanel";
import { SwapFooter as Footer } from "./Footer";
import { SwapPage as Page } from "./Page";
import { SwapInfo as Info, SwapInfoLabel as InfoLabel } from "./SwapInfo";
import { TradePrice } from "./TradePrice";

const SwitchIconButton = styled(IconButton)`
  background-color: transparent;
  .icon-up-down {
    display: none;
  }
`;

const SwitchButton = (props: ButtonProps) => (
  <SwitchIconButton variant="light" scale="sm" {...props}>
    <ArrowDownIcon className="icon-down" color="#fff" />
  </SwitchIconButton>
);

export {
  CurrencyInputHeader,
  CurrencyInputHeaderSubTitle,
  CurrencyInputHeaderTitle,
  CurrencyInputPanel,
  Footer,
  Info,
  InfoLabel,
  Page,
  SwitchButton,
  TradePrice,
};
