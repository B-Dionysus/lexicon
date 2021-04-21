import { useEffect } from "react";
import '../css/Landing.css';
// import AuthContext from "../context/auth/authContext";
// import { Link } from "react-router-dom";    
// import NavBar from "../components/NavBar";
const Test = (props) => {
  // const authContext = useContext(AuthContext);

  console.log(props);
  // const { user } = authContext;
  useEffect(() => {
    // authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* <NavBar user={props.user}/> */}
      <div className="main">
        Hello!
      </div>
      <div className="cloud cloud2" />
    </> 
  );
};

export default Test;
