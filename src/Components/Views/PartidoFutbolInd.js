import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { db } from "../../config/firebase";

const PartidoFutbolInd = () => {
    const {id} =useParams()
    const [Equipo_1, setEquipo_1] = useState("")
    const [Equipo_2,setEquipo_2]= useState("")
    const [Fecha_Partido,setFecha_Partido] = useState("")
    const [Ultimo_Partido,setUltimo_Partido] = useState("")
    const [MVP_1,setMVP_1] =useState("")
    const [MVP_2,setMVP_2] = useState("")
    const [PartidoFutbolImgA,setPartidoFutbolImgA] = useState("")
    const [PartidoFutbolImgB,setPartidoFutbolImgB] = useState("")
    const [PartidoFutbolImgC,setPartidoFutbolImgC] = useState("")
    const [PartidoFutbolImgD,setPartidoFutbolImgD] = useState("")
    const [PartidoFutbolImgE,setPartidoFutbolImgE] = useState("")

    const getPartidoFutbolIndividual = async () => {
        await db
        .collection("Partidos-Futbol")
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exists){
                setEquipo_1(doc.data().Equipo_1)
                setEquipo_2(doc.data().Equipo_2)
                setFecha_Partido(doc.data().Fecha_Partido)
                setUltimo_Partido(doc.data().Ultimo_Partido)
                setPartidoFutbolImgA(doc.data().imgA)
                setPartidoFutbolImgB(doc.data().imgB)
                setPartidoFutbolImgC(doc.data().imgC)
                setPartidoFutbolImgD(doc.data().imgD)
                setPartidoFutbolImgE(doc.data().imgE)

                setMVP_1(doc.data().MVP_1)
                setMVP_2(doc.data().MVP_2)
                console.log("Document data: ", Equipo_1,Equipo_2,Fecha_Partido,Ultimo_Partido);
            } else {
                console.log("No matchs");
            }
        }) 
        .catch((error)=>{
            console.log("Error getting document: ", error);
        })
    };
    useEffect(()=> {
        getPartidoFutbolIndividual();
    });
    return (
        <>
        <div className="container">
            <div className="row">
                <h2>{Equipo_1}</h2>
                <h2>{Equipo_2}</h2>
                <p>{MVP_1}</p>
                <p>{MVP_2}</p>
                <img src={PartidoFutbolImgA} alt="sample" style={{width:"50%"}}/>
                <img src={PartidoFutbolImgB} alt="sample" style={{width:"50%"}}/>
                <img src={PartidoFutbolImgC} alt="sample" style={{width:"50%"}}/>
                <img src={PartidoFutbolImgD} alt="sample" style={{width:"50%"}}/>
                <img src={PartidoFutbolImgE} alt="sample" style={{width:"50%"}}/>
            </div>
        </div>
        </>
    )
}
export default PartidoFutbolInd