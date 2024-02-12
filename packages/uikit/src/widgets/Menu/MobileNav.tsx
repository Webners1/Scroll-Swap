import { styled } from "styled-components";

const NavStyled = styled.nav`
  background-color: #4b4b4b;
  width: 100vw;
  position: absolute;
  z-index: 10;
  top: 0;
  height: 50px;
  padding: 10px 30px;
  border-bottom: 1px solid #ffffff30;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }

  i {
    color: #ffffff90;
  }
`;

const HamburgerIcon = () => (
  <svg width="24" height="24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1h15M1 7h15M1 13h15"
    />
  </svg>
);

type NavProps = {
  onClick: () => void;
};

const MobileNav: React.FC<NavProps> = ({ onClick }) => {
  return (
    <NavStyled>
      <div />
      {/* eslint-disable jsx-a11y/no-static-element-interactions */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <i onClick={onClick}>
        <HamburgerIcon />
      </i>
    </NavStyled>
  );
};

export default MobileNav;
