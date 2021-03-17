import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header() {
  const authMenus = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home{' '}
            <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/merge">
            Merge
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/split">
            Split
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/delete">
            Delete
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reorder">
            Reorder
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/docsign">
            eSign
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
            Home{' '}
            <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <span className="nav-link active my-2 my-sm-0">
            {/* {user ? user.first_name : ''} */}
          </span>
        </li>
        <li className="nav-item">
          <Link className="nav-link active my-2 my-sm-0" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link active my-2 my-sm-0" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark app-header">
        <Link className="navbar-brand" to="/">
          PDF Operations
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          {true ? authMenus : guestMenus}
          <div className="form-inline my-2 my-lg-0">
            {true ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;