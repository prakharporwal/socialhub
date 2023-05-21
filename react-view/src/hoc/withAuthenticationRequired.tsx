import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const withAuthenticationRequired = (Ele:React.FunctionComponent)=>{
    return function(props:any){
        const authValue = useAuth();
         return (<>
            {authValue.isAuthenticated ? <Ele {...props}/> :  <Navigate to="/signin" replace />}
        </>
        );
    }
}

export default withAuthenticationRequired;