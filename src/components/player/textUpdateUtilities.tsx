function updateDesc(e:React.ChangeEvent<HTMLElement> | string) {
    // This fires either from an onChange event in the entry description textArea (which sends an event, of course),
    // when the user clicks on a style button, which sends a string, or programmatically (which sends an empty string)
    let textArea=(document.getElementById("description") as HTMLTextAreaElement);
    let newValue=sanitize(textArea.value);
    textArea.value=newValue;
    let newTitle="";
    // Either way, we get the current title, and copy everything over to the preview area, where it will be displayed in html
    newTitle=sanitize((document.getElementById("title") as HTMLInputElement).value);
    if(newValue) document.getElementById("preview")!.innerHTML=`<p><b>${fixMarkup(newTitle)}</b></p><p>${fixMarkup(newValue)}</p>`;
}
function sanitize(string:string){
    // I don't trust people not to add malicious code, so this just removes any html tags
    string=string.replace("<","&lt").replace(">","&gt");
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