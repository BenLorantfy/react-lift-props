// tslint:disable max-classes-per-file

import React from "react";
import { getDisplayName } from "../../utils";

describe("getDisplayName", () => {
  function NormalFunctionComponent() { return null; }
  const ArrowFunctionComponent = () => null;
  class ClassComponent extends React.Component {}
  class ClassComponentWithDisplayName extends React.Component { public static displayName = "MyCoolDisplayName"; }
  const StringComponent = "my cool string";
  const EmptyStringComponent = "";
  const NotAComponent = 23;

  it("should get unknown for numbers", () => {
    expect(getDisplayName(NotAComponent)).toEqual("Unknown");
  });

  it("should get unknown for empty strings", () => {
    expect(getDisplayName(EmptyStringComponent)).toEqual("Unknown");
  });

  it("should get the display name for strings", () => {
    expect(getDisplayName(StringComponent)).toEqual("my cool string");
  });

  it("should get the display name for normal function components", () => {
    expect(getDisplayName(NormalFunctionComponent)).toEqual("NormalFunctionComponent");
  });

  it("should get the display name for arrow function components", () => {
    expect(getDisplayName(ArrowFunctionComponent)).toEqual("ArrowFunctionComponent");
  });

  it("should get the display name for normal class components", () => {
    expect(getDisplayName(ClassComponent)).toEqual("ClassComponent");
  });

  it("should get the display name for class components with an explicit display name", () => {
    expect(getDisplayName(ClassComponentWithDisplayName)).toEqual("MyCoolDisplayName");
  });
});
