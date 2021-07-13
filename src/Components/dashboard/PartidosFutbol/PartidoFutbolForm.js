import React, { useEffect, useState } from "react";
import { db, storage, timestamp } from "../../../config/firebase";
const PartidoFutbolForm = (props) => {
  const initialStateValues = {
    Equipo_1: "",
    Equipo_2: "",
    Fecha_Partido: "",
    Ultimo_Partido: "",
    Descripcion: "",
    MVP_1: "",
    MVP_2: "",
    Date: Date.now(timestamp),
  };
  const [values, setValues] = useState(initialStateValues);
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [file3,setFile3] = useState();
  const [file4,setFile4]=useState();
  const [file5,setFile5]=useState();
  const [imgA,setImgA]= useState();
  const [imgB,setImgB]=useState();
  const [imgC,setImgC]=useState();
  const [imgD,setImgD]=useState();
  const [imgE,setImgE]=useState();

  const [isLoading, setIsLoading] = useState(false);
  /* const [isLoading2, setIsLoading2] = useState(false); */
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const partidoFutbolImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const partidoFutbolImg2Handler = (e) => {
    let selectedFile2 = e.target.files[0];
    if (selectedFile2 && types.includes(selectedFile2.type)) {
      setFile2(selectedFile2);
    } else {
      setFile2(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const partidoFutbolImg3Handler = (e) => {
    let selectedFile3 = e.target.files[0];
    if (selectedFile3 && types.includes(selectedFile3.type)) {
      setFile3(selectedFile3);
    } else {
      setFile3(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const partidoFutbolImg4Handler = (e) => {
    let selectedFile4 = e.target.files[0];
    if (selectedFile4 && types.includes(selectedFile4.type)) {
      setFile4(selectedFile4);
    } else {
      setFile4(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const partidoFutbolImg5Handler = (e) => {
    let selectedFile5 = e.target.files[0];
    if (selectedFile5 && types.includes(selectedFile5.type)) {
      setFile5(selectedFile5);
    } else {
      setFile5(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const obj = values;
    obj[name] = value;
  };
    const handleSubmit = async (e) => {
    e.preventDefault();

 }
 const uploadImgA = ( ) => {
  const PartidoFutbolImg = storage
  .ref(`Partidos-Futbol-Images/${file.name}`)
  .put(file);
PartidoFutbolImg.on(
  "state_changed",
  (snapshot) => {
    const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setIsLoading(progress !== 100);
  },
  () => {},
  async () => {
    const url = await storage
      .ref("Partidos-Futbol-Images")
      .child(file.name)
      .getDownloadURL();
    setImgA(url); 
  console.log(url);
  }
);
 }
 const uploadImgB = () => {
  const PartidoFutbolImg2 = storage
  .ref(`Partidos-Futbol-Images-2/${file2.name}`)
  .put(file2);
PartidoFutbolImg2.on(
  "state_changed",
  (snapshot) => {
    const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(progress);
  },
  () => {},
  async () => {
    const url2 = await storage
      .ref("Partidos-Futbol-Images-2")
      .child(file2.name)
      .getDownloadURL();
    setImgB(url2)
    console.log(url2);
  }
);
 }
 const uploadImgC = () => {
  const PartidoFutbolImg3 = storage
  .ref(`Partidos-Futbol-Images-3/${file3.name}`)
  .put(file3);
PartidoFutbolImg3.on(
  "state_changed",
  (snapshot) => {
    const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(progress);
  },
  () => {},
  async () => {
    const url3 = await storage
      .ref("Partidos-Futbol-Images-3")
      .child(file3.name)
      .getDownloadURL();
    setImgC(url3)
    console.log(url3);
  }
);
 }
 const uploadImgD = () => {
  const PartidoFutbolImg4 = storage
  .ref(`Partidos-Futbol-Images-4/${file4.name}`)
  .put(file2);
PartidoFutbolImg4.on(
  "state_changed",
  (snapshot) => {
    const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(progress);
  },
  () => {},
  async () => {
    const url4 = await storage
      .ref("Partidos-Futbol-Images-4")
      .child(file4.name)
      .getDownloadURL();
    setImgD(url4)
    console.log(url4);
  }
);
 }
 const uploadImgE = () => {
  const PartidoFutbolImg5 = storage
  .ref(`Partidos-Futbol-Images-5/${file5.name}`)
  .put(file5);
PartidoFutbolImg5.on(
  "state_changed",
  (snapshot) => {
    const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(progress);
  },
  () => {},
  async () => {
    const url5 = await storage
      .ref("Partidos-Futbol-Images-5")
      .child(file5.name)
      .getDownloadURL();
    setImgE(url5)
    console.log(url5);
  }
);
 }

 const addOrEditPartidoFutbol = async (partidoFutbolObject) => {
  try {
    if (props.currentId)
    return await db 
    .collection("Partidos-Futbol")
    .doc(props.currentId)
    .update(partidoFutbolObject)
      return await db
        .collection("Partidos-Futbol")
        .doc()
        .set(partidoFutbolObject)
        .then(() => {
          console.log("Document successfuly written");
        });
  } catch (error) {
    console.log("Error writing document: ", error);
  }
  setIsLoading(false);
};
 const submitPartido = async () => {
  if (!imgA && !imgB && !imgC && !imgD && !imgE){
    console.log("No se puede subir el partido aun");
} else {
await addOrEditPartidoFutbol({...values,imgA,imgB, imgC, imgD, imgE})
}
};
  const getPartidoFutbolById = async (id) => {
    if (!id) return;
    const doc = await db.collection("Partidos-Futbol").doc(id.toString()).get();
    setValues({ ...doc.data() });
  };
  useEffect(() => {
    if (props.currentId !== "") {
      getPartidoFutbolById(props.currentId);
    }
  }, [props.currentId]);
  return (
    <div>
      <form onSubmit={handleSubmit} className="card card-body">
        <div className="form-group input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Equipo 1"
            value={values.Equipo_1}
            name="Equipo_1"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={values.Equipo_2}
            className="form-control"
            placeholder="equipo 2 "
            name="Equipo_2"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Fecha del partido"
            value={values.Fecha_Partido}
            name="Fecha_Partido"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Ultimo resultado"
            name="Ultimo_Partido"
            value={values.Ultimo_Partido}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Descripcion"
            value={values.Descripcion}
            name="Descripcion"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="MVP equipo 1 "
            value={values.MVP_1}
            name="MVP_1"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="MVP equipo 2 "
            value={values.MVP_2}
            name="MVP_2"
            onChange={handleInputChange}
          />
        </div>
        <input
          type="file"
          name="IMG1"
          placeholder="Imagen equipo 1"
           onChange={partidoFutbolImgHandler} 
        />
        <button className="btn btn-success mb-1" onClick={uploadImgA}>
          Confirmar imagen 1 
        </button>
        <input
          type="file"
          name="IMG2"
          placeholder="Imagen equipo 2"
           onChange={partidoFutbolImg2Handler} 
        />
         <button className="btn btn-success mb-1" onClick={uploadImgB}>
          Confirmar imagen 2 
        </button>
        <input
          type="file"
          name="IMG3"
          placeholder="Escudo equipo 1"
           onChange={partidoFutbolImg3Handler} 
        />
        <button className="btn btn-success mb-1" onClick={uploadImgC}>
          Confirmar imagen 3 
        </button>
        <input
          type="file"
          name="IMG4"
          placeholder="Escudo equipo 2"
           onChange={partidoFutbolImg4Handler} 
        />
        <button className="btn btn-success mb-1" onClick={uploadImgD}>
          Confirmar imagen 4 
        </button>
        <input
          type="file"
          name="IMG5"
          placeholder="Imagen Evento"
           onChange={partidoFutbolImg5Handler} 
        />
        <button className="btn btn-success mb-1" onClick={uploadImgE}>
          Confirmar imagen 5 
        </button>
        <button className="btn btn-primary btn-block" disabled={isLoading} onClick={submitPartido}>
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default PartidoFutbolForm;
