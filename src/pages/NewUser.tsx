import {joinGamePath} from "../context/auth/AWSContext"; 
// const gameId="adfadfafd";
// const path=joinGamePath+`&state=${gameId}`

const NewUser=(props:any)=>{

    const gameId=new URLSearchParams(window.location.search).get("gameId");
    console.log(gameId);
    return(
        <>
            <div>Here is a bunch of information aboutthe game, Lexicon, and about this particular game.</div>
        </>
    )

}

export default NewUser;