import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./index.css";
import HomePage from "../HomePage";
import LoginPage from "../Auth/LoginPage";
import MergePage from "../Pdf/MergePage";
import SplitPage from "../Pdf/SplitPage";
import DeletePage from "../Pdf/DeletePage";
import ReoderPage from "../Pdf/ReoderPage";
import DocSignPage from "../Pdf/DocSignPage";
import NotFoundPage from "../NotFoundPage";
import Header from "../../components/Header";


const AppWrapper = styled.div`
  // max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 1px;
  flex-direction: column;
`;
export function App() {
  return (
    <AppWrapper>
      <Router>
        {/* <Header {...headerProps} /> */}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/merge" component={MergePage} />
          <Route exact path="/split" component={SplitPage} />
          <Route exact path="/delete" component={DeletePage} />
          <Route exact path="/reorder" component={ReoderPage} />
          <Route exact path="/docsign" component={DocSignPage} />
          {/* <PrivateRoute path="/profile" component={UserProfilePage} /> */}
          <Route path="/login" component={LoginPage} />
        {/* <Route path="/logout" component={LogoutPage} /> */}
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Router>
    </AppWrapper>
  );
}

export default App;
