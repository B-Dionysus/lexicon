import './css/App.css';

// // AWS Auth components
import Amplify, {Auth} from 'aws-amplify';
// import {CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js';
import authConfig from "./context/auth/config"
import AWS from "aws-sdk";
import {CognitoAuth} from 'amazon-cognito-auth-js';


import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Auth context states
import AWSContext from "./context/auth/AWSContext"; 
 
import AlertState from "./context/alert/AlertState"; 
import PrivateRoute from "./components/routing/PrivateRoute";
// // // auth components 
// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
// import Confirm from "./components/auth/Confirm";
import Alert from "./utils/Alerts"; 
// // Pages 
import Landing from "./pages/Landing";  
// import Admin from "./pages/Admin";
import Test from "./pages/Test"; 
// import awsconfig from './aws-exports'; 
Amplify.configure(authConfig);

        // @ts-ignore
// Config.region = authConfig.region;

        // @ts-ignore
// Config.credentials = new CognitoIdentityCredentials({
//   IdentityPoolId: authConfig.IdentityPoolId
// });

// const userPool = new CognitoUserPool({
//   UserPoolId: authConfig.UserPoolId,
//   ClientId: authConfig.ClientId,
// });   

// const cognitoUser = userPool.getCurrentUser();
//   if (cognitoUser != null) {
//     cognitoUser.getSession((err:any, session:any) => {
//       if (err) {
//         console.log(err);
//       } else if (!session.isValid()) {
//         console.log("Invalid session.");
//       } else {
//         console.log("IdToken: " + session.getIdToken().getJwtToken());
//       }
//     });
//   } else {
//     console.log("User not found.");
//   }

function App() {

  let idToken="eyJraWQiOiJYTVwvSXZWa1ZrVno2OWRYSUp4dlN6dzBuVElFSmkxMERDandjS2NGb1wvMU09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiUUdwV1RRdFk5cVFUMlBIeFVCOGxGZyIsInN1YiI6ImQ2NDBhNzg0LWJmMzgtNGY1NS05YzY5LTQ3ZjZkZDgyM2RhMiIsImF1ZCI6InRkZzlrYXExM3I0YTFnZWgwZjJuNnM0bDEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MTkwMTg1ODQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3NBaE1YbGhWayIsImNvZ25pdG86dXNlcm5hbWUiOiJiIiwiZXhwIjoxNjE5MDIyMTg0LCJpYXQiOjE2MTkwMTg1ODQsImVtYWlsIjoiYkBzaXhieW5pbmUuY29tIn0.cV2dD4aK9Vb13Tqn2aGJ2SzuTkXdo66zyH0ZmHjdR4EBCyQoMjXFGmDtl_7TWpTVLH1hjSfGYxWVwxJ8sl9FUiEIAMNvMXvvdoSjPdWWUQWQscA7ybryd5pcgH9s4i4mf38Es2EEsgT830IfAW585Fla6FSLYJRlyFq1SKTJ7E8tksr02SPAeLxM7SFhZcQB9TljVeOhT0ivdigvi8TQb0Cxly4PSLnxVgtfEtR9902NwCozm7Jvn4DWkXXh-gNa1k5KlxIEtSMkPvqCZEiSSz5Sb50rdkfh_bLZlh7YCOo4nvbNo0UT0q7HeJ49vwMIPyVJGYsp1VRy_mRcYaXbCw&access_token=eyJraWQiOiJ2REo0anpBZm01TjdYamszOXFoVHJaUkpiNXhUWXp4TE9SYmpLNkVtOFU4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNjQwYTc4NC1iZjM4LTRmNTUtOWM2OS00N2Y2ZGQ4MjNkYTIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjE5MDE4NTg0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9zQWhNWGxoVmsiLCJleHAiOjE2MTkwMjIxODQsImlhdCI6MTYxOTAxODU4NCwidmVyc2lvbiI6MiwianRpIjoiN2IwZDkyOTctMGNkYy00YjQwLTg3ZTQtMDMwOTRkNzI0Mzc1IiwiY2xpZW50X2lkIjoidGRnOWthcTEzcjRhMWdlaDBmMm42czRsMSIsInVzZXJuYW1lIjoiYiJ9.CYixdlB70WbQ1_cjtwS5s9FYdRGz3H5ID3XS4bW-2CzAf3xx0S-IJijPlEThL0z3PImfnLp-kj4Yk0t7tRvaMzQ9gEd8MXNMBSKdUhMQZ5UjySN-G_dT-2-_LYC9YN9p0GtepHXcXWAdnDpMBe7G3wvwLaHnWeITICZvJy6KnjZgz6eC3tJzjsXohhmQTT3fPKH1Sn1AWAMNs0Bt6MvoLj-QvzvJS0LyP2qPBXTLSXCX4UinVilpQHbIUsTYnwo75fKrgd2NQ0CxNL_8iNRGbe7VG0eynvgH9fAiWC0_ccmDk2vsrelw6jsychDlVNs3sLCVHO4H0YnYMHaPY6oQPw";
//   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     // IdentityPoolId: 'us-east-1:bxxxxxx6-cxxx-4xxx-8xxx-xxxxxxxxxx3c',
//     Logins: {
//         'cognito-idp.us-east-1.amazonaws.com/us-east-1_ixxxxxxx': idToken
//     }
// });
// Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-east-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:4ab84278-64ea-4019-bb62-7698dfd36c7e',
//     Logins: {
//           'cognito-idp:us-east-1:273706657348:userpool/us-east-1_sAhMXlhVk': idToken
//       }
// });

// This is all from the bottom answer here:
// https://stackoverflow.com/questions/45926339/cognito-hosted-ui
// Configuration for Auth instance.
var authData = {
    UserPoolId: 'us-east-1_sAhMXlhVk',
    ClientId: 'tdg9kaq13r4a1geh0f2n6s4l1',
    RedirectUriSignIn : 'http://localhost:3000',
    RedirectUriSignOut : 'http://localhost:3000',
    AppWebDomain : 'https://lexiconlogin.auth.us-east-1.amazoncognito.com/',
    TokenScopesArray: ['email']
    };
var auth = new CognitoAuth(authData);

//Callbacks, you must declare, but can be empty. 
auth.userhandler = {
    onSuccess: function(result) {
      console.log("Authenticated! "+result)
    },
    onFailure: function(err) {
    }
};

//Get the full url with the hash data.
var curUrl = window.location.href;


//here is the trick, this step configure the LocalStorage with the user.
auth.parseCognitoWebResponse(curUrl);
window.top.close();





// eslint-disable-next-line 
  const [user,setUser]= useState({});
  useEffect(()=>{    
    checkUser();
  }, []);

  function checkUser(){ 

      Auth.currentAuthenticatedUser()
    .then((res)=>{
      setUser(res);
    })
    .catch(err=>{
      console.log("ERR "+err);
      setUser({"status":"NONE"});
    });
    console.log(user);
  }

  return (
    <div className="App">
      <header className="App-header">
        <AWSContext.Provider value={{user:user, checkUser:checkUser}}>
          <AlertState>
              <Router>
                <Alert />
                 <Route exact path="/" component={Landing} />
                {/*<Route exact path="/register" component={Register} />
                <Route exact path="/confirm" component={Confirm} />
                <Route exact path="/login" component={Login} />            
                <PrivateRoute path="/admin" user={user} component={Admin}/>        */} 
                <PrivateRoute path="/test" user={user} component={Test}/>        
              </Router>
          </AlertState>
        </AWSContext.Provider>
      </header>
    </div>
  );
}

export default App;
