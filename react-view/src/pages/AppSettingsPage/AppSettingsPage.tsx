import { Box } from "@chakra-ui/react";
import AppCard from "./AppCard";
import { integratedApps } from "./integratedApps";

function AppSettingsPage(props: any) {
  return (
    <Box
      height={"full"}
      overflow={"auto"}
      width={"100%"}
      style={{
        display: "grid",
        placeItems: "center",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gridGap: 16,
        padding: 24,
      }}
    >
      {integratedApps.map((app) => (
        <AppCard {...app} />
      ))}
    </Box>
  );
}

export { AppSettingsPage };
