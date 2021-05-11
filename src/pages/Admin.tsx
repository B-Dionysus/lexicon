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
  title?: String;
  description?: String;
  image?: String;
  creatorId?:String;
  categories?:Array<String>;
}
const Admin = (props:any) => {  

  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  const [adminState, setAdminState] = useState("loading");
  const [gameListState, setGames]=useState<[Game]>();
  const [bookDisplay, setLoadingIndicator]=useState(false);
  const [gameId, setEdit]=useState("");

  let token="";
  if(user.signInUserSession) token=user.signInUserSession.idToken.jwtToken;
  // When the user changes, get the titles of the games they have created
  useEffect(()=>{
    console.error("USEEFFECT ON ADMIN")
    if(user.attributes){
      let idToken=user.signInUserSession.idToken.jwtToken;          
      let accessLevel=user.attributes["custom:accessLevel"];
      if (accessLevel<50) window.location.href=callBackURL;
      else {        
        setLoading(true);
        setAdminState("create");
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
        {adminState==="create" ?
          <Create user={user} setLoading={setLoading} edit={loadGame}/> :
          <Edit user={user} token={token} setLoading={setLoading} setState={setAdminState} gameId={gameId} />
        }
      </div>
    </>
  );
};

export default Admin;
