import NavBar from "../components/NavBar"
import { useState, useContext, useEffect } from "react";
import AWSContext from "../context/auth/AWSContext";
import Book from "../components/Book"
import API from "../utils/API"
import '../css/Admin.css';
import GameEditSelect from "../components/admin/GameEditSelect"
import Create from "../components/admin/Create"
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
  },[user]);

  async function fetchGames(idToken:String){
    setLoadingIndicator(true);
    API.getGames(idToken)
    .then((gameData)=>{      
      setLoadingIndicator(false);
      const gameList:[Game]=(gameData as any).data.titles;
      setGames(gameList);
      // let dropDown:string="";
      // if(gameList.length>0){
      //   dropDown="<label for='selectGame'>Edit: </label>";
      //   dropDown+=`<select onChange="()=>{updateEdit(this.value);}" name='selectGame' id='selectGame'>`;
      //   for(let game of gameList){
      //     dropDown+=`<option value="${game.id}">${game.title}</option>`;
      //   }
      //   dropDown+="</select>"
      //   if(gameList.length>0) setEdit(gameList[0].id as string);
      // }
      // /* To solve typescript's complaint that textarea might be null
      //  If you know from external means that an expression is not null or undefined, you can use the non-null assertion operator ! to coerce away those types:
      //  https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined */
      // document.getElementById("textarea")!.innerHTML=dropDown;
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
          <GameEditSelect games={gameListState}/>
        </div>
        {adminState==="create" ?
        <Create user={user}/> : <span>EDIT</span>}
      </div>
    </>
  );
};

export default Admin;
