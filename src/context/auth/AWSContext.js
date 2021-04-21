import { createContext } from "react";

const AWSContext = createContext();  
let loginPath="https://lexiconlogin.auth.us-east-1.amazoncognito.com/login?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/";
let signUpPath="https://lexiconlogin.auth.us-east-1.amazoncognito.com/signup?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/"
export default AWSContext;
export {loginPath, signUpPath};
