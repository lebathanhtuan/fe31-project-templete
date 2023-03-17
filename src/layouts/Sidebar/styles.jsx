import styled from "styled-components";

export const SidebarWrapper = styled.div`
  position: absolute;
  left: -250px;
  margin-top: 56px;
  padding: 16px;
  width: 250px;
  height: calc(100% - 56px);
  background-color: #14bbbb;
  overflow: hidden;
  transition: all 0.4s;

  ${(props) =>
    props.isShow &&
    `
    left: 0;
  `}
`;
