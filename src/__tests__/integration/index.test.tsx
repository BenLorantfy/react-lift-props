/* tslint:disable max-classes-per-file */

import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { createLifter, withLiftedProps } from "../../index";

interface IStepProps {
  name?: string;
  super?: boolean;
  group?: boolean;
  children: any;
}

const testStaticMessage = "my test static that should get hoisted";

const StepGroup = createLifter<IStepProps>({ wrapper: true, extraProps: { group: true } });
const SuperStep = createLifter<IStepProps>({ extraProps: { super: true } });
const Step = createLifter<IStepProps>();
const Stepper = withLiftedProps(class extends React.PureComponent<{ liftedProps: IStepProps[] }> {
  public static testStatic = testStaticMessage;
  public static displayName = "Stepper";
  public render() {
    return <div>
      {this.props.liftedProps.map((props, index) => {
        if (props.group) {
          return <h1 key={props.name}>STEP GROUP</h1>
        }

        return (
          <div key={props.name}>
            {props.super && <h1>SUPER STEP</h1>}
            {!props.super && <h3>{index + 1}. {props.name}</h3>}
            <p>{props.children}</p>
          </div>
        );
      })}
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

  it("should render with super steps", () => {
    wrapper = render(
      <Stepper>
        <SuperStep name="My First Step">
          <span>My first step content</span>
        </SuperStep>
      </Stepper>,
    );

    expect(wrapper.find("h3").length).toEqual(0);
    expect(wrapper.find("h1").length).toEqual(1);
    expect(wrapper.find("h1").text()).toEqual("SUPER STEP");
  });

  it("should render nested lifters", () => {
    wrapper = render(
      <Stepper>
        <StepGroup name="My Step Group">
          <Step name="My First Step">
            <span>My first step content</span>
          </Step>
          <Step name="My Second Step">
            <span>My second step content</span>
          </Step>
        </StepGroup>
        <Step name="My Third Step">
            <span>My third step content</span>
          </Step>
      </Stepper>,
    );

    expect(wrapper.find("h3").length).toEqual(3);
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

  it("should work with multiple steppers", () => {
    const TestHarness = class extends React.PureComponent {
      public render() {
        return (
          <>
            <Stepper>
              <Step name={"step 1"}>
                <span>My first step content</span>
              </Step>
              <Step name={"step 2"}>
                <span>My second step content</span>
              </Step>
            </Stepper>
            <Stepper>
              <Step name={"step 3"}>
                <span>My first step content</span>
              </Step>
              <Step name={"step 4"}>
                <span>My second step content</span>
              </Step>
            </Stepper>
          </>
        );
      }
    };

    wrapper = render(<TestHarness />);

    expect(wrapper.find("h3").length).toEqual(4);
    expect(wrapper.find("h3").at(0).text()).toEqual("1. step 1");
    expect(wrapper.find("h3").at(1).text()).toEqual("2. step 2");
    expect(wrapper.find("h3").at(2).text()).toEqual("1. step 3");
    expect(wrapper.find("h3").at(3).text()).toEqual("2. step 4");
  });

  it("should work with multiple steppers where some steps are encapsulated", () => {
    class EncapsulatedStep extends React.PureComponent {
      public render() {
        return (
          <Step name={"step 3"}>
            <span>My first step content</span>
          </Step>
        );
      }
    }

    const TestHarness = class extends React.PureComponent<{ show?: boolean }> {
      public render() {
        return (
          <>
            <Stepper>
              <Step name={"step 1"}>
                <span>My first step content</span>
              </Step>
              <Step name={"step 2"}>
                <span>My second step content</span>
              </Step>
            </Stepper>
            <Stepper>
              {this.props.show && <EncapsulatedStep />}
              <Step name={"step 4"}>
                <span>My second step content</span>
              </Step>
            </Stepper>
          </>
        );
      }
    };

    wrapper = render(<TestHarness />);
    wrapper.setProps({ show: true });
    wrapper.update();
    expect(wrapper.find("h3").length).toEqual(4);
    expect(wrapper.find("h3").at(0).text()).toEqual("1. step 1");
    expect(wrapper.find("h3").at(1).text()).toEqual("2. step 2");
    expect(wrapper.find("h3").at(2).text()).toEqual("1. step 3");
    expect(wrapper.find("h3").at(3).text()).toEqual("2. step 4");
  });

  it("should hoist statics", () => {
    expect(Stepper.testStatic).toEqual(testStaticMessage);
  });
});
