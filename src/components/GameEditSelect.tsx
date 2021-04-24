import { useContext } from "react";
import '../css/editMenu.css';
import { NavLink } from "react-router-dom";
import { Auth } from 'aws-amplify';
import AWSContext, {loginPath, signUpPath} from "../context/auth/AWSContext"; 

interface Game{
  id?:string;
  title?: String;
  description?: String;
  image?: String;
  creatorId?:String;
  categories?:Array<String>;
}
const GameEditSelect = (props:any) => {
  if(props.games && props.games.length>0)
    console.log(props.games.length);

  if(props.games && props.games.length>0)
    return (
      <ul className="editMenu">
        <li className="heading">Edit Game</li>
        {
          props.games.map(
            (g:Game)=>(
              <li key={g.id} className="item menuBlock">{g.title}</li>
            )
          ) 
        }
      </ul>
    );
  else return (<div>Loading...</div>)
};

export default GameEditSelect;
