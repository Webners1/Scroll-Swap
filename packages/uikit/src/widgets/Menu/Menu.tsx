import { useIsMounted } from "@pancakeswap/hooks";
import throttle from "lodash/throttle";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { AtomBox } from "../../components/AtomBox";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import MenuItem from "../../components/MenuItem/MenuItem";
import { useMatchBreakpoints } from "../../contexts";
import DropdownMenu from "./DropdownMenu";
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
  max-width: 100vw;
  width: 100%;
  min-height: 100vh;
`;

const Inner = styled.div`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  > div {
    background: #272727;
  }
`;

const MainLinkContainerStyled = styled.ul`
  list-style: none;

  li:has(a:empty) {
    display: none;
  }

  li:has(div:empty) {
    display: none;
  }

  > li:first-child {
    padding-left: 50px;
  }
`;
const MainLinkStyled = styled.li`
  font-size: 16px;
  padding: 12px 20px 12px 30px;
  position: relative;

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
    background-color: rgb(39, 39, 39);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;

    .label {
      color: #fff;
    }

    .top-curve {
      position: absolute;
      top: -20px;
      height: 20px;
      right: 0px;
      width: 20px;
      display: block;
      background: rgb(39, 39, 39);

      &::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        height: 100%;
        width: 20px;
        background: rgba(120, 120, 120, 0.6);
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
      background: rgb(39, 39, 39);
      &::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        height: 100%;
        width: 20px;
        background: rgba(120, 120, 120, 0.6);
        border-top-right-radius: 20px;
      }
    }
  }
`;

const SingleLinkWrapperStyled = styled.div`
  padding-left: 20px;
`;

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

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

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

  links
    .filter((i) => i.label !== "Trade")
    .forEach((item) => {
      // Separate top-level objects
      const topLevelObject = { href: item.href, label: item.label };
      topLevelLinks.push(topLevelObject);

      // Separate nested objects
      if (item.items && item.items.length > 0) {
        item.items.forEach((nestedItem) => {
          nestedLinks.push(nestedItem);
        });
      }
    });

  console.log(topLevelLinks, "linkss", nestedLinks);
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
            <StyledSidebar>
              {/* Default header here (code below) */}
              <MainLinkContainerStyled>
                <MainLinkStyled className={activeItem === "/" ? "active" : ""}>
                  <b className="top-curve" />
                  <MenuItem {...{ href: "/" }} isActive={activeItem === "/"}>
                    Home
                  </MenuItem>
                  <b className="bottom-curve" />
                </MainLinkStyled>
                {links
                  .filter((i) => i.label === "Trade")
                  .map(({ label, href, items }) => (
                    <MainLinkStyled key={href} className={activeItem === href ? "active" : ""}>
                      <b className="top-curve" />
                      {items ? (
                        <DropdownMenu
                          items={items.filter((i) => i.label === "Swap" || i.label === "Liquidity")}
                          label={label}
                          active={activeItem === href}
                        />
                      ) : (
                        <MenuItem {...{ href }} isActive={activeItem === href}>
                          {label}
                        </MenuItem>
                      )}
                      <b className="bottom-curve" />
                    </MainLinkStyled>
                  ))}
                {topLevelLinks
                  .filter((i: any) => i.label !== "Earn")
                  .map((item: any) => {
                    const linkProps = { href: item.href };
                    return (
                      <MainLinkStyled
                        key={`${item.href}${item.label}`}
                        className={activeItem === item.href ? "active" : ""}
                      >
                        <b className="top-curve" />
                        <SingleLinkWrapperStyled>
                          <MenuItem {...linkProps} isActive={activeItem === item.href}>
                            {item.label}
                          </MenuItem>
                        </SingleLinkWrapperStyled>
                        <b className="bottom-curve" />
                      </MainLinkStyled>
                    );
                  })}
                {nestedLinks
                  .filter((i: any) => i.label !== "Overview")
                  .map(
                    (item: any) =>
                      item.href && (
                        <MainLinkStyled
                          key={`${item.href}${item.label}`}
                          className={activeItem === item.href ? "active" : ""}
                        >
                          <b className="top-curve" />
                          <SingleLinkWrapperStyled>
                            <MenuItem {...{ href: item.href }} isActive={activeItem === item.href}>
                              {item.label}
                            </MenuItem>
                          </SingleLinkWrapperStyled>
                          <b className="bottom-curve" />
                        </MainLinkStyled>
                      )
                  )}
              </MainLinkContainerStyled>
            </StyledSidebar>
            <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
              <Inner>{children}</Inner>
            </BodyWrapper>
          </CustomHeaderWrapperStyled>
        </Wrapper>
      </AtomBox>
      <AtomBox display={{ xs: "block", md: "none" }}>
        <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />
      </AtomBox>
    </MenuContext.Provider>
  );
};

export default Menu;

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
