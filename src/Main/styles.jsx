import styled from "styled-components";
import { Button } from "antd";

export const MainWrapper = styled.div`
  flex: 1;
  margin-top: 56px;
  margin-left: 250px;
  padding: 16px;
  transition: all 0.4s;
  background-color: red;

  ${(props) =>
    props.isFull &&
    `
    margin-left: 0;
  `}
`;

export const CustomButton = styled(Button)`
  border-radius: 20px;
  width: 200px;
`;
