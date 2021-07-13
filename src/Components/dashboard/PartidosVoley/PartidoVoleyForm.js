import React, { useEffect, useState } from "react";
import { db, storage, timestamp } from "../../../config/firebase";
const PartidoVoleyForm = (props) => {
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
  const [imgA,setImgA]= useState();
  const [imgB,setImgB]=useState()
  const [isLoading, setIsLoading] = useState(false);
  /* const [isLoading2, setIsLoading2] = useState(false); */
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const partidoVoleyImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const partidoVoleyImg2Handler = (e) => {
    let selectedFile2 = e.target.files[0];
    if (selectedFile2 && types.includes(selectedFile2.type)) {
      setFile2(selectedFile2);
    } else {
      setFile2(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const obj = values;
    obj[name] = value;
  };
 
  const uploadImgA = () => {
    const PartidoVoleyImg = storage
    .ref(`Partidos-Voley-Images/${file.name}`)
    .put(file);
  PartidoVoleyImg.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setIsLoading(progress !== 100);
    },
    () => {},
    async () => {
      const url = await storage
        .ref("Partidos-Voley-Images")
        .child(file.name)
        .getDownloadURL();
      /*  addOrEditPartidoVoley({ ...values, PartidoVoleyImg: url }); */
      setImgA(url); 
    console.log(url);
    }
  );
  }
  const uploadImgB = () => {
  
    const PartidoVoleyImg2 = storage
      .ref(`Partidos-Voley-Images-2/${file2.name}`)
      .put(file2);
    PartidoVoleyImg2.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       /*  setIsLoading2(progress !== 100);
        console.log(isLoading2); */
        console.log(progress);
      },
      () => {},
      async () => {
        const url2 = await storage
          .ref("Partidos-Voley-Images-2")
          .child(file2.name)
          .getDownloadURL();
/*         addOrEditPartidoVoley({ ...values, PartidoVoleyImg2: url2 });  */
        setImgB(url2)
        console.log(url2);
  })}
  const addOrEditPartidoVoley = async (partidoVoleyObject) => {
    try {
      if (props.currentId)
      return await db 
      .collection("Partidos-Voley")
      .doc(props.currentId)
      .update(partidoVoleyObject)
        return await db
          .collection("Partidos-Voley")
          .doc()
          .set(partidoVoleyObject)
          .then(() => {
            console.log("Document successfuly written");
          });
    } catch (error) {
      console.log("Error writing document: ", error);
    }
    setIsLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault()  
  };
  const submitPartido = async () => {
    if(!imgA && !imgB){
      console.log("No se puede subir el partido aún");
    } else {
      await addOrEditPartidoVoley({...values,imgA,imgB})
    }
  }
  const getPartidoVoleyById = async (id) => {
    if (!id) return;
    const doc = await db.collection("Partidos-Voley").doc(id.toString()).get();
    setValues({ ...doc.data() });
  };
  useEffect(() => {
    if (props.currentId !== "") {
      getPartidoVoleyById(props.currentId);
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
          onChange={partidoVoleyImgHandler}
        />
        <button className="btn btn-success mb-1" onClick={uploadImgA}>
          Confirmar imagen 1 
        </button>
        <input
          type="file"
          name="IMG2"
          placeholder="Imagen equipo 2"
          onChange={partidoVoleyImg2Handler}
        />
        <button className="btn btn-success mb-1" onClick={uploadImgB}>
          Confirmar imagen 2
        </button>
        <button className="btn btn-primary btn-block" disabled={isLoading} onClick={submitPartido}>
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default PartidoVoleyForm;
