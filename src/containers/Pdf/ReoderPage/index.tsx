import React from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";

import "./index.css";
import PdfView from "../../../components/PdfView";
import constants from "../../../config/constants";

const ContainerBox = styled.div`
  position: relative;
  width: 1440px;
  height: 700px;
  left: 0px;
`;

const Container = styled.div`
  position: absolute;
  width: 1440px;
  height: 700px;
  left: 0px;
  top: 0px;

  background: #f2f2f2;
`;

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

const Input = styled.input`
  width: 100;
  height: 70;
`;

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export function ReorderPage() {
  const [filedata, setFiledata] = React.useState(new Blob());
  const [outputfile, setOutputfile] = React.useState(null);
  const [pageIndexes, setPageIndexes] = React.useState([]);
  const [index, setIndex] = React.useState('');
  const [indexText, setIndexText] = React.useState("");
  const [expression, setExpression] = React.useState("");
  const [error, setError] = React.useState("");

  const reorder = async () => {
    // reorder api call
    try {
      if (!filedata) {
        setError('Add file');
      }
      const data = {
        pdfFile: (filedata as any).name,
        // pageIndexes: [
        //   {
        //     index: 0,
        //     type: "page",
        //     page: 1,
        //   },
        //   {
        //     index: 1,
        //     type: "range",
        //     range: {
        //       start: 3,
        //       end: 4,
        //     },
        //   },
        // ],
        pageIndexes: pageIndexes,
      };

      const url = `${constants.backend}/api/v1/pdf/reorder`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      await wait(15000);

      setOutputfile(json?.file);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const processFiles = (acceptedFiles: any) => {
    if (acceptedFiles.length === 1) {
      setFiledata(acceptedFiles[0]);
    } else {
      setError("Check the no of files");
    }
  };

  const uploadPdf = async () => {
    try {
      const data = new FormData();
      data.append("pdfFile", filedata);

      const url = `${constants.backend}/api/v1/pdf/upload`;
      await fetch(url, {
        method: "POST",
        body: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addPageIndex = () => {
    setExpression(`${expression}${!expression ? '' : ','} [${indexText}]`);
    const indexType = indexText?.split(",").length === 2 ? "range" : "page";

    if (indexType === "page") {
      const pageIndex = {
        index: 0,
        type: "page",
        page: parseInt(index || ''),
      };
      const indexes = [...pageIndexes, pageIndex];
      setPageIndexes(indexes as any);
    }
    if (indexType === "range") {
      const pageIndex = {
        index: parseInt(index || ''),
        type: "range",
        range: {
          start: parseInt(indexText?.split(",")[0]),
          end: parseInt(indexText?.split(",")[1]),
        },
      };
      const indexes = [...pageIndexes, pageIndex];
      setPageIndexes(indexes as any);
    }
    setIndex('');
    setIndexText('');
  };

  const onChangeIndex = (event: any) => {
    setIndex(event.target.value);
  };

  const onChangeIndexText = (event: any) => {
    setIndexText(event.target.value);
  };

  React.useEffect(() => {}, [outputfile, expression]);

  return (
    <div>
      <ContainerBox>
        <Container>
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
                      <p>Drag 'n' drop some file here, or click to select file</p>
                    </div>

                    <div style={{ margin: 10, height: 30, color: "#fff" }}>{(filedata as any).name}</div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          {/* Enter page indexes */}

          <CustomBtn onClick={uploadPdf}>
            <CustomBtnText>Upload</CustomBtnText>
          </CustomBtn>

          <CustomBtn onClick={reorder}>
            <CustomBtnText>Reorder</CustomBtnText>
          </CustomBtn>
          {expression && <div style={{ fontSize: 32, color: "green", margin: 20 }}>{expression}</div>}
          <div style={{ justifyContent: "center", alignItems: "center", margin: 20, minWidth: 500, minHeight: 200, alignSelf: "center", backgroundColor: "#fafafa" }}>
            <div style={{ marginLeft: 500, paddingTop: 30, flexDirection: "row" }}>
              <div>
                <div>Index</div>
                <Input value={index} onChange={onChangeIndex} />
              </div>
              <div>
                <div>Page / Range</div>
                <Input value={indexText} onChange={onChangeIndexText}/>
              </div>
            </div>
            <div style={{ marginLeft: 450, paddingBottom: 10, paddingTop: 20, flexDirection: "row", width: 400 }}>
            <CustomBtn onClick={addPageIndex}>
              <CustomBtnText>Add</CustomBtnText>
            </CustomBtn>
            </div>
          </div>

          {error && <div style={{ fontSize: 32, color: "#000", margin: 20 }}>{error.toString()}</div>}

          {outputfile && <PdfView divId="adobe-dc-view-1" location={`${constants.backend}/api/v1/pdf/download?file=${outputfile}`} fileName={outputfile || ""} />}
        </Container>
      </ContainerBox>
    </div>
  );
}

export default ReorderPage;
