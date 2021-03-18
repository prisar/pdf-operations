import React from "react";
import Dropzone from "react-dropzone";

import "./index.css";
import PdfView from "../../../components/PdfView";
import PdfUpload from "../../../components/PdfUpload";
import { Button } from "react-bootstrap";

export function MergePage() {
  const [firstfilename, setFirstFilename] = React.useState(null);
  const [secondfilename, setSecondFilename] = React.useState(null);
  const merge = async () => {
    // merge api call
  };

  const processFiles = (acceptedFiles: any) => {
    setFirstFilename(acceptedFiles[0].name);
    if (acceptedFiles.length === 2) {
      setSecondFilename(acceptedFiles[1].name);
    }
  };

  return (
    <div>
      <PdfUpload />
      <PdfUpload />

      <Button variant="primary" onClick={merge}>
        Start Merging
      </Button>

      <Button variant="primary" onClick={merge}>
        Merge
      </Button>

      <Dropzone
        onDrop={(acceptedFiles) => {
          processFiles(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div style={{ width: 1080, height: 100, backgroundColor: "gray", margin: 20, borderRadius: 10 }} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <div>{firstfilename}</div>
              <div>{secondfilename}</div>
            </div>
          </section>
        )}
      </Dropzone>

      <PdfView divId="adobe-dc-view-1" location="http://localhost:8000/api/v1/pdf/download?file=reorderPagesInput.pdf" fileName="reorderPagesInput.pdf" />
      {/* <PdfView divId="adobe-dc-view-2" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" /> */}
    </div>
  );
}

export default MergePage;
