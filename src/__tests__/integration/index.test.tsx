import { mount } from "@benlorantfy/enzyme";
import React from "react";
import { createLifter, withLiftedProps } from "../../index";

interface IStepProps {
  name: string;
  children: any;
}

const Step = createLifter<IStepProps>();
const Stepper = withLiftedProps(class extends React.PureComponent<{ liftedProps: IStepProps[] }> {
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

describe("react-lift-props", () => {
  it("should render", () => {
    const wrapper = mount(
      <Stepper>
        <Step name="My First Step">
          <span>My first step content</span>
        </Step>
      </Stepper>,
    );

    expect(wrapper.find("h3").length).toEqual(1);
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

    const wrapper = mount(<TestHarness name={"My first step"}/>);

    wrapper.setProps({ name: "Name Change" });
    wrapper.update();

    expect(wrapper.find("h3").text()).toEqual("1. Name Change");
  });
});
