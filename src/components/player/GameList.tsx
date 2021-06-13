import { useEffect, useState } from "react";
import API from "../../utils/API"
interface gameInfo{
    name:string,
    id:string,
    currentRound:string
}
export default function GameList(props:any){
    const [games, setGames]=useState<gameInfo[]>([])
    useEffect(()=>{
        if(props.user.attributes){
            const token=props.user.signInUserSession.accessToken.jwtToken;
            API.getSpecificPlayer(props.user.attributes.sub)
            .then((userData=>{              
                let gameIds=userData.data.Items[0].gameIds;
                for(const id of gameIds){
                    API.getSpecificGame(token, id)
                    .then((gameData=>{
                        let info=gameData.data.Items[0];                        
                        let anotherGame:gameInfo={
                            name:info.title,
                            id:id,
                            currentRound:info.rounds[info.currentRound]
                        }
                        setGames(games=>[...games, anotherGame])
                    }))
                    .catch(error=>{                        
                        console.error(error);
                    });
                }
            }))
            .catch(error=>{
                console.error(error);
            });
        } 
    },[props.user]);
    return(

        <div>
            <p><b>Your Games</b></p>
            <ul>
                {
                    games.length ? games.map(
                        (game:gameInfo)=>(<li><a href={game.id}>{game.name}</a>: Round {game.currentRound}</li>)
                    ) : <li>Loading</li>
                }
            </ul>
        </div>
    );
}