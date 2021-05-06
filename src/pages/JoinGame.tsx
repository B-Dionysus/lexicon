import {useState, useEffect} from "react";
import NavBar from "../components/NavBar"
import Book from "../components/Book"
import API from "../utils/API"
interface Game{
    id:string;
    title: String;
    description: String;
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
        if(id) loadGame(id as string);
        console.log(id);
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
    console.log(game);
    return(
        <>
            <NavBar />
            <Book display={bookDisplay}/>
            {
                game.title==="Loading" ? 
                <div>Loading</div>
                : 
                <div className="main"><div>Here is a bunch of information aboutthe game, Lexicon, and about this particular game.</div>
                <div>ID: {game.title}</div></div>
            }
        </>
    )

}

export default JoinGame;