import {unclaimedEntryProps} from "../../interfaces/player.interfaces"


export default function UnclaimedEntries(props:unclaimedEntryProps){
    function claim(e:React.MouseEvent<HTMLSpanElement>){
        let elements=(e.target as HTMLSpanElement).children;
        
        if(elements.length>0){
            let indicator=elements[elements.length-1];
            console.log(elements); 
            let status=indicator!.className.split(" ")[1];
            console.log(status);
            if(status==="off") props.removeLinkedEntry(e.target);
            else if(status==="false") indicator.className="indicator true"; 
            else indicator.className="indicator false";
        }
    }
    return(
        <div id="unclaimed" className="entry">
            <div><b>{props.title}</b></div>
            <div  className="unclaimedEntries">
                {
                    props.unclaimedEntries.map((entry,i)=>(
                        <span onClick={claim} key={i} className="unclaimed">{entry.title}<span className={entry.status}></span></span>
                    ))
                }
            </div>
        </div>
    );
}