import styled, { css } from "styled-components";
export const ButtonStyle = css`
  border: 0;
  color: white;
  padding: 5px 15px;
  box-sizing: border-box;
  display: inline-flex;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;

  svg {
    height: 20px;
    margin-right: 5px;
  }
  ${(props) =>
    props?.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props?.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid white;
    `}

${(props) =>
    props?.primary &&
    !props.outline &&
    css`
      background-color: #5542f6;
      color: #fff;
      border: 1px solid #5542f6;
    `};
${(props) =>
    props?.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: #5542f6;
      border: 1px solid #5542f6;
    `};
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;
export default function Buttons({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
