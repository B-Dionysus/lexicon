import NavBar from "../components/NavBar"
import { useState, useContext, useEffect } from "react";
import AWSContext, {callBackURL} from "../context/auth/AWSContext";
import Book from "../components/Book"
import API from "../utils/API"
import '../css/Admin.css';
import GameEditSelect from "../components/admin/GameEditSelect"
import Create from "../components/admin/Create"
import Edit from "../components/admin/Edit"
interface Game{
  id:string;
  title?: string;
  description?: string;
  image?: string;
  creatorId?:string;
  categories?:Array<string>;
}

//------------------------------> Note: Page will still load and display even after token has expired. Posting to database is still prohibited, as it should be.

const Admin = (props:any) => {  

  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  const [adminState, setAdminState] = useState("loading");
  const [gameListState, setGames]=useState<[Game]>();
  const [bookDisplay, setLoadingIndicator]=useState(false);
  const [gameId, setEdit]=useState("");
  const [token,setToken]=useState("");
  // When the user changes, get the titles of the games they have created
  useEffect(()=>{
    console.debug("USEEFFECT ON %cADMIN","color:green")
    if(user.attributes){
      let token="";
      if(user.signInUserSession) token=user.signInUserSession.idToken.jwtToken;
      setToken(token);
      let idToken=user.signInUserSession.idToken.jwtToken;          
      let accessLevel=user.attributes["custom:accessLevel"];
      if (accessLevel<50) window.location.href=callBackURL;
      else {        
        setLoading(true);
        setAdminState("create");
        console.log("Getting games for", user)
        API.getGames(idToken, user.attributes.sub)
        .then((gameData)=>{      
          console.log(gameData);
          setLoading(false);
          const gameList:[Game]=(gameData as any).data.Items;
          setGames(gameList);
        })
        .catch((err)=>{       
          console.error(err);
        });
      }
    }
  },[user]);

  function loadGame(gameId:string){    
    console.log("Loading "+gameId)
    setLoading(true);
    setEdit(gameId);
    setAdminState("edit");
  }

  // Moved this into a function so I can call it from child components more easily
  // "true" turns on the loading indicator, false turns it off
  function setLoading(value:boolean){
    setLoadingIndicator(value);
  }

  return (
    <>
      <NavBar /> 
      <Book display={bookDisplay}/>
      <div className="main">      
        <div className="adminNav">
        {adminState==="edit" && <div className="createButton" onClick={()=>setAdminState("create")}>Create Game</div>}
          <GameEditSelect games={gameListState} edit={loadGame}/>
        </div> 
        {adminState==="create" && <Create user={user} setLoading={setLoading} edit={loadGame}/>}
        {adminState==="edit" && <Edit user={user} token={token} setLoading={setLoading} setState={setAdminState} gameId={gameId} />}
      </div>
    </>
  );
};

export default Admin;
