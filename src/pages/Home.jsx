import React from "react";
import { getAllCats } from "../api/firebase";

export default function Home(){
    const [todayCat, setTodayCat] = React.useState({
        id: null,
        data: {
            imgSrc: ""
        }
    })

    React.useEffect(()=>{
        getAllCats().then(data=>data.slice(0,1).map(cat=>{
            setTodayCat(cat)
        }))
    }, [])

    return(
        <>
            <h1>Here is Home!</h1>
            <img src={todayCat.id ? todayCat.data.imgSrc : "yükleniyor..."} width="300" />
        </>
    )
}