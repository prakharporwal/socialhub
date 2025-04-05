import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

// TODO: This component needs API integration
export default function AnalyticsDashboardPage() {
  return (
    <Box>
      <Card w={"md"}>
        <CardHeader>Views over time</CardHeader>
        <CardBody>
          <StatGroup>
            <Stat>
              <StatLabel>Views</StatLabel>
              <StatNumber>34,567</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Clicked</StatLabel>
              <StatNumber>4500</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </CardBody>
      </Card>
    </Box>
  );
}
