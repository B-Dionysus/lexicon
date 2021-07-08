function updateDesc(e:React.ChangeEvent<HTMLElement> | string) {
    // This fires either from an onChange event in the entry description textArea (which sends an event, of course),
    // when the user clicks on a style button, which sends a string, or programmatically (which sends an empty string)
    let textArea=(document.getElementById("description") as HTMLTextAreaElement);
    let newValue=sanitize(textArea.value);
    textArea.value=newValue;
    let newTitle="";
    // Either way, we get the current title, and copy everything over to the preview area, where it will be displayed in html
    newTitle=sanitize((document.getElementById("title") as HTMLInputElement).value);
    if(newValue){
         document.getElementById("titlePreview")!.innerHTML=`<b>${fixMarkup(newTitle)}</b>`;
         document.getElementById("preview")!.innerHTML=`<p>${fixMarkup(newValue)}</p>`;
    }
}
function sanitize(string:string){
    // I don't trust people not to add malicious code, so this just removes any html tags
    // First, turn all < into [ and > into ]. No funny business!
    string=string.replace(/</g,"[").replace(/>/g,"]");
    // Next, when we load the entry it'll have <span>s for the linked entries. Turn that back into markup
    string=string.replace(/\[span class=\"linkedEntry\"\]/g,"[l]").replace(/\[\/span\]/g,"[\/l]");
    // Finally, turn paragraphs into \n.
    string=string.replace(/\[\/p\]/g,"\n").replace(/\[p\]/g,"");
    return string;
}
function fixMarkup(string:string){
    // And this restores the markup that gets added by the buttons to real html, for the preview box and for when we store it in the database.
    // This converts any [] with one letter inside into an html tag, but leaves [longer] strings alone.
    // It also changes line returns into paragraph tags
    string=string.replace(/\[l\]/g,"<span class='linkedEntry'>").replace(/\[\/l\]/g,"</span>")
    string=string.replace(/\[(.)\]/g,'<$1>');
    string=string.replace(/\[\/(.)\]/g,'</$1>');    
    string=string.replace(/\n/g,'</br>');    
    return string;
}

export{
    updateDesc, 
    sanitize, 
    fixMarkup,
}