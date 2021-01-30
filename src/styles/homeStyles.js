import styled from "styled-components";

export const NavBar = styled.div`
  background-color: ${(props) => props.theme.secondaryBackground};
  padding: 20px 0;
`;

export const SwitchButton = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.button};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: ${(props) => props.theme.button};
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const Body = styled.div`
  padding: 3em 5em;
`;

export const Heading = styled.div`
  font-size: 5em;
  font-weight: 800;
  color: ${(props) => props.theme.text};
`;

export const SubPara = styled.p`
  font-size: 1.5em;
  color: ${(props) => props.theme.text};
`;

export const Para = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  color: ${(props) => props.theme.text};
  width: 80%;
`;

export const Content = styled.div`
  padding: 10em 0;
`;
