import StyleBar from "./StyleBar"; 
import {styleButton} from "../../interfaces/style.interfaces";
import {databaseEntry, editEntryProps} from "../../interfaces/player.interfaces";
import {updateDesc} from "./textUpdateUtilities"



export default function EditEntry(props:editEntryProps){
    function submitEntry(){
        updateDesc("submitting");
        if(props.linkedEntries.length<2) alert("MOR ELINKS!");
        else {
            let form=document.getElementById("entryForm")!;
            let newEntry:databaseEntry={
                title:form.title,
                gameId:props.gameInfo.id,  
                creatorId:props.userId, 
                description:document.getElementById("preview")!.innerHTML,
                linkedEntries:props.linkedEntries,
            };
            console.log(newEntry);
        }
    }

    function addStyle(button:styleButton){
        // getSelection() doesn't work on textareas in Firefox, so here's a lovely workaround:
        // https://stackoverflow.com/questions/10596606/window-getselection-get-the-right-selection-in-textarea/10596963#10596963
        let field = document.getElementById("description") as HTMLTextAreaElement;
        const startPos = field!.selectionStart;
        const endPos = field!.selectionEnd;
        // Given the starting and ending position of the selection, we chop up the description text into three parts,
        // add the prefix and postfix before and after the middle part, and put it all together again.
        let start=field.value.substring(0, startPos);
        let middle=field.value.substring(startPos, endPos);
        let end=field.value.substring(endPos);
        // If the user is trying to make the selection a linked entry, we should add that entry to the list 
        if(button.iconText==="&") props.addLinkedEntry(middle);
    
        let newString=start+button.prefix+middle+button.postfix+end;
        (document.getElementById("description")! as HTMLTextAreaElement).value=newString; 
        updateDesc(newString);
    }
    let currentRound=props.gameInfo.currentRound;
    return(
        <>
        <div className="entryForm">
            <form id="entry" onSubmit={submitEntry}>
                <div className="entry title"><label htmlFor="title">Title: </label><input required onChange={updateDesc} id="title" placeholder={"Title starting with "+currentRound} /></div>
                <div className="entry description">
                    <textarea className="entry textarea" id="description" onChange={updateDesc} required  placeholder="A lexicon entry concisely describing this concept" name="description" cols={40} rows={6}>
                    </textarea><StyleBar callback={addStyle}/></div>
            </form>
        </div>
        </>
    )
}