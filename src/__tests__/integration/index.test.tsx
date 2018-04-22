import { mount } from "enzyme";
import React from "react";
import { createLifter, withLiftedProps } from "../../index";

describe("react-lift-props", () => {
  it("should render", () => {
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

    const wrapper = mount(
      <Stepper>
        <Step name="My First Step">
          <span>My first step content</span>
        </Step>
      </Stepper>,
    );

    // This fails, waiting on release from enzyme
    // https://github.com/airbnb/enzyme/pull/1513
    expect(wrapper.find("h3").length).toEqual(1);
  });
});
