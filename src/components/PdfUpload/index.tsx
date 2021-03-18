import axios from "axios";

import React, { Component } from "react";
import { Button } from "react-bootstrap";

export function PdfUpload() {
  const [file, setFile] = React.useState(new Blob());

  const onChangeHandler = (event: any) => {
    setFile(event.target.files[0]);
    localStorage.setItem("MERGE_FIRST_FILE_NAME", `${event.target.files[0].name}`);
    const reader = new FileReader();
    const fileInfo = event.target.files[0];
    if (fileInfo) {
      reader.readAsBinaryString(event.target.files[0]);
      reader.onloadend = () => {
        const result = reader.result as string;
        const count = result.match(/\/Type[\s]*\/Page[^s]/g)?.length;
        localStorage.setItem(`PAGE_COUNT_${event.target.files[0].name}`, JSON.stringify(count));
      };
    }
  };

  const onSubmit = async () => {
    const data = new FormData();
    data.append("pdfFile", file);
    console.log(data);

    const url = "http://localhost:8000/api/v1/pdf/upload";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data, // body data type must match "Content-Type" header
    });
    console.log(response.json());
  };

  return (
    <div>
      <input type="file" name="file" onChange={onChangeHandler} />
      <Button variant="primary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default PdfUpload;
