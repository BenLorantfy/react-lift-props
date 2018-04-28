import React from "react";
import sinon, { SinonSpy } from "sinon";

const createContext = React.createContext;
describe("context", () => {
  beforeEach(() => {
    sinon.stub(console, "warn");
  });

  afterEach(() => {
    if (React.createContext === null) {
      React.createContext = createContext;
    }

    if ((console.warn as SinonSpy).restore) {
      (console.warn as SinonSpy).restore();
    }
  });

  it("should gracefully fail for React < 16.3", () => {
    // Set the `createContext` method to null to simulate versions of React that don't
    // support the new context api
    (React as { createContext: any }).createContext = null;
    const LiftPropsContext = require("../../context").default;
    expect((console.warn as SinonSpy).getCalls()[0].args).toEqual(["react-lift-props requires React >= 16.3"]);
    expect(LiftPropsContext).toEqual({});
  });
});
