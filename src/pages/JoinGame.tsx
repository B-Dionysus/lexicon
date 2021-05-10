import {useState, useEffect} from "react";
import NavBar from "../components/NavBar"
import Book from "../components/Book"
import CreatePlayer from "../components/createAccount/CreatePlayer"
import CreateAdmin from "../components/createAccount/CreateAdmin"
import API from "../utils/API"
import '../css/join.css';
import '../css/mainBook.css';
interface Game{
    id?:string;
    title?: String;
    description?: String;
    image?: String;
    creatorId?:String;
    rounds:Array<String>;
}
const JoinGame=()=>{
    const [bookDisplay, setLoadingIndicator]=useState(false);
    // const [gameId, setGameId]=useState("Loading");
    const loading:Game={id:"none", title:"Loading", description:"Still loading",rounds:["None"]}
    const [game, setGame]=useState(loading);


    const id:string=new URLSearchParams(window.location.hash).get("state") as string;

    useEffect(()=>{
        setLoadingIndicator(true);
        if(id==="admin") setGame({title:"admin",rounds:["None"]})
        else if(id) loadGame(id as string);
    },[id])
    


    async function loadGame(gameId:string){
        setLoadingIndicator(true);
        const token="";
        API.getSpecificGame(token, gameId)
        .then((resp)=>{
            setLoadingIndicator(false);
            setGame(resp.data.Items[0]);      
        })
        .catch((err)=>{ 
            setLoadingIndicator(false);
            console.error(err);
        });
    };
    return(
        <>
            <NavBar />
            <Book display={bookDisplay}/> 
                <div className="main">
                    <div className="mainBook">
                        <div className="mainPage">
                            <div className="mainText">
                                {game.title==="Loading" ? 
                                    <div>Loading</div> :
                                    game.title==="admin" ?
                                    <CreateAdmin loading={setLoadingIndicator}/> :
                                    <CreatePlayer gameInfo={game}/>
                                }   
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )

}

export default JoinGame;