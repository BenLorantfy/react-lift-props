/* tslint:disable max-classes-per-file */

import { mount, ReactWrapper } from "@benlorantfy/enzyme";
import React from "react";
import { createLifter, withLiftedProps } from "../../index";

interface IStepProps {
  name: string;
  children: any;
}

const testStaticMessage = "my test static that should get hoisted";
const Step = createLifter<IStepProps>();
const Stepper = withLiftedProps(class extends React.PureComponent<{ liftedProps: IStepProps[] }> {
  public static testStatic = testStaticMessage;
  public static displayName = "Stepper";
  public render() {
    return <div>
      {this.props.liftedProps.map((props, index) => (
        <div key={props.name}>
          <h3>{index + 1}. {props.name}</h3>
          <p>{props.children}</p>
        </div>
      ))}
    </div>;
  }
});

const render = (component: React.ReactElement<any>) =>
  mount(component, {
    attachTo: document.getElementById("app"),
  });

describe("react-lift-props", () => {
  let wrapper: ReactWrapper;
  afterEach(() => {
    if (wrapper) {
      wrapper.detach();
    }
  });

  it("should render", () => {
    wrapper = render(
      <Stepper>
        <Step name="My First Step">
          <span>My first step content</span>
        </Step>
      </Stepper>,
    );

    expect(wrapper.find("h3").length).toEqual(1);
    expect(wrapper.find("h3").text()).toEqual("1. My First Step");
  });

  it("should gracefully handle not being wrapped in Stepper", () => {
    const TestHarness = class extends React.PureComponent<{ name: string}> {
      public render() {
        return (
          <Step name={this.props.name}>
            <span>My first step content</span>
          </Step>
        );
      }
    };

    wrapper = render(<TestHarness name={"My first step"}/>);
    expect(wrapper.find("h3").length).toEqual(0);
  });

  it("should update the h3 text when the Step prop updates", () => {
    const TestHarness = class extends React.PureComponent<{ name: string}> {
      public render() {
        return (
          <Stepper>
            <Step name={this.props.name}>
              <span>My first step content</span>
            </Step>
          </Stepper>
        );
      }
    };

    wrapper = render(<TestHarness name={"My first step"}/>);

    wrapper.setProps({ name: "Name Change" });
    wrapper.update();

    expect(wrapper.find("h3").length).toEqual(1);
    expect(wrapper.find("h3").text()).toEqual("1. Name Change");
  });

  it("should remove the h3 when the Step is removed", () => {
    const TestHarness = class extends React.PureComponent<{ name: string, show: boolean }> {
      public render() {
        return (
          <Stepper>
            {this.props.show &&
              <Step name={this.props.name}>
                <span>My first step content</span>
              </Step>
            }
          </Stepper>
        );
      }
    };

    wrapper = render(<TestHarness name={"My first step"} show />);

    expect(wrapper.find("h3").length).toEqual(1);
    expect(wrapper.find("h3").text()).toEqual("1. My first step");

    wrapper.setProps({ show: false });
    wrapper.update();

    expect(wrapper.find("h3").length).toEqual(0);
  });

  it("should update the h3 when the first step is replaced with a different step", () => {
    const TestHarness = class extends React.PureComponent<{ show: boolean }> {
      public render() {
        return (
          <Stepper>
            {this.props.show &&
              <Step name={"My first step"} key="first step">
                <span>My first step content</span>
              </Step>
            }
            <Step name={"My second step"} key="second step">
              <span>My second step content</span>
            </Step>
          </Stepper>
        );
      }
    };

    wrapper = render(<TestHarness show={false} />);

    expect(wrapper.find("h3").length).toEqual(1);
    expect(wrapper.find("h3").text()).toEqual("1. My second step");
    wrapper.setProps({ show: true });
    wrapper.update();

    expect(wrapper.find("h3").length).toEqual(2);
    expect(wrapper.find("h3").at(0).text()).toEqual("1. My first step");
    expect(wrapper.find("h3").at(1).text()).toEqual("2. My second step");
  });

  it("should hoist statics", () => {
    expect(Stepper.testStatic).toEqual(testStaticMessage);
  });
});
