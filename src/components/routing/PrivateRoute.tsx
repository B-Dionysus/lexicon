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
        console.log(props.path+": User is logged out")
      } 
    else{
      if(awsContext.user.username){
        console.log(props.path+": Found it, it was in awsContext"); 
        console.log(props.user);
      }
      else{
        console.log(props.path+": No one knows for sure. Check with Amazon");    
        // Set the user state (defined in app.tsk) to either NONE or to the user object            
        awsContext.checkUser();
      }
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  const { component: Component, user, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        user.status==="NONE" ? (
          <Redirect to="/unauthorized" {...props}/>
        ) : (
          <Component {...props} user={user}/>
        )
      }
    />
  );
};

export default PrivateRoute;
