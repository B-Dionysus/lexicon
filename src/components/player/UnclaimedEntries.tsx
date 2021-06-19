
function flip(e:any){
    let indicator=e.target.childNodes[1];
    let status=indicator.className.split(" ")[1];
    if(status==="false") indicator.className="indicator true";
    else indicator.className="indicator false";

}

export default function UnclaimedEntries(){

    let unclaimed:string[]=["what", "just", "happened", "to my", "cat"];
    let status="indicator false"
    return(
        <div id="unclaimed" className="entry">
            <div><b>Unclaimed Entries</b></div>
            <div  className="unclaimedEntries">
                {
                    unclaimed.map((e,i)=>(
                        <span onClick={flip} key={i} className="unclaimed">{e}<span className={status}></span></span>
                    ))
                }
            </div>
        </div>
    );
}