import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { Link } from "../../components/Link";

const NestedNavStyled = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: rgba(255, 255, 255, 0.6);
  }
`;
const NestedNavLabelStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 70px;
  cursor: pointer;
  margin-bottom: 8px;
  padding-left: 20px;
`;

type IconProps = {
  isOpen?: boolean;
};

const IconStyled = styled.i<IconProps>`
  padding: 5px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.05);
  > svg {
    ${(p) => (p.isOpen ? `transform:rotate(0deg);` : "transform:rotate(180deg);")}
  }
`;

type VisibilityProps = {
  height?: number;
};

const SubLinkContainerStyled = styled.ul<VisibilityProps>`
  list-style: none;
  height: ${(p) => p.height}px;
  overflow-y: hidden;
  transition: 0.3s all;
`;
const SubLinkStyled = styled.li`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 20px;
  a {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    text-decoration: none !important;
  }
  &.active {
    > a {
      color: rgb(255, 255, 255);
    }
  }
`;

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdfBQB hmhIY">
    <path
      fill="#fff"
      d="M8.71005 12.29L11.3001 9.69997C11.6901 9.30997 12.3201 9.30997 12.7101 9.69997L15.3001 12.29C15.9301 12.92 15.4801 14 14.5901 14H9.41005C8.52005 14 8.08005 12.92 8.71005 12.29Z"
    />
  </svg>
);

type DropdownProps = {
  label?: string;
  items?: any;
  activeItem?: string;
};

const DropdownMenu: React.FC<DropdownProps> = ({ items, label, activeItem }) => {
  const ref = useRef<any>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <NestedNavStyled>
      <NestedNavLabelStyled>
        <p className="label">{label}</p>
        <IconStyled onClick={handleOpen} isOpen={open}>
          <ArrowIcon />
        </IconStyled>
      </NestedNavLabelStyled>
      <SubLinkContainerStyled ref={ref} height={!open ? 0 : ref?.current?.scrollHeight}>
        {items.map(({ href, label: text }: any, j: number) => (
          <SubLinkStyled key={href} className={activeItem === href ? "active" : ""}>
            <Link href={href}>{text}</Link>
          </SubLinkStyled>
        ))}
      </SubLinkContainerStyled>
    </NestedNavStyled>
  );
};

export default DropdownMenu;
