import StyleBar from "./StyleBar";
import {styleButton} from "../../interfaces/style.interfaces"

function updateDesc(e:React.ChangeEvent<HTMLTextAreaElement> | string) {
    // This fires either from an onChange event in the entry description textArea (which sends an event, of course)
    // or when the user clicks on a style button, which sends a string.
    let newValue="";
    // If it's a string, then it's coming from the button
    if(typeof(e)==="string") newValue=e;
    // Otherwise, it's an event from onChange()
    else newValue = e.target.value;
    let newTitle="";
    // Either way, we get the current title, and copy everything over to the preview area, where it will be displayed in html
    newTitle=(document.getElementById("title") as HTMLInputElement).value;
    if(newValue) document.getElementById("preview")!.innerHTML=`<p><b>${newTitle}</b></p><p>${newValue}</p>`;
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
    let newString=start+button.prefix+middle+button.postfix+end;
    (document.getElementById("description")! as HTMLTextAreaElement).value=newString; 
    updateDesc(newString);
}
export default function EditEntry(props:any){
    function submitEntry(){

    }
    let currentRound="A-G";
    return(
        <>
        <div className="entryForm">
            <form id="entry" onSubmit={submitEntry}>
                <div><label htmlFor="title">Title:</label><input id="title" placeholder={"Title starting with "+currentRound} /></div>
                <div className="description">
                    <textarea className="desc" id="description" onChange={updateDesc} placeholder="A lexicon entry concisely describing this concept" name="description" cols={40} rows={6}>
                    </textarea><StyleBar callback={addStyle}/></div>
            </form>
            <div id="preview" className="desc preview">
               A lexicon entry concisely describing this concept
            </div>
        </div>
        </>
    )
}