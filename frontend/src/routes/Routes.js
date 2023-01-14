import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import OurTeam from "../pages/OurTeam";
import Publications from "../pages/Publications";
import PPIPredictionIntro from "../pages/PPIPredictionIntro";
import ViralInfectionPredictionIntro from "../pages/ViralInfectionPredictionIntro";
//import VirusesHost from "../pages/VirusesHost";
import VirusTableLauncher from "../pages/VirusTableLauncher";
import NotFound from "../pages/NotFound";
import PPIPrediction from "../pages/PPIPrediction";
import ViralInfectionPrediction from "../pages/ViralInfectionPrediction";
import ViralInfectionResult from "../pages/ViralInfectionResult";
import PpiPredictionResult from "../pages/PpiPredictionResult";

const VirusesHost = React.lazy(() => import("../pages/VirusesHost"));

export const Routes = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/team">
          <OurTeam />
        </Route>
        <Route path="/publications">
          <Publications />
        </Route>
        <Route path="/viruses-and-hosts-launcher" exact>
          <VirusTableLauncher />
        </Route>
        <Route path="/viruses-and-hosts/:virusfamily">
          <VirusesHost />
        </Route>
        <Route path="/ppi-predictor-intro" exact>
          <PPIPredictionIntro />
        </Route>
        <Route path="/ppi-predictor" exact>
          <PPIPrediction />
        </Route>
        <Route path="/viral-infection-predictor-intro" exact>
          <ViralInfectionPredictionIntro />
        </Route>
        <Route path="/viral-infection-predictor" exact>
          <ViralInfectionPrediction />
        </Route>
        <Route path="/ppi-predictor-result" exact>
          <PpiPredictionResult />
        </Route>
        <Route path="/viral-infection-predictor-result" exact>
          <ViralInfectionResult />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
