import React, { useEffect, useState } from "react";
import { db, storage, timestamp } from "../../../config/firebase";
const NoticiaBasketlForm = (props) => {
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
  const [file2,setFile2] = useState();
  const [imgA,setImgA]= useState();
  const [imgB,setImgB] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const types = ["image/png", "image/jpeg"];
  const noticiaBasketImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      throw new Error("Incorrect_file_type");
    }
  };
  const noticiaBasketImg2Handler = (e)=>{ 
    let selectedFile2 = e.target.files[0];
    if (selectedFile2 && types.includes(selectedFile2.type)) {
      setFile2(selectedFile2);
    } else {
      setFile2(null);
      throw new Error("incorrect_file_type");
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const obj = values;
    obj[name] = value;
  };
  const uploadImgA = () => {
    const NoticiaBasketImg = storage
      .ref(`Noticias-Basket-images/${file.name}`)
      .put(file);
    NoticiaBasketImg.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsLoading(progress !== 100);
      },
      () => {},
      async () => {
        const url = await storage
          .ref("Noticias-Basket-images")
          .child(file.name)
          .getDownloadURL();
        setFile(url);
        setImgA(url);
        console.log(url);
      }
    );
  };
  const uploadImgB = () => {
    const NoticiaBasketImg2 = storage
      .ref(`Noticias-Basket-images-B/${file2.name}`)
      .put(file2);
    NoticiaBasketImg2.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsLoading(progress !== 100);
      },
      () => {},
      async () => {
        const url2 = await storage
          .ref("Noticias-Basket-images-B")
          .child(file2.name)
          .getDownloadURL();
        setImgB(url2);
        console.log(url2);
      }
    );
  };
  const addOrEditNoticiaBasket = async (noticiaBasketObject) => {
    try {
      if (props.currentId)
        return await db
          .collection("Noticias-Basket")
          .doc(props.currentId)
          .update(noticiaBasketObject);
      await db
        .collection("Noticias-Basket")
        .doc()
        .set(noticiaBasketObject)
        .then(() => {
          console.log("Document successfuly written");
        });
    } catch (error) {
      console.log("Error writing document:", error);
    }
    setIsLoading(false);
  };
  const submitNoticiaBasket = async () => {
    if(!imgA && !imgB) {
      console.log("No se puede subir la noticia aún");
    } else {
      await addOrEditNoticiaBasket ({...values,imgA,imgB})
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const getNoticiaBasketById = async (id) => {
    if (!id) return;
    const doc = await db.collection("Noticias-Basket").doc(id.toString()).get();
    setValues({ ...doc.data() });
  };
  useEffect(() => {
    if (props.currentId !== "") {
      getNoticiaBasketById(props.currentId);
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
              placeholder="titulo de la noticia"
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
            onChange={noticiaBasketImgHandler}
          />
          <button className="btn btn-success mb-1" disabled={isLoading} onClick={uploadImgA}>
            Confirmar imagen 1
          </button>
          
          <input
            type="file"
            placeholder="Sube una imagen"
            onChange={noticiaBasketImg2Handler}
          />
          <button className="btn btn-success mb-1" disabled={isLoading} onClick={uploadImgB}>
            Confirmar imagen 2
          </button>
          <button className="btn btn-primary btn-block" disabled={isLoading} onClick={submitNoticiaBasket}>
            {props.currentId === "" ? "Save" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoticiaBasketlForm;
