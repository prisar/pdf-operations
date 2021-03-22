import React from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";

import "./index.css";
import PdfView from "../../../components/PdfView";
import Spinner from "../../../components/Loader/Spinner";
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

const PageInput = styled.input`
  position: absolute;
  left: 37.5%;
  right: 37.5%;
  top: 34.51%;
  bottom: 54.23%;
  // z-index: 999;
  // opacity: 0.5;
`;

const PageInputPlaceholder = styled.div`
  position: absolute;
  left: 39.24%;
  right: 54.65%;
  top: 34.51%;
  bottom: 42.96%;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  /* identical to box height */

  color: rgba(0, 0, 0, 0.5);
`;

const TIMEOUT = 15000;

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export function SplitPage() {
  const [filedata, setFiledata] = React.useState(new Blob());
  const [firstoutputfile, setFirstOutputfile] = React.useState(null);
  const [secondoutputfile, setSecondOutputfile] = React.useState(null);
  const [pageno, setPageno] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [error, setError] = React.useState("");

  const processFiles = (acceptedFiles: any) => {
    if (acceptedFiles.length === 1) {
      setFiledata(acceptedFiles[0]);
    } else {
      setError("Check the no of files");
    }
  };

  const constPages = () => {
    const reader = new FileReader();
    if (filedata) {
      reader.readAsBinaryString(filedata);
      reader.onloadend = () => {
        const result = reader.result as string;
        const count = result.match(/\/Type[\s]*\/Page[^s]/g)?.length;
        setTotalPages(count as number);
      };
    }
  };

  const uploadPdf = async () => {
    try {
      setLoading(true);
      constPages();
      const data = new FormData();
      data.append("pdfFile", filedata);

      const url = `${constants.backend}/api/v1/pdf/upload`;
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const split = async () => {
    // split api call
    try {
      if (!totalPages) {
        return;
      }
      if (!pageno) {
        setError("Add page no");
        return;
      }
      if (parseInt(pageno || "") < 1 || parseInt(pageno || "") > totalPages+1) {
        setError("Invalid pageno. Splits should have atleast one page");
        return;
      }
      setLoading(true);
      setError('');
      setFirstOutputfile(null);
      setSecondOutputfile(null);
      const data = {
        pdfFile: (filedata as any).name,
        pages: [],
        pageRanges: [
          {
            range: {
              start: 1,
              end: parseInt(pageno || ""),
            },
          },
          {
            range: {
              start: parseInt(pageno || "") + 1,
              end: totalPages,
            },
          },
        ],
      };
      console.log(data);

      const url = `${constants.backend}/api/v1/pdf/split`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      await wait(2 * TIMEOUT);

      setFirstOutputfile(json?.files.first);
      setSecondOutputfile(json?.files.second);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onChangePageno = (event: any) => {
    setPageno(event.target.value);
  };

  React.useEffect(() => {}, [firstoutputfile, secondoutputfile]);

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

          {/* Enter page range */}

          <CustomBtn onClick={uploadPdf}>
            <CustomBtnText>Upload</CustomBtnText>
          </CustomBtn>

          <CustomBtn onClick={split}>
            <CustomBtnText>Split</CustomBtnText>
          </CustomBtn>

          <div style={{ alignSelf: "center", marginLeft: 60 }}>({totalPages})</div>

          <PageInput type="text" onChange={onChangePageno}></PageInput>
          {!pageno && <PageInputPlaceholder>Page Number</PageInputPlaceholder>}

          {error && <div style={{ fontSize: 32, color: "#000", margin: 20 }}>{error.toString()}</div>}
          <Spinner loading={loading} />
          <div style={{flexDirection: 'column'}}>
          {firstoutputfile && <PdfView divId="adobe-dc-view-1" location={`${constants.backend}/api/v1/pdf/download?file=${firstoutputfile}`} fileName={firstoutputfile || ""} />}
          {secondoutputfile && <PdfView divId="adobe-dc-view-2" location={`${constants.backend}/api/v1/pdf/download?file=${secondoutputfile}`} fileName={secondoutputfile || ""} />}
          </div>
        </Container>
      </ContainerBox>
    </div>
  );
}

export default SplitPage;
