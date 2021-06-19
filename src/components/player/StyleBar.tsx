import StyleButton from "../StyleButton"
import {styleButton} from "../../interfaces/style.interfaces"


export default function StyleBar(props:{callback:Function}){
    // Each button is given a string to add to the beginning and end of whatever text is selected, and what it should say.
    // There's also a callback to the function in this parent that processes the button click (adding the strings to the text)
    const bold:styleButton={
        prefix:"[b]",
        postfix:"[/b]",
        iconText:"B",
        altText:"Bold Selection",
        callback:props.callback,
    }
    const italic:styleButton={
        prefix:"[i]",
        postfix:"[/i]",
        iconText:"I",
        altText:"Italicize Selection",
        callback:props.callback,
    }
    const link:styleButton={
        prefix:"[l]",
        postfix:"[/l]",
        iconText:"&",
        altText:"Make Linked Entry",
        callback:props.callback,
    }
    return(
        <div className="styleBar">
            <div>
                <StyleButton button={bold}/>
                <StyleButton button={italic}/>
            </div>
            <div>
                <StyleButton button={link}/>
            </div>
        </div>
    )
}