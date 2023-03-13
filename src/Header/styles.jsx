import styled from "styled-components";

export const Title = styled.h1`
  color: palevioletred;

  &:hover {
    opacity: 0.7;
  }
`;

export const Button = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  width: ${(props) => props.width || "auto"};
  transition: all 0.3s;
  cursor: pointer;

  ${(props) =>
    props.hide &&
    `
    display: none;
  `}

  ${(props) => {
    switch (props.type) {
      case "primary": {
        return `
          background-color: red;
          color: white;
          border: none;

          &:hover {
            opacity: 0.7;
          }
        `;
      }
      case "outline":
      default: {
        return `
          background-color: transparent;
          border: 1px solid gray;
          color: gray;

          &:hover {
            border: 1px solid red;
            color: red;
          }
        `;
      }
    }
  }};
`;
