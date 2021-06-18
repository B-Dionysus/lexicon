import '../css/Landing.css';
import { useContext, useState } from "react";
import Book from "../components/Book"
import GameList from "../components/player/GameList"
import AWSContext, {loginPath} from "../context/auth/AWSContext"; 
import NavBar from "../components/NavBar";
const Landing = (props) => {  
  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  const [bookDisplay, setLoadingIndicator]=useState(false);
  // This is the root page. If App has detected that you are logged in, it displays a list of the games that you are currently playing.
  return (
    <>
      <NavBar />
      <div className="main">
          {!user.username ? (
              <div>
                <p>Here is some basic information about Lexicon, and maybe an email address to contact me if you'd like to play</p>
                <p><a href={loginPath}>Login</a></p>
              </div>
          ) : (            
            <div className="gameList">
              <GameList user={user} setLoadingIndicator={setLoadingIndicator}/>
            </div>
          )}
        </div>
        <Book display={bookDisplay}/>
        <div className="cloud cloud1" /> 
        <div className="cloud cloud2" /> 
    </>
  );
};

export default Landing;
