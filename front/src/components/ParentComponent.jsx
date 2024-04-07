// ParentComponent.jsx
import React from "react";
import { createBrowserHistory } from "history";
import JoinUs from "./JoinUs";

const history = createBrowserHistory();

function ParentComponent() {
  return <JoinUs history={history} />;
}

export default ParentComponent;
