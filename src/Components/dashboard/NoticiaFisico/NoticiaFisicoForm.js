import React, { useEffect, useState } from "react";
import { db, storage, timestamp } from "../../../config/firebase";
const NoticiaFisicoForm = (props) => {
  const initialStateValues = {
    Title: " ",
    Body: "",
    Fecha: "",
    Date: Date.now(timestamp),
    Fuente: "",
    Copete: "",
  };
  const [values, setValues] = useState(initialStateValues);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const types = ["image/png", "image/jpeg"];
  const noticiaFisicoImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const obj = values;
    obj[name] = value;
  };
  const addOrEditNoticiaFisico = async (noticiaFisicoObject) => {
    try {
      if (props.currentId)
        return await db
          .collection("Noticias-Fisico")
          .doc(props.currentId)
          .update(noticiaFisicoObject);
      await db
        .collection("Noticias-Fisico")
        .doc()
        .set(noticiaFisicoObject)
        .then(() => {
          console.log("Document successfuly written");
        });
    } catch (error) {
      console.log("Error writing document:", error);
    }
    setIsLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const NoticiaFisicoImg = storage
      .ref(`Noticias-Fisico-images/${file.name}`)
      .put(file);
    NoticiaFisicoImg.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsLoading(progress !== 100);
      },
      () => {},
      async () => {
        const url = await storage
          .ref("Noticias-Fisico-images")
          .child(file.name)
          .getDownloadURL();
        addOrEditNoticiaFisico({ ...values, NoticiaFisicoImg: url });
      }
    );
  };
  const getNoticiaFisicoById = async (id) => {
    if (!id) return;
    const doc = await db.collection("Noticias-Fisico").doc(id.toString()).get();
    setValues({ ...doc.data() });
  };
  useEffect(() => {
    if (props.currentId !== "") {
      getNoticiaFisicoById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="card card-body border-primary">
          <div className="form-group input-group">
            <input
              type="text"
              className="form-control"
              placeholder="titulo de la noticia de Fisicoculturismo"
              value={values.Title}
              name="Title"
              onChange={handleInputChange}
            />
            <div className="form-group input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Copete de la noticia"
                value={values.Copete}
                name="Copete"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group input-group">
            <textarea
              value={values.Body}
              name="Body"
              placeholder="Cuerpo de la noticia"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              rows="3"
              className="form-control"
              placeholder="Fuente de la noticia"
              name="Fuente"
              value={values.Fuente}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="fecha de publicacion"
              name="Fecha"
              value={values.Fecha}
              onChange={handleInputChange}
            />
          </div>

          <input
            type="file"
            placeholder="Sube una imagen"
            onChange={noticiaFisicoImgHandler}
          />

          <button className="btn btn-primary btn-block" disabled={isLoading}>
            {props.currentId === "" ? "Save" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoticiaFisicoForm;
