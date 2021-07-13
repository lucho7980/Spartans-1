import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {db} from '../../config/firebase'
const NoticiasHandball = () => {
    const [noticiasHandball,setNoticiasHandball] = useState([]);
    const getNoticiasHandball = async ()=>{
        await db
        .collection("Noticias-Handball")
        .orderBy("Date","desc")
        .limit(4)
        .onSnapshot((querysnapshot)=>{
            const docs = []
            querysnapshot.forEach((doc)=>{
                docs.push({...doc.data(),id:doc.id})
            });
            setNoticiasHandball(docs)
        });
    };
    useEffect(()=>{
        getNoticiasHandball()
    })
    return (
        <>
        <div>
          <div className="col-md-4 p-2">
            {noticiasHandball.map((noticia) => (
              <div className="card-mb-1" key={noticia.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    {noticia.NoticiaHandballImg && (
                      <img
                        src={noticia?.NoticiaHandballImg}
                        style={{ width: "50%" }}
                        alt="sample"
                      />
                    )}
                    <Link to={"./noticiahandball/" + noticia.id}>
                    <h4>{noticia.Title}</h4>
                    <p>{noticia.Body}</p>
                    <p>{noticia.Copete}</p>
                    <p>{noticia.Description}</p>
                    <p>{noticia.Fuente}</p>
                    <p>{noticia.Fecha}</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
}

export default NoticiasHandball
