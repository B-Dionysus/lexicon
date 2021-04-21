import { loginPath } from "../context/auth/AWSContext";

const Unautorized = (props:any) => {  
  window.location.replace(loginPath);
  return (
    <>
      <div className="main">
        Redirecting to <a href={loginPath}>authorization screen</a>.
      </div>
    </>
  );
};

export default Unautorized;
