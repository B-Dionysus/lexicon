import StyleBar from "./StyleBar";
export default function EditEntry(props:any){
    function submitEntry(){

    }
    function updateDesc(e:React.ChangeEvent<HTMLTextAreaElement>) {
        const newValue = e.target.value;
        let newTitle="";
        newTitle=(document.getElementById("title") as HTMLInputElement).value;
        if(newValue) document.getElementById("preview")!.innerHTML=`<p><b>${newTitle}</b></p><p>${newValue}</p>`;
    }
    let currentRound="A-G";
    return(
        <>
        <div className="entryForm">
            <form id="entry" onSubmit={submitEntry}>
                <div><label htmlFor="title">Title:</label><input id="title" placeholder={"Title starting with "+currentRound} /></div>
                <div className="description"><textarea className="desc" id="description" onChange={updateDesc} placeholder="A lexicon entry concisely describing this concept" name="description" cols={40} rows={6}></textarea><StyleBar /></div>
            </form>
            <div id="preview" className="desc preview">
               A lexicon entry concisely describing this concept
            </div>
        </div>
        </>
    )
}