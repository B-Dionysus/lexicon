import {useEffect, useState, useCallback} from "react";
import API from "../utils/API";
export default function PlayerList(props:any){
    const [players, setPlayers] = useState([""])
    const [emails, setEmails] = useState([""])
    useEffect(()=>{
        // I'm doing this wrong... every time it refreshes we get more and more and more
        let emptyArray=[""] as string[];
        setPlayers(emptyArray);
        setEmails(emptyArray);
        // This only returns data for one specific player. Do we run this for every player in our list?
        getPlayerInfo(props.ids[0]);
    },[props.ids]);

    const getPlayerInfo=useCallback((id:string)=>{
        API.getSpecificPlayer(id)  
        .then((data)=>{
            console.log(data.data.Items[0].userName)
            let tempArray=[...players];
            let tempArray2=[...emails];
            let name=data.data.Items[0].userName;
            let email="sendmail://"+data.data.Items[0].email;
            tempArray.push(name);
            tempArray2.push(email);
            setPlayers(tempArray);
            setEmails(tempArray2);
        })
        .catch((err)=>{
            console.error(err);
        });
    },[]);
    return(    
        <div>
            Current Players:
            <ul>
                {players.map((player:any,i:number)=>(
                    <li className="playerList" key={i}><a href="http://www.example.com">{player}</a></li>
                ))}
            </ul>
        </div>
    )
}