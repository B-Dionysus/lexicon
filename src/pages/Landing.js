import '../css/Landing.css';
import { useContext } from "react";
import Book from "../components/Book"
import AWSContext from "../context/auth/AWSContext";
import { Link } from "react-router-dom";
// import NavBar from "../components/NavBar";
const Landing = (props) => {  
  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  
  return (
    <>
      {/* <NavBar /> */}
      <div className="main">
          {!user.username ? (
              <a href="https://lexiconlogin.auth.us-east-1.amazoncognito.com/login?client_id=tdg9kaq13r4a1geh0f2n6s4l1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/">Login</a>
          ) : (
            <Link to="/test">
            <button>
              Hello and welcome, {user.username} !</button>
            </Link>
          )}
        </div>
        <Book />
        <div className="cloud cloud1" /> 
        <div className="cloud cloud2" /> 
    </>
  );
};

export default Landing;
