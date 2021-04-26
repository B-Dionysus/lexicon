import './css/App.css';

// // AWS Auth components
import Amplify, {Auth} from 'aws-amplify';
// import {CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js';
import authConfig from "./context/auth/config"
import AWS from "aws-sdk";
import {CognitoAuth} from 'amazon-cognito-auth-js';

import {useState, useEffect, useCallback} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Auth context states
 
import AWSContext, {appDomain, callBackURL} from "./context/auth/AWSContext"; 
import AlertState from "./context/alert/AlertState.js"; 
import PrivateRoute from "./components/routing/PrivateRoute";
import Alert from "./utils/Alerts"; 
// // Pages 
import Landing from "./pages/Landing";  
import Unauthorized from "./pages/Unauthorized";  
import Admin from "./pages/Admin";
import Test from "./pages/Test"; 
// import awsconfig from './aws-exports'; 
Amplify.configure(authConfig);

var albumBucketName = "lexicon-image-storage";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:dbc09ff9-c508-42ef-96ab-1f1bfb44fa9f";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});
function App() {

// This is all from the bottom answer here:
// https://stackoverflow.com/questions/45926339/cognito-hosted-ui
// Configuration for Auth instance.
var authData = {
    UserPoolId: 'us-east-1_sAhMXlhVk',
    ClientId: 'tdg9kaq13r4a1geh0f2n6s4l1',
    RedirectUriSignIn : callBackURL,
    RedirectUriSignOut : callBackURL,
    AppWebDomain : appDomain,
    TokenScopesArray: ['email']
    };
var auth = new CognitoAuth(authData);
//Callbacks, you must declare, but can be empty. 
auth.userhandler = {
    onSuccess: function(result) {
      console.log("Authenticated!")
    },
    onFailure: function(err) {      
      console.error(err)
    }
};
// The AWS hosted app returns us to our login screen, including the idToken in the url
//Get the full url with the hash data.
var curUrl = window.location.href;
//here is the trick, this step configure the LocalStorage with the user.
auth.parseCognitoWebResponse(curUrl);

  const [user,setUser]= useState({});

  const checkUser=useCallback(()=>{ 
     Auth.currentAuthenticatedUser()
    .then((res)=>{
      setUser(res);
    })
    .catch(err=>{
      console.log("ERR "+err);
      setUser({"status":"NONE"});
    });
    console.log(user);
    // Including user would create an infinite loop here, even though eslint wants me to.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{    
    checkUser();
  }, [checkUser]);

  return (
    <div className="App">
      <header className="App-header">
        <AWSContext.Provider value={{user:user, checkUser:checkUser}}>
          <AlertState>
              <Router>
                <Alert />
                 <Route exact path="/" component={Landing} />
                 <Route exact path="/unauthorized" component={Unauthorized} />
                {/*<Route exact path="/register" component={Register} />
                <Route exact path="/confirm" component={Confirm} />
                <Route exact path="/login" component={Login} />            */} 
                <PrivateRoute path="/admin" user={user} component={Admin}/>        
                <PrivateRoute path="/test" user={user} component={Test}/>        
              </Router>
          </AlertState>
        </AWSContext.Provider>
      </header>
    </div>
  );
}

export default App;
