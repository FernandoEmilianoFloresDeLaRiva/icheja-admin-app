import { Route, Router, Switch } from "wouter";
import ProfileViews from "../../pages/Profile/views/ProfileView";
import StudentRegisterViews from "../../pages/RegisterStudent/views/StudentRegisterViews";

function IndexRouter() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={ProfileViews} />
        <Route path={"/profile"} component={ProfileViews} />
        <Route path={"/register-student"} component={StudentRegisterViews} />
        <Route path={"/exercises"} component={() => <div className="p-8">Página de Ejercicios</div>} />
        <Route path={"/progress"} component={() => <div className="p-8">Página de Progreso</div>} />
        <Route path={"/backpack"} component={() => <div className="p-8">Página de Mochila</div>} />
        <Route path={"*"} component={() => <div className="p-8">Página no encontrada</div>} />
      </Switch>
    </Router>
  );
}

export default IndexRouter;
