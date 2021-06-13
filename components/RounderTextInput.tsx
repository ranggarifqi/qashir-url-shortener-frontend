import { Input, InputProps } from "antd";
import styled from "styled-components";

const RoundedInput = styled(Input)`
  border-radius: 25px;
  border-color: #00a86b;
`;

const RoundedTextInput = (props: InputProps) => {
  return <RoundedInput {...props} />;
};

export default RoundedTextInput;
