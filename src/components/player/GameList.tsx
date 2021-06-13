import { useEffect, useState } from "react";
import API from "../../utils/API"
interface gameInfo{
    name:string,
    id:string,
    currentRound:string
}

export default function GameList(props:any){
    let init:gameInfo[]=[];
    const [games, setGames]=useState(init)
    useEffect(()=>{
        if(props.user.attributes){
            console.log(props.user)
            const token=props.user.signInUserSession.accessToken.jwtToken;
            API.getSpecificPlayer(props.user.attributes.sub)
            .then((userData=>{              
                let games=userData.data.Items[0].gameIds;
                let tempArray:gameInfo[]=[];
                for(const id of games){
                    API.getSpecificGame(token, id)
                    .then((gameInfo=>{
                        let info=gameInfo.data.Items[0];
                        console.log(gameInfo);
                        let anotherGame:gameInfo={
                            name:info.title,
                            id:id,
                            currentRound:info.rounds[info.currentRound]
                        }
                        tempArray.push(anotherGame);
                        setGames([...tempArray])
                    }))
                    .catch(error=>{                        
                        console.error(error);
                    });
                }
                // setGames(tempArray);
            }))
            .catch(error=>{
                console.error(error);
            });
        } 
    },[props.user]);
    useEffect(()=>{console.log(games);},[games])
    return(

        <div>
            <p><b>Your Games</b></p>
            <ul>
                {
                    games.length && games.map(
                        (game:gameInfo)=>(<li><a href={game.id}>{game.name}</a>: Round {game.currentRound}</li>)
                    )
                }
            </ul>
        </div>
    );
}