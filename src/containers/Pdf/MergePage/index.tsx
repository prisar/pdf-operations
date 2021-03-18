import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import "./index.css";
import PdfView from "../../../components/PdfView";
import PdfUpload from "../../../components/PdfUpload";

const CustomBtn = styled.div`
  position: relative;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: #000000;
  border-radius: 5px;
  width: 200px;
  height: 60px;
  left: 60px;
  // top: 67px;
  margin: 5px;
  cursor: pointer;
`;

const CustomBtnText = styled.div`
  position: relative;
  height: 22px;
  left: 25px;
  right: 24px;
  top: calc(50% - 22px / 2);

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 5px;

  color: #ffffff;
`;

export function MergePage() {
  const [firstfilename, setFirstFilename] = React.useState(null);
  const [secondfilename, setSecondFilename] = React.useState(null);
  const [preview, setPreview] = React.useState(false);
  const [firstfiledata, setFirstfiledata] = React.useState(new Blob());

  const merge = async () => {
    // merge api call
    const data = new FormData();
    data.append("pdfFile", firstfiledata);
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

  const processFiles = (acceptedFiles: any) => {
    setFirstFilename(acceptedFiles[0].name);
    setFirstfiledata(acceptedFiles[0]);
    if (acceptedFiles.length === 2) {
      setSecondFilename(acceptedFiles[1].name);
    }
  };

  const previewPdf = () => {
    setPreview(!preview);
  };

  return (
    <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <PdfUpload />
      <PdfUpload /> */}

      <Dropzone
        onDrop={(acceptedFiles) => {
          processFiles(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div style={{ width: 1080, height: 120, backgroundColor: "red", margin: 20, borderRadius: 10, justifyContent: "center", alignItems: "center" }} {...getRootProps()}>
              <input {...getInputProps()} />
              <div style={{ margin: 10, height: 30, color: "#fff" }}>
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>

              <div style={{ margin: 10, height: 30, color: "#fff" }}>{firstfilename}</div>
              <div style={{ margin: 10, height: 30, color: "#fff" }}>{firstfilename}</div>
            </div>
          </section>
        )}
      </Dropzone>

      <div style={{ flexDirection: "column" }}>
        <CustomBtn onClick={previewPdf}>
          <CustomBtnText>View 1</CustomBtnText>
        </CustomBtn>

        <CustomBtn onClick={previewPdf}>
          <CustomBtnText>View 2</CustomBtnText>
        </CustomBtn>

        <CustomBtn onClick={merge}>
          <CustomBtnText>Merge</CustomBtnText>
        </CustomBtn>
      </div>

      {preview && <PdfView divId="adobe-dc-view-1" location="http://localhost:8000/api/v1/pdf/download?file=reorderPagesInput.pdf" fileName="reorderPagesInput.pdf" />}
      {/* <PdfView divId="adobe-dc-view-2" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" /> */}
    </div>
  );
}

export default MergePage;
