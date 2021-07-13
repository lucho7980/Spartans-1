import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {db} from '../../config/firebase'
const PartidoHandball = () => {
    const [partidosHandball,setPartidosHandball]=useState([]);
    const [CurrentId,setCurrentId] = useState("")
    const getPartidosHandball =async()=>{
        await db.collection("Partidos-Handball")
        .orderBy("Date","desc")
        .limit(4)
        .onSnapshot((querysnapshot)=>{
            const docs =[]
            querysnapshot.forEach((doc)=>{
                docs.push({...doc.data(),id:doc.id})
            });
            setPartidosHandball(docs)
        })
    }
    useEffect(()=>{
        getPartidosHandball();
    })
    const getPartidoHandballIndividual = async()=> {
      try {
        if(CurrentId) {
          const data = await db
          .collection("Partidos-Handball")
          .doc(CurrentId)
          .get()
          console.log(data.id);
        }
      } catch (error) {
        console.error(error)
      }
    }
    return (
        <>
        <div>
          <div className="col-md-4 p-2">
            {partidosHandball.map((partido) => (
              <div className="card-mb-1" key={partido.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    {partido.imgA &&  (
                      <img
                        src={partido?.imgA}
                        style={{ width: "50%" }}
                        alt="sample"
                      />
                    )}
                    {partido.imgB && (
                        <img src={partido?.imgB} alt="sample" style={{width:"50%"}} />
                    )}
                    <h6 onClick={getPartidoHandballIndividual}>ir al evento!</h6>
                      <Link to={"./partidohandball/"+partido.id}>
                    <h4 onClick={()=>setCurrentId}>{partido.Title}</h4>
                    <div className="container-">
                    <p>{partido.Equipo_1}</p>
                    <p>{partido.Equipo_2}</p>
                    <p>{partido.Fecha_Partido}</p>
                    <p>{partido.Ultimo_Partido}</p>
                    <p>{partido.MVP_1}</p>
                    <p>{partido.MVP_2}</p>
                    </div>
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

export default PartidoHandball
