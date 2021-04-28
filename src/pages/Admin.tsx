import NavBar from "../components/NavBar"
import { useState, useContext, useEffect } from "react";
import AWSContext from "../context/auth/AWSContext";
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
  const [adminState, setAdminState] = useState("create");
  const [gameListState, setGames]=useState<[Game]>();
  const [bookDisplay, setLoadingIndicator]=useState(false);
  const [gameId, setEdit]=useState("");
  // When the user changes, get the titles of the games they have created
  useEffect(()=>{
    if(user.attributes){
      // let userId=user.attributes.sub;
      fetchGames(user.signInUserSession.idToken.jwtToken);  
    }
  },[user, adminState]);

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
  async function fetchGames(idToken:string){
    setLoading(true);
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
  return (
    <>
      <NavBar /> 
      <Book display={bookDisplay}/>
      <div className="main">      
        <div className="adminNav">
          {/* <button onClick={()=>{setAdminState("create")}}>Create game</button> */}
          {/* <button onClick={editButton}>Edit Game</button> */}
          <GameEditSelect games={gameListState} edit={loadGame}/>
        </div>
        {adminState==="create" ?
        <Create user={user} setLoading={setLoading} edit={loadGame}/> : <Edit user={user} setLoading={setLoading} setState={setAdminState} gameId={gameId} />}
      </div>
    </>
  );
};

export default Admin;
