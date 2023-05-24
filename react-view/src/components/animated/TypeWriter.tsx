import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Define the keyframes for the typewriter animation
const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const Typewriter: React.FunctionComponent<any> = (props) => {
  return (
    <Box
      as="span"
      display="inline-block"
      overflow="hidden"
      whiteSpace="nowrap"
      animation={`${typing} 2s steps(40, end), blink-caret 0.75s step-end infinite`}
    >
      {props.childern}
    </Box>
  );
};


export default Typewriter;