import { Box } from "@chakra-ui/react";
import { Route } from "react-router";

const ProtectedRoute: React.FunctionComponent<any> = (props)=>{
    const auth = window.localStorage.getItem('authentication') === 'true';

    return (
        <Box></Box>
    )
}

export default ProtectedRoute;