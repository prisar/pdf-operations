import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import "./index.css";
import PdfView from "../../../components/PdfView";
import PdfUpload from "../../../components/PdfUpload";
import constants from "../../../config/constants";

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

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export function MergePage() {
  const [preview, setPreview] = React.useState(false);
  const [firstfiledata, setFirstfiledata] = React.useState(new Blob());
  const [secondfiledata, setSecondfiledata] = React.useState(new Blob());
  const [outputfile, setOutputfile] = React.useState(null);
  const [error, setError] = React.useState("");

  const uploadPdf = async (filedata: any) => {
    try {
      const data = new FormData();
      data.append("pdfFile", filedata);

      const url = `${constants.backend}/api/v1/pdf/upload`;
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const callMergeApi = async (firstfiledata: any, secondfiledata: any) => {
    try {
      const data = {
        firstPdf: (firstfiledata as any).name,
        secondPdf: (secondfiledata as any).name,
      };
      console.log(data);

      const url = `${constants.backend}/api/v1/pdf/merge`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setOutputfile(json?.file);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFiles = async () => {
    try {
      const uploads = [];
      uploads.push(uploadPdf(firstfiledata));
      uploads.push(uploadPdf(secondfiledata));
      Promise.all(uploads);

      // await uploadPdf(firstfiledata);
      // await uploadPdf(secondfiledata);
    } catch (err) {
      console.log(err);
    }
  };

  const merge = async () => {
    // upload and merge api call
    try {
      const uploads = [];
      uploads.push(uploadPdf(firstfiledata));
      uploads.push(uploadPdf(secondfiledata));
      Promise.all(uploads);

      await wait(5000);

      // merge
      const response = await callMergeApi(firstfiledata, secondfiledata);

      setFirstfiledata(new Blob());
      setSecondfiledata(new Blob());

      await wait(60000);
      setPreview(true);
    } catch (err) {
      console.log(err);
    }
  };

  const processFiles = (acceptedFiles: any) => {
    if (acceptedFiles.length === 2) {
      setFirstfiledata(acceptedFiles[0]);
      setSecondfiledata(acceptedFiles[1]);
    } else {
      setError("Check the no of files");
    }
  };

  const previewPdf = () => {
    setPreview(!preview);
  };

  React.useEffect(() => {

  }, [outputfile]);

  return (
    <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <div style={{ marginLeft: 40 }}>
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

                <div style={{ margin: 10, height: 30, color: "#fff" }}>{(firstfiledata as any).name}</div>
                <div style={{ margin: 10, height: 30, color: "#fff" }}>{(secondfiledata as any).name}</div>
              </div>
            </section>
          )}
        </Dropzone>
      </div>

      <div style={{ flexDirection: "column" }}>
        <CustomBtn onClick={uploadFiles}>
          <CustomBtnText>Upload</CustomBtnText>
        </CustomBtn>
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

      {error && <div style={{ fontSize: 32, color: "#000", margin: 20 }}>{error.toString()}</div>}

      {preview && <PdfView divId="adobe-dc-view-1" location={`http://localhost:8000/api/v1/pdf/download?file=${outputfile}`} fileName={outputfile || ''} />}
      {/* <PdfView divId="adobe-dc-view-2" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" /> */}
    </div>
  );
}

export default MergePage;
