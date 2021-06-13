import {useEffect, useState} from "react";
import API from "../utils/API";
interface playerInfo{
    name:string,
    email:string,
    id:string,
}
export default function PlayerList(props:any){
    let init:playerInfo[]=[];
    const [players, setPlayers] = useState(init)
    
    useEffect(()=>{
        // Once the props have fully loaded (and the id list is longer than 0—games are guaranteed to have at least one player)
        // we call update player, which goes through all of the ids and makes an API call to get infor about each one
        // This is stored in the player state, and displayed under "Current Players"
            let tempArray:playerInfo[]=[];
            for(const id of props.ids){
                if(id){
                    console.log(id);
                    let newPlayer:playerInfo;
                    API.getSpecificPlayer(id)  
                    .then((data)=>{
                        newPlayer={
                            name:data.data.Items[0].userName,
                            email:"mailto://"+data.data.Items[0].userEmail,
                            id:id
                        }
                        tempArray.push(newPlayer);
                        // Won't this duplicate the entries? Be sure to check again once we have more players!!!
                        setPlayers([...tempArray])
                    }) 
                    .catch((err)=>{
                        console.error(err);
                    });
                }
            } 
    },[props.ids]); 

    return(    
        <div>
            Current Players:
            <ul>
                {players.map((player:playerInfo,i:number)=>(
                    <li className="playerList" key={player.id}><a href={player.email}>{player.name}</a></li>
                ))}
            </ul>
        </div>  //dd
    )
}