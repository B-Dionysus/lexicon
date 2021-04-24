import "../css/book.css"
// import booksvg from "./book.svg"
interface bookProps{
    display:boolean;
}
export default function Book(props:bookProps){  
    let style={display:'none'};
    if (props.display) style={display:'block'};
    return(
        <span className="frame" id="book" style={style as React.CSSProperties}>
            LOADING...
            <span className="book" >
            </span>
        </span>
    );
}; 