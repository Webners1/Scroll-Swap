import { styled } from "styled-components";

export const CustomHeaderWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #181818;
  height: auto;
`;

type SidebarProps = {
  mobileNavOpen: boolean;
};

export const StyledSidebar = styled.div<SidebarProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: #262626;
  height: 100%;
  width: ${(p) => (p.mobileNavOpen ? "250px" : "0px")};
  border-radius: 0 20px 20px 0;
  transition: 0.5s all;
  box-shadow: 0px 0px 4px 0px #00000050;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 250px;
    position: relative;
    box-shadow: none;
  }
`;
