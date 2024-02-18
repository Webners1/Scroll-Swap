import { useIsMounted } from "@pancakeswap/hooks";
import throttle from "lodash/throttle";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { AtomBox } from "../../components/AtomBox";
import { Box } from "../../components/Box";
import { LangSelector } from "../../components/LangSelector";
import MenuItem from "../../components/MenuItem/MenuItem";
import { useMatchBreakpoints } from "../../contexts";
import MobileNav from "./MobileNav";
import { MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { MenuContext } from "./context";
import { CustomHeaderWrapperStyled, StyledSidebar } from "./styled";
import { NavProps } from "./types";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
`;

const FixedContainer = styled("div").withConfig({
  shouldForwardProp: (props) => !["showMenu"].includes(props),
})<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: fit-content;
  z-index: 20;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  width: 100%;
  min-height: 100vh;
  padding-top: 30px;
  @media (min-width: 768px) {
    padding-top: initial;
  }
`;

const Inner = styled.div`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  > div {
    background: #181818;
  }
`;

const MainLinkContainerStyled = styled.ul`
  padding: 50px 0px 0px 30px;
  list-style: none;

  li:has(a:empty) {
    display: none;
  }

  li:has(div:empty) {
    display: none;
  }
`;
const MainLinkStyled = styled.li`
  font-size: 16px;
  padding: 15px 20px 15px 30px;
  position: relative;
  width: 100%;

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none !important;
    font-weight: 400;
    padding: 0px;
    height: fit-content;
    :hover {
      text-decoration: none;
    }
  }
  &.active {
    background-color: #181818;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;

    i {
      svg path {
        fill: #fff;
      }
    }

    a {
      color: #fff;
    }

    .top-curve {
      position: absolute;
      top: -20px;
      height: 20px;
      right: 0px;
      width: 20px;
      display: block;
      background: #181818;

      &::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        height: 100%;
        width: 20px;
        background: #262626;
        border-bottom-right-radius: 20px;
      }
    }
    .bottom-curve {
      position: absolute;
      bottom: -20px;
      height: 20px;
      right: 0px;
      width: 20px;
      display: block;
      background: #181818;
      &::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        height: 100%;
        width: 20px;
        background: #262626;
        border-top-right-radius: 20px;
      }
    }
  }
`;

const StyledIcon = styled.i`
  padding: 5px;
  border-radius: 7px;
  background-color: rgba(255, 255, 255, 0.05);
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackDrop = styled.div`
  position: absolute;
  background-color: #000;
  opacity: 0.6;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  margin: auto;
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SocialLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 20px;
  border-top: 1px solid #ffffff30;
  margin-right: 30px;
  margin-top: 30px;
`;

const SidebarSettingsWrapper = styled.div`
  margin: 0px 30px 50px;
  padding-top: 20px;
  border-top: 1px solid #ffffff30;
`;

const SwapIcon = ({ color = "rgba(255, 255, 255, 0.6)" }: { color?: string }) => (
  <svg
    viewBox="0 0 20 20"
    style={{ paddingTop: 2 }}
    width="20px"
    height="20px"
    color="text"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color}
      d="M15.6495 0.349997L12.8595 3.14C12.5395 3.46 12.7595 4 13.2095 4H14.9995V10.88C14.9995 11.88 14.3295 12.81 13.3395 12.97C12.0895 13.18 10.9995 12.21 10.9995 11V4.17C10.9995 2.08 9.46954 0.219997 7.38954 0.0199968C6.83404 -0.034733 6.27324 0.0274656 5.74323 0.202588C5.21323 0.377711 4.72577 0.661876 4.31223 1.03679C3.89869 1.41171 3.56824 1.86906 3.34216 2.37942C3.11608 2.88977 2.99937 3.44181 2.99954 4V11H1.20954C0.759542 11 0.539542 11.54 0.859542 11.85L3.64954 14.64C3.84954 14.84 4.15954 14.84 4.35954 14.64L7.14954 11.85C7.21864 11.7795 7.26533 11.6901 7.28373 11.5931C7.30212 11.4962 7.29139 11.3959 7.25289 11.305C7.21439 11.2141 7.14985 11.1366 7.06739 11.0823C6.98493 11.0281 6.88826 10.9994 6.78954 11H4.99954V4.12C4.99954 3.12 5.66954 2.19 6.65954 2.03C7.90954 1.82 8.99954 2.79 8.99954 4V10.83C8.99954 12.92 10.5295 14.78 12.6095 14.98C14.9895 15.21 16.9995 13.34 16.9995 11V4H18.7895C19.2395 4 19.4595 3.46 19.1395 3.15L16.3495 0.359997C16.1595 0.159997 15.8395 0.159997 15.6495 0.349997Z"
    />
  </svg>
);

const LiquidityIcon = ({ color = "rgba(255, 255, 255, 0.6)" }: { color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <path
      fill={color}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m17.668 10.29l-4.493-6.673c-.421-.625-1.288-.803-1.937-.397a1.376 1.376 0 0 0-.41.397l-4.893 7.26C4.24 13.715 4.9 17.318 7.502 19.423a7.175 7.175 0 0 0 5.493 1.51M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H17m2 0v1m0-8v1"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    className="sc-bdfBQB hmhIY"
    color="#fff"
    viewBox="0 0 24 24"
    cursor="pointer"
    opacity="0.6"
  >
    <path
      fill="#fff"
      d="M12 .3C5.5.3.3 5.5.3 12S5.5 23.7 12 23.7 23.7 18.5 23.7 12 18.5.3 12 .3zm6 8.6v.5c0 4-3.1 8.7-8.7 8.7-1.8 0-3.4-.5-4.7-1.2h.8c1.4 0 2.8-.6 3.8-1.4-1.4 0-2.4-.9-2.9-2.1h.6c.3 0 .5-.2.8-.2-1.4-.3-2.4-1.5-2.4-3.1.5.3.9.5 1.4.5-1-.6-1.6-1.5-1.6-2.6 0-.6.2-1.1.5-1.5C7.1 8.3 9.4 9.6 12 9.7c-.2-.3-.2-.5-.2-.8 0-1.7 1.4-3.1 3.1-3.1.9 0 1.7.3 2.1.9.8-.2 1.4-.5 2-.8-.3.8-.8 1.4-1.4 1.7.6 0 1.2-.2 1.8-.5-.2.9-.8 1.4-1.4 1.8z"
    />
  </svg>
);

const BridgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" opacity="0.6" viewBox="0 0 20 20">
    <path
      fill="#fff"
      d="M2.89 11.094c-.82.273-1.406 1.015-1.406 1.914 0 1.094.899 1.992 2.032 1.992a2 2 0 001.992-1.992c0-.781-.469-1.485-1.094-1.797C4.961 8.67 7.266 6.758 10 6.758c1.836 0 3.477.86 4.531 2.187.469-.234.977-.39 1.524-.43-1.29-1.953-3.516-3.28-6.055-3.28-3.516 0-6.445 2.538-7.11 5.859zm15.626 1.914c0 1.094-.899 1.992-2.032 1.992a2 2 0 01-1.992-1.992 2 2 0 011.992-1.992c1.133 0 2.032.898 2.032 1.992zm0 0"
    />
  </svg>
);

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  buyCakeLink,
  children,
  chainId,
}) => {
  const { isMobile } = useMatchBreakpoints();
  const isMounted = useIsMounted();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(window?.location?.pathname);
  }, [window?.location?.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = useMemo(() => subLinks?.filter((subLink) => !subLink.isMobileOnly), [subLinks]);
  const subLinksMobileOnly = useMemo(() => subLinks?.filter((subLink) => subLink.isMobileOnly), [subLinks]);
  const providerValue = useMemo(() => ({ linkComponent }), [linkComponent]);

  const topLevelLinks: any = [];
  const nestedLinks: any = [];

  const newLinks = [
    {
      label: "Swap",
      href: "/swap",
      icon: <SwapIcon />,
    },
    {
      label: "Liquidity",
      href: "/liquidity",
      icon: <LiquidityIcon />,
    },
    {
      label: "Bridge",
      href: "/bridge",
      icon: <BridgeIcon />,
    },
  ];

  return (
    <MenuContext.Provider value={providerValue}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      >
        <Wrapper>
          <CustomHeaderWrapperStyled>
            <StyledSidebar mobileNavOpen={mobileNavOpen}>
              {/* Default header here (code below) */}
              <MainLinkContainerStyled>
                {newLinks.map(
                  (item) =>
                    item.href && (
                      <MainLinkStyled
                        key={`${item.href}${item.label}`}
                        className={activeLink === item.href ? "active" : ""}
                      >
                        <b className="top-curve" />
                        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                        <span onClick={() => setMobileNavOpen(false)}>
                          <MenuItem {...{ href: item.href }}>
                            <StyledIcon>{item.icon}</StyledIcon> <span>{item.label}</span>
                          </MenuItem>
                        </span>
                        <b className="bottom-curve" />
                      </MainLinkStyled>
                    )
                )}
                <SocialLinkWrapper>
                  <MainLinkStyled>
                    <b className="top-curve" />
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                    <span onClick={() => setMobileNavOpen(false)}>
                      <StyledLink href="https://twitter.com/LolPadfinance" target="_blank">
                        <TwitterIcon />
                        <span>Twitter</span>
                      </StyledLink>
                    </span>
                    <b className="bottom-curve" />
                  </MainLinkStyled>
                </SocialLinkWrapper>
              </MainLinkContainerStyled>
              <SidebarSettingsWrapper>
                <LangSelector
                  currentLang={currentLang}
                  langs={langs}
                  setLang={setLang}
                  color="textSubtle"
                  dropdownPosition="top"
                />
              </SidebarSettingsWrapper>
            </StyledSidebar>
            <BodyWrapper>
              <Box mt="20px">{rightSide}</Box>
              {/* eslint-disable jsx-a11y/no-static-element-interactions */}
              {mobileNavOpen && <BackDrop onClick={() => setMobileNavOpen(!mobileNavOpen)} />}
              <Inner>{children}</Inner>
            </BodyWrapper>
          </CustomHeaderWrapperStyled>
        </Wrapper>
      </AtomBox>
      {/* eslint-disable jsx-a11y/no-static-element-interactions */}
      <MobileNav onClick={() => setMobileNavOpen(!mobileNavOpen)} />
    </MenuContext.Provider>
  );
};

export default Menu;

// {links
//   .filter((i) => i.label === "Trade")
//   .map(({ label, href, items }) => (
//     <MainLinkStyled key={href} className={activeItem === href ? "active" : ""}>
//       <b className="top-curve" />
//       {items ? (
//         <DropdownMenu
//           items={items.filter((i) => i.label === "Swap" || i.label === "Liquidity")}
//           label={label}
//           active={activeItem === href}
//         />
//       ) : (
//         <MenuItem {...{ href }} isActive={activeItem === href}>
//           {label}
//         </MenuItem>
//       )}
//       <b className="bottom-curve" />
//     </MainLinkStyled>
//   ))}

// {links.map(({ label, items: menuItems = [], href, icon, disabled }) => {
//   const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
//   const isActive = activeItem === href;
//   const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
//   const Icon = icon;
//   return (
//     <DropdownMenu
//       key={`${label}#${href}`}
//       items={menuItems}
//       py={1}
//       activeItem={activeSubItem}
//       isDisabled={disabled}
//     >
//       <MenuItem {...linkProps} isActive={isActive} statusColor={statusColor} isDisabled={disabled}>
//         {label || (icon && createElement(Icon as any, { color: isActive ? "secondary" : "textSubtle" }))}
//       </MenuItem>
//     </DropdownMenu>
//   );
// })}

// <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
//   {banner && isMounted && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
//   <StyledNav>
//     <Flex flexDirection="column">
//       <Logo href={homeLink?.href ?? "/"} />
//       <AtomBox display={{ xs: "none", md: "flex" }} flexDirection="column">
// <MenuItems
//           items={links}
//           activeItem={activeItem}
//           activeSubItem={activeSubItem}
//           ml="24px"
//           display="flex"
//           flexDirection="column"
//         />
//       </AtomBox>
//     </Flex>
//     <Flex flexDirection="column" alignItems="center" height="100%">
//       <AtomBox mr="12px" display={{ xs: "none", lg: "block" }}>
//         <CakePrice chainId={chainId} showSkeleton={false} cakePriceUsd={cakePriceUsd} />
//       </AtomBox>
//       <Box mt="4px">
//         <LangSelector
//           currentLang={currentLang}
//           langs={langs}
//           setLang={setLang}
//           buttonScale="xs"
//           color="textSubtle"
//           hideLanguage
//         />
//       </Box>
//       {rightSide}
//     </Flex>
//   </StyledNav>
// </FixedContainer>
// {subLinks ? (
//   <Flex justifyContent="space-around" overflow="hidden" flexDirection="column">
//     <SubMenuItems
//       items={subLinksWithoutMobile}
//       mt={`${totalTopMenuHeight + 1}px`}
//       activeItem={activeSubItem}
//     />

//     {subLinksMobileOnly && subLinksMobileOnly?.length > 0 && (
// <SubMenuItems
//   items={subLinksMobileOnly}
//   mt={`${totalTopMenuHeight + 1}px`}
//   activeItem={activeSubItem}
//   isMobileOnly
// />
//     )}
//   </Flex>
// ) : (
//   <div />
// )}
