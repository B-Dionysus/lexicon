// import React from "react";
interface Props{
    image:string;
}
export default function UserImage(props:Props) {
    let imageStyle={
        display: "block", 
        width:"150px",
        height:"150px",
        backgroundImage:"url("+props.image+")",    
        marginLeft: "auto",
        marginRight: "auto",
        backgroundSize:"contain",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "50%",
        backgroundPositionX: "center",
    }

    return(
        <span style={imageStyle}>
            {/* <img src={props.image} /> */}
        </span>
    );
}
