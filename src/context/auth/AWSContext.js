import { createContext } from "react";

const AWSContext = createContext();  
let callBackURL="http://localhost:3000/";
let appDomain="https://lexiconlogin.auth.us-east-1.amazoncognito.com/";
let loginPath=`${appDomain}login?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${callBackURL}`;
let signUpPath=`${appDomain}signup?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${callBackURL}`;
export default AWSContext;
export {loginPath, signUpPath, appDomain, callBackURL};
