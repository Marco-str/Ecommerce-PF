import { useEffect, useRef } from "react";
import styles from "../DashBoardAdmin/CreatePost.module.css"

const UploadFile = ({ handleUpload, folder }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloud_name: "finalproject123",
        uploadPreset: "usersPictures",
        folder,
      },
      handleUpload
    );
  }, [handleUpload,folder]);
  /******************************************************* */
  const handleClick = (event) => {
    // para que no se recargue la pagina al apretar el boton

    event.preventDefault();
    widgetRef.current.open();
  };
  return (
    <button 
    className={styles.enviar}
    onClick={handleClick}>
      Upload Image
    </button>
  );
};

export default UploadFile;
