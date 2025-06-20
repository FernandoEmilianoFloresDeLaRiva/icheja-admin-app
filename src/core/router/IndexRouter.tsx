import { Route, Router, Switch } from "wouter";
import ProfileViews from "../../pages/Profile/views/ProfileView";

function IndexRouter() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={ProfileViews} />
        <Route path={"*"} component={ProfileViews} />
      </Switch>
    </Router>
  );
}

export default IndexRouter;
