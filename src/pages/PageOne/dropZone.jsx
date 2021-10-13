import React from "react";
import css from "./index.module.less";
import { DropzoneArea } from "material-ui-dropzone";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";

/**
 * Wrapper for DropzoneArea
 * @param {string} props name filename id
 * @param {string} props desc text description
 * @param {string} props fileType document extension
 * @param {function} props onFileLoad callback
 * @returns Dropzone with title and inner text
 */
export default function DropZone({ name, desc, fileType, onFileLoad }) {
  const [files, setFile] = useState([]);

  const onDrop = (file) => {
    //Format chekcs
    if (file.length !== 1) {
      alert("More than one file, retry");
    }
    console.log(file);

    if (file[0].name.endsWith(fileType)) {
      setFile([file]);
      file[0].text().then((result) => {
        onFileLoad(name, result);
      });
    } else {
      console.log("Wrong file type");
      alert("Wrong file type");
    }
  };
  // To change the inner tet when dorpping a file
  let dropText =
    files.length > 0
      ? files[0].name
      : "Drag and drop " + name?.toLowerCase() + fileType ??
        "--" + " here or click";

  return (
    <div className={css.dropzoneBox}>
      <Typography variant="h6" align="center" color="textPrimary" component="p">
        <b>{name} File </b>
        <br />
        {desc}
      </Typography>
      <DropzoneArea
        acceptedFiles={[".pddl"]}
        filesLimit={1}
        onDrop={(file) => onDrop(file)}
        dropzoneText={dropText}
      />
    </div>
  );
}
