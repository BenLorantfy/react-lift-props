import React from "react";
import { ILifterContext } from "./types";

let LiftPropsContext: React.Context<ILifterContext>;
if (React.createContext) {
  LiftPropsContext = React.createContext<ILifterContext>() as React.Context<ILifterContext>;
} else {
  console.warn("react-lift-props requires React >= 16.3"); // tslint:disable-line no-console
  LiftPropsContext = {} as React.Context<ILifterContext>;
}

export default LiftPropsContext;
