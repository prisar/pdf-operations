import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

import "./index.css";

const AuthButton = styled.div`
  position: absolute;
  left: 87.5%;
  right: 2.78%;
  top: 18.75%;
  bottom: 18.75%;
`;
const AuthButtonBg = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
`;
const AuthButtonTxt = styled.div`
  position: absolute;
  height: 25px;
  left: 17px;
  right: 16px;
  top: calc(50% - 25px / 2 + 0.5px);

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height */
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

function Header() {
  const [user, setUser] = React.useState(null);
  const history = useHistory();

  const login = () => {
    history.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("@user");
    setUser(null);
    history.push("/login");
  };

  const authMenus = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <div className="link-text">Home </div>
            {/* <span className="sr-only">(current)</span> */}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/merge">
            <div className="link-text">Merge</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/split">
            <div className="link-text">Split</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/delete">
            <div className="link-text">Delete</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reorder">
            <div className="link-text">Reorder</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/docsign">
            <div className="link-text">eSign</div>
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const guestMenus = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <div className="link-text">Home </div>
            {/* <span className="sr-only">(current)</span> */}
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/about">
            <div className="link-text">About</div>
          </Link>
        </li> */}
      </ul>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <span className="nav-link active my-2 my-sm-0">{/* {user ? user.first_name : ''} */}</span>
        </li>
        <li className="nav-item">
          {/* <Link className="nav-link active my-2 my-sm-0" to="/login">
            <div className="link-text">Logout</div>
          </Link> */}
          <AuthButton onClick={logout}>
            <AuthButtonBg>
              <AuthButtonTxt>Logout</AuthButtonTxt>
            </AuthButtonBg>
          </AuthButton>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <AuthButton onClick={login}>
            <AuthButtonBg>
              <AuthButtonTxt>Login</AuthButtonTxt>
            </AuthButtonBg>
          </AuthButton>
        </li>
      </ul>
    </Fragment>
  );

  const checkUser = () => {
    const loggedInuser = localStorage.getItem("@user");
    if (loggedInuser) {
      setUser(JSON.parse(loggedInuser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("user");
      checkUser();
    }

    history.listen((location: any, action: any) => {
      console.log(action, location.pathname, location.state);
      if (!user) {
        console.log("user");
        checkUser();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark app-header">
        <Link className="navbar-brand" to="/">
          <div className="app-name">PDF Operations</div>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          {user ? authMenus : guestMenus}
          <div className="form-inline my-2 my-lg-0">{user ? authLinks : guestLinks}</div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Header);
