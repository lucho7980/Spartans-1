import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { db } from "../../config/firebase";

const PartidoVoleyInd = () => {
    const {id} =useParams()
    const [Equipo_1, setEquipo_1] = useState("")
    const [Equipo_2,setEquipo_2]= useState("")
    const [Fecha_Partido,setFecha_Partido] = useState("")
    const [Ultimo_Partido,setUltimo_Partido] = useState("")
    const [MVP_1,setMVP_1] =useState("")
    const [MVP_2,setMVP_2] = useState("")
    const [PartidoVoleyImgA,setPartidoVoleyImgA] = useState("")
    const [PartidoVoleyImgB,setPartidoVoleyImgB] = useState("")
    const getPartidoVoleyIndividual = async () => {
        await db
        .collection("Partidos-Voley")
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exists){
                setEquipo_1(doc.data().Equipo_1)
                setEquipo_2(doc.data().Equipo_2)
                setFecha_Partido(doc.data().Fecha_Partido)
                setUltimo_Partido(doc.data().Ultimo_Partido)
                setPartidoVoleyImgA(doc.data().imgA)
                setPartidoVoleyImgB(doc.data().imgB)
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
        getPartidoVoleyIndividual();
    });
    return (
        <>
        <div className="container">
            <div className="row">
                <h2>{Equipo_1}</h2>
                <h2>{Equipo_2}</h2>
                <p>{MVP_1}</p>
                <p>{MVP_2}</p>
                <img src={PartidoVoleyImgA} alt="sample" style={{width:"50%"}}/>
                <img src={PartidoVoleyImgB} alt="sample" style={{width:"50%"}}/>
            </div>
        </div>
        </>
    )
}
export default PartidoVoleyInd