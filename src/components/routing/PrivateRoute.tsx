import { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AWSContext from "../../context/auth/AWSContext";
interface PrivateRouteProps {
  // tslint:disable-next-line:no-any
  component: any,  
  user:any,
  path:string
} 

const PrivateRoute = (props:PrivateRouteProps) => {
  
  const awsContext = useContext(AWSContext); 

  useEffect(()=>{
    if(props.user.userName) {      
      awsContext.user=props.user;
    }  
    else if(props.user.status==="NONE")
      {
        console.log("User is logged out")
      } 
    else{
      if(awsContext.user.username){
        console.log("Found it, it was in aws");
        props.user=awsContext.user;
      }
      else{
        // console.log("No one knows for sure. Check with Amazon");
                
        awsContext.checkUser();
      }
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { component: Component, user, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) =>
        user.status==="NONE" ? (
          <Redirect to="/register" {...props}/>
        ) : (
          <Component {...props} user={user}/>
        )
      }
    />
  );
};

export default PrivateRoute;
