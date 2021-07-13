import React,{useEffect,useState} from 'react'
import PartidoBasketForm from './PartidoBasketForm';
import { db } from '../../../config/firebase';
const PartidoBasketRender = () => {
    const [partidosBasket, setPartidosBasket]=useState([])
    const [currentId,setCurrentId]= useState("");
    const getPartidosBasket = async()=>{
        await db
        .collection("Partidos-Basket")
        .orderBy("Date",'desc')
        .onSnapshot((querysnapshot)=>{
            const docs =[];
            querysnapshot.forEach((doc)=>{
                docs.push({...doc.data(),id:doc.id})
            });
            setPartidosBasket(docs)
        });
    };
    const onDeletePartidoBasket = async(id)=>{
        if(window.confirm("Seguro que deseas eliminar el evento de Basket?")){
            await db.collection("Partidos-Basket").doc(id).delete();
        };
    };
    const addOrEditPartidoBasket = async(partidoBasketObject)=>{
        try {
            if(currentId === ""){
                await db.collection("Noticias-Basket").doc().set(partidoBasketObject)
                console.log(partidoBasketObject);
            }else{
                await db 
                .collection("Partidos-Basket")
                .doc(currentId)
                .update(partidoBasketObject)
                setCurrentId("")
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getPartidosBasket();
    })
    return (
        <>
        <div className="col-12 p-2">
    <PartidoBasketForm
            {...{ addOrEditPartidoBasket, currentId, partidosBasket }}
          />
        </div>
        <br />
        <div className="col-12 p-2">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Equipo 1</th>
                <th>Equipo 2</th>
                <th>Fecha del Partido</th>
                <th>MVP 1</th>
                <th>MVP 2</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            {partidosBasket.map((partido) => (
              <tbody key={partido.id}>
                <tr>
                  <td>{partido.Equipo_1}</td>
                  <td>{partido.Equipo_2}</td>
                  <td>{partido.Fecha_Partido}</td>
                  <td>{partido.MVP_1}</td>
                  <td>{partido.MVP_2}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => setCurrentId(partido.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeletePartidoBasket(partido.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </>
    )
}

export default PartidoBasketRender
