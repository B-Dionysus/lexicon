import '../../css/editMenu.css';

interface Game{
  id?:string;
  title?: string;
  description?: string;
  image?: string;
  creatorId?:string;
  categories?:Array<string>;
}

const GameEditSelect = (props:any) => {
  if(props.games && props.games.length>0)
    console.log(props.games.length);

  if(props.games && props.games.length>0)
    return (
      <div className="editMenu">
        <div className="heading">Edit Game</div>
        <div className="submenu">
            {
              props.games.map(
                (g:Game)=>(
                  <div title={g.description} role="menuitem" onClick={()=>props.edit(g.id)}key={g.id} className="item menuBlock">{g.title}</div>
                )
              ) 
            }
        </div>
      </div>
    );
  else return (<div>Loading...</div>)
};

export default GameEditSelect;
