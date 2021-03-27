import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./index.css";
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: 620,
  },
}));

function getSteps() {
  return ["Adobe Signin", "Agreement creation", "Sending the agreement", "Sign the document!"];
}

function getStepContent(step: any) {
  switch (step) {
    case 0:
      return "Adobe Signin...";
    case 1:
      return "Create an agreement!";
    case 2:
      return "Send the agreement for signing!";
    case 3:
      return "Get signing url, and sign the document as a signer!";
    default:
      return "Unknown step";
  }
}

export function DocSignPage() {
  const [filedata, setFiledata] = React.useState(new Blob());
  const [apiAccessPoint, setApiAccessPoint] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [docName, setDocName] = React.useState('');
  const [participant, setParticipant] = React.useState([]);
  const [transientDocumentId, setTransientDocumentId] = React.useState(null);
  const [agreementId, setAgreementId] = React.useState(null);
  const [siginingUrls, setSigningUrls] = React.useState([]);
  const [error, setError] = React.useState("");
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step: any) => {
    return step === 4;
  };

  const isStepSkipped = (step: any) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const createAgreement = async () => {
    try {
      // create agreement
      const data = new FormData();
      data.append("File", filedata);

      const url = `${apiAccessPoint}api/rest/v6/transientDocuments`;
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status >= 400) {
        return;
      }
      console.log(response.data);

      setTransientDocumentId(response.data.transientDocumentId);
      handleNext();
    } catch (err) {
      console.log(err);
    }
  };

  const sendAgreement = async () => {
    try {
      // create agreement
      const data = {
        fileInfos: [
          {
            transientDocumentId: transientDocumentId,
          },
        ],
        name: docName,
        participantSetsInfo: [
          {
            memberInfos: [
              {
                email: participant,
              },
            ],
            order: 1,
            role: "SIGNER",
          },
        ],
        signatureType: "ESIGN",
        state: "IN_PROCESS",
      };

      const url = `${apiAccessPoint}api/rest/v6/agreements`;
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 400) {
        return;
      }
      console.log(response);
      setAgreementId(response.data?.id);
      handleNext();
    } catch (err) {
      console.log(err);
    }
  };

  const getSigningUrl = async () => {
    try {
      console.log(agreementId);
      const url = `${apiAccessPoint}api/rest/v6/agreements/${agreementId}/signingUrls`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status >= 400) {
        setError(`error ${response.status}`);
        return;
      }
      console.log(response);
      const urls = response.data?.signingUrlSetInfos?.map((info: any) => {
        const [first] = info.signingUrls;
        return first;
      });
      setSigningUrls(urls);
    } catch (err) {
      console.log(err);
    }
  };


  // const checkStatus = async (agreementId: string) => {
  //   try {
  //     // call status api
  //     const url = `${apiAccessPoint}api/rest/v6/agreements/${agreementId}`;
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const jsonResponse = await response.json();
  //     // setSigningStatus(jsonResponse.status);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const adobeSignin = () => {
    try {
      const authUri = `${constants.esignauthshardendpoint}?redirect_uri=${constants.host}/docsign&response_type=code&client_id=${constants.esignauthclientid}&scope=user_login:self+agreement_send:account+agreement_read:account+agreement_write:account`;
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
      if (!code) {
        return;
      }
      const url = `${apiaccesspoint}oauth/token?code=${code}&client_id=${constants.esignauthclientid}&client_secret=${constants.esignauthclientsecret}&redirect_uri=${constants.host}/docsign&grant_type=authorization_code`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.status >= 400) {
        return;
      }
      const jsonResponse = await response.json();
      setAccessToken(jsonResponse.access_token);
      localStorage.setItem("access_token", jsonResponse.access_token as string);
      localStorage.setItem("refresh_token", jsonResponse.refresh_token as string);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const auth_code = new URLSearchParams(window.location.search).get("code");
    const apiaccesspoint = new URLSearchParams(window.location.search).get("api_access_point");

    if (!accessToken) {
      const esign_token = localStorage.getItem("access_token") as string;
      setAccessToken(esign_token as any);
      const esign_api_access_point = localStorage.getItem("api_access_point") as string;
      setApiAccessPoint(esign_api_access_point as any);
      console.log(esign_api_access_point);
      if (auth_code) {
        getAccessToken(apiaccesspoint as string, auth_code as string);
        setApiAccessPoint(apiaccesspoint as any);
        localStorage.setItem("api_access_point", apiaccesspoint as string);
      }
    }
  }, [accessToken, apiAccessPoint]);

  return (
    <div>
      <ContainerBox>
        <Container>
          <br />
          <div className={classes.root}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = { completed: false };
                const labelProps = { optional: <></> };
                if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  {activeStep === 0 && (
                    <div style={{ justifyContent: "center", alignItems: "center", margin: 20, minWidth: 500, minHeight: 300, alignSelf: "center", backgroundColor: "#fff" }}>
                      {!accessToken ? (
                        <div style={{ marginLeft: 500, paddingTop: 100 }}>
                          <CustomBtn onClick={adobeSignin}>
                            <CustomBtnText>Adobe Signin</CustomBtnText>
                          </CustomBtn>
                        </div>
                      ) : (
                        <div style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 32, textAlign: "center", paddingTop: 100 }}>Already sigined in, proceed to next step</div>
                      )}
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div style={{ justifyContent: "center", alignItems: "center", margin: 20, minWidth: 500, minHeight: 300, alignSelf: "center", backgroundColor: "#fff" }}>
                      <div style={{ marginLeft: 100, paddingTop: 20 }}>
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
                      <div style={{ marginLeft: 500, paddingTop: 30 }}>
                        <CustomBtn onClick={createAgreement}>
                          <CustomBtnText>Agreement</CustomBtnText>
                        </CustomBtn>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div style={{ justifyContent: "center", alignItems: "center", margin: 20, minWidth: 500, minHeight: 300, alignSelf: "center", backgroundColor: "#fff" }}>
                      <div style={{ marginLeft: 500, paddingTop: 30 }}>
                        <div style={{display: 'flex', flexDirection: 'column', height: 100, width: 200, marginLeft: 60}}>
                        <input value={docName} onChange={(event: any) => setDocName(event.target.value)} placeholder="document name" style={{margin: 5, height: 50, borderRadius: 5, borderWidth: 0.5}}/>
                        <input type="email" value={participant} onChange={(event: any) => setParticipant(event.target.value)} placeholder="signer email" style={{margin: 5, height: 50, borderRadius: 5, borderWidth: 0.5}} />
                        </div>
                        <CustomBtn onClick={sendAgreement}>
                          <CustomBtnText>Send</CustomBtnText>
                        </CustomBtn>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div style={{ justifyContent: "center", alignItems: "center", margin: 20, minWidth: 500, minHeight: 300, alignSelf: "center", backgroundColor: "#fff" }}>
                      <div style={{ marginLeft: 500, paddingTop: 30 }}>
                        <CustomBtn onClick={getSigningUrl}>
                          <CustomBtnText>Get eSign Urls</CustomBtnText>
                        </CustomBtn>
                        <div style={{ paddingTop: 20 }}>
                          {siginingUrls?.map((e: any, index) => (
                            <div>
                              {index + 1}. {e?.email}, <a href={e?.esignUrl}>esign</a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                    {isStepOptional(activeStep) && (
                      <Button variant="contained" color="primary" onClick={handleSkip} className={classes.button}>
                        Skip
                      </Button>
                    )}

                    <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && <div style={{ fontSize: 32, color: "#000", margin: 20 }}>{error.toString()}</div>}
        </Container>
      </ContainerBox>
    </div>
  );
}

export default DocSignPage;
