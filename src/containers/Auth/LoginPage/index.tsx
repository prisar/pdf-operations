import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
  position: absolute;
  left: 37.5%;
  right: 37.5%;
  top: 64.08%;
  bottom: 24.65%;

  background: #000000;
  border-radius: 5px;
  cursor: pointer;
`;

const CustomBtnText = styled.div`
  position: absolute;
  height: 22px;
  left: 25px;
  right: 24px;
  top: calc(50% - 22px / 2);

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;

const EmailInput = styled.input`
  position: absolute;
  left: 37.5%;
  right: 37.5%;
  top: 34.51%;
  bottom: 54.23%;
`;

const EmailPlaceholder = styled.div`
  position: absolute;
  left: 39.24%;
  right: 57.36%;
  top: 38.03%;
  bottom: 56.87%;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  /* identical to box height */

  color: rgba(0, 0, 0, 0.5);
`;

const PasswordInput = styled.input`
  position: absolute;
  left: 37.5%;
  right: 37.5%;
  top: 48.59%;
  bottom: 40.14%;
`;

const PasswordPlaceholder = styled.div`
  position: absolute;
  left: 39.24%;
  right: 54.65%;
  top: 51.94%;
  bottom: 42.96%;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  /* identical to box height */

  color: rgba(0, 0, 0, 0.5);
`;

export function LoginPage() {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [error, setError] = React.useState("");
  const history = useHistory();

  const onSubmitForm = async () => {
    try {
      const data = {
        username,
        password,
      };
      console.log(data);
      const url = `${constants.backend}/api/v1/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const user = await response.json();
        localStorage.setItem("@user", JSON.stringify(user.user));
        history.push("/");
      } else {
        setError("Login error");
      }
    } catch (err) {
      setError(err);
    }
  };

  const onChangeUsername = (event: any) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  React.useEffect(() => {
  }, [username, password]);

  return (
    <div>
      <ContainerBox>
        <Container>
          {/* <Title>Login</Title> */}
          <EmailInput type="text" onChange={onChangeUsername}></EmailInput>
          {!username && <EmailPlaceholder>email</EmailPlaceholder>}
          <PasswordInput type="password" onChange={onChangePassword}></PasswordInput>
          {!password && <PasswordPlaceholder>password</PasswordPlaceholder>}

          <CustomBtn onClick={onSubmitForm}>
            <CustomBtnText>Login</CustomBtnText>
          </CustomBtn>

          {error && <div style={{ fontSize: 18, color: "#000", margin: 20, position: "absolute", left: "39.24%", right: "54.65%", top: "71.94%" }}>{error.toString()}</div>}
        </Container>
      </ContainerBox>
    </div>
  );
}

export default LoginPage;
