import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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

export function DocSignPage() {
  const [preview, setPreview] = React.useState(false);
  const [filedata, setFiledata] = React.useState(new Blob());
  const [outputfile, setOutputfile] = React.useState(null);
  const [apiAccessPoint, setApiAccessPoint] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [error, setError] = React.useState("");

  const history = useHistory();

  const esign = async () => {
    try {
      if (!accessToken) {
        alert("Signin with adobe first!");
      }

      // create agreement
      const data = new FormData();
      data.append("pdfFile", filedata);

      const url = `${apiAccessPoint}api/rest/v6/transientDocuments`;
      const response = await fetch(url, {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
          // "Content-Disposition": `form-data; name=";File"; filename="MyPDF.pdf"`,
        },
        body: data,
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const checkStatus = () => {
    try {
      // call status api
    } catch (err) {
      console.log(err);
    }
  };

  const adobeSignin = () => {
    try {
      const authUri = `${constants.esignauthshardendpoint}?redirect_uri=${constants.host}/docsign&response_type=code&client_id=${constants.esignauthclientid}&scope=user_login:self+agreement_send:account`;
      window.location.href = authUri;
    } catch (err) {
      console.log(err);
    }
  };

  const processFiles = (acceptedFiles: any) => {
    if (!accessToken) {
      alert("Signin with adobe first!");
    }
    if (acceptedFiles.length === 1) {
      setFiledata(acceptedFiles[0]);
    } else {
      setError("Check the no of files");
    }
  };

  const getAccessToken = async (apiaccesspoint: string, code: string) => {
    try {
      const url = `${apiaccesspoint}oauth/token?code=${code}&client_id=${constants.esignauthclientid}&client_secret=${constants.esignauthclientsecret}&redirect_uri=${constants.host}/docsign&grant_type=authorization_code`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const jsonResponse = await response.json();
      setAccessToken(jsonResponse.access_token);
      localStorage.setItem("access_token", JSON.stringify(jsonResponse.access_token));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const auth_code = new URLSearchParams(window.location.search).get("code");
    const apiaccesspoint = new URLSearchParams(window.location.search).get("api_access_point");
    const webaccesspoint = new URLSearchParams(window.location.search).get("web_access_point");
    if (auth_code) {
      getAccessToken(apiaccesspoint as string, auth_code);
      setApiAccessPoint(apiaccesspoint as any);
      localStorage.setItem("api_access_point", JSON.stringify(apiaccesspoint));
    }
  }, []);

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

          <CustomBtn onClick={adobeSignin}>
            <CustomBtnText>Adobe Signin</CustomBtnText>
          </CustomBtn>

          <CustomBtn onClick={esign}>
            <CustomBtnText>eSign</CustomBtnText>
          </CustomBtn>

          <CustomBtn onClick={checkStatus}>
            <CustomBtnText>Status</CustomBtnText>
          </CustomBtn>

          {error && <div style={{ fontSize: 32, color: "#000", margin: 20 }}>{error.toString()}</div>}
        </Container>
      </ContainerBox>
    </div>
  );
}

export default DocSignPage;
