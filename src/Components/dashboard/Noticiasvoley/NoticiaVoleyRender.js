import React,{useEffect,useState}from 'react'
import NoticiaVoleyForm from './NoticiaVoleyForm';
import {db} from '../../../config/firebase'
const NoticiaVoleyRender = () => {
    const [noticiasVoley, setNoticiasVoley]= useState([])
    const [currentId,setCurrentId]= useState('');
    const getNoticiasVoley = async()=>{
        await db
        .collection("Noticias-Voley")
        .orderBy("Date","desc")
        .onSnapshot((querysnapshot)=>{
            const docs = [];
            querysnapshot.forEach((doc)=>{
                docs.push({...doc.data(),id: doc.id});
            });
            setNoticiasVoley(docs)
        });
    };
    const onDeleteNoticiaVoley = async (id)=>{
            if(window.confirm("Seguro que deseas eliminar la noticia?")){
                await db 
                .collection("Noticias-Voley")
                .doc(id)
                .delete()
            }
    };
    const addOrEditNoticiaVoley=async (noticiaVoleyObject)=>{
        try {
            if(currentId === "")
            await db 
            .collection("Noticias-Voley")
            .doc()
            .set(noticiaVoleyObject)
            setCurrentId("");
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(()=>{
        getNoticiasVoley()
    })
    return (
        <>
      <div className="col-12 p-2">
        <NoticiaVoleyForm
          {...{ addOrEditNoticiaVoley, currentId, noticiasVoley }}
        />
      </div>
      <br />
      <div className="col-12 p-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Titulo</th>
              <th>Copete</th>
              <th>Cuerpo</th>
              <th>Fuente</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          {noticiasVoley.map((noticia) => (
            <tbody key={noticia.id}>
              <tr>
                <td>{noticia.Fecha}</td>
                <td>{noticia.Title}</td>
                <td>{noticia.Copete}</td>
                <td>{noticia.Body}</td>
                <td>{noticia.Fuente}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => setCurrentId(noticia.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteNoticiaVoley(noticia.id)}
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

export default NoticiaVoleyRender
