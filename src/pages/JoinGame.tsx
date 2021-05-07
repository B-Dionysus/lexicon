import {useState, useEffect} from "react";
import NavBar from "../components/NavBar"
import Book from "../components/Book"
import API from "../utils/API"
import '../css/join.css';
import '../css/mainBook.css';
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
                <div className="main">Loading</div>
                : 
                <div className="main">
                    <div className="mainBook">
                        <div className="mainPage">
                            <div className="mainText">
                                <p className="gameHeading">Title: <i>{game.title}</i></p>
                                <p className="gameHeading">Description: {game.description}</p>
                                <p>Lexicon is a collaborative world-building game, in which each player takes the role of an academic author, 
                                working together to compile a reference book about a specific topic. The book will be written over a number of
                                rounds, and as the game continues we will learn more about the world as we go!</p>
                                <p>The title of this particular reference book is, "{game.title}," so everyone will be creating fictional 
                                entries that relate to that. The first round will be {game.rounds[0]}, so everyone will write a short (~200 word) 
                                entry that begins with {game.rounds[0]} (not counting words like "A" or "The"). In these entries, everyone will also 
                                mention further entries in the book—ones that do not begin with {game.rounds[0]} and which will remain undefined for the moment.</p>
                                <p>In the next round, {game.rounds[1]}, everyone will first claim any entries written by other people in previous 
                                rounds, and will write that entry, finally giving context to what was previously a meaningless word. These entries 
                                will also reference future entries, and so on until the entire book is completed and we have learned all
                                about <i>{game.description}</i>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default JoinGame;