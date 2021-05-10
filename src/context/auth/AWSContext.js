import { createContext } from "react";

const AWSContext = createContext();  
let callBackURL="http://localhost:3000/";
let joinGameURL="http://localhost:3000/joinGame";
let appDomain="https://lexiconlogin.auth.us-east-1.amazoncognito.com/";
let loginPath=`${appDomain}login?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${callBackURL}`;
let signUpPath=`${appDomain}signup?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${callBackURL}`;
let joinGamePath=`${appDomain}signup?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${joinGameURL}`;
let authConfig={
    aws_cognito_region: 'us-east-1',
    IdentityPoolId: 'us-east-1:dbc09ff9-c508-42ef-96ab-1f1bfb44fa9f',
    aws_user_pools_id: 'us-east-1_sAhMXlhVk',
    aws_user_pools_web_client_id: 'tdg9kaq13r4a1geh0f2n6s4l1',
  }
export default AWSContext;
export {loginPath, signUpPath, appDomain, joinGamePath, callBackURL, authConfig};
// https://lexiconlogin.auth.us-east-1.amazoncognito.com/signup?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/joinGame&state=1619546293268.518
// https://lexiconlogin.auth.us-east-1.amazoncognito.com/signup?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/joinGame&state=admin
 