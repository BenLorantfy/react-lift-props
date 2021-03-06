/* tslint:disable max-classes-per-file */

import React from "react";

/** Storybook * */
import { storiesOf } from "@storybook/react";
import { createLifter, withLiftedProps } from "./index";

interface IStepProps {
  name: string;
  children: any;
}

const Step = createLifter<IStepProps>({ displayName: "Step" });
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

class DynamicStep extends React.PureComponent<{}, { counter: number }> {
  public state = { counter: 0 };

  public componentWillMount() {
    setInterval(() => {
      this.setState((state) => ({ counter: state.counter + 1 }));
    }, 5000);
  }

  public render() {
    return (
      <Step name={`This counter should increase every 4 seconds: ${this.state.counter}`}>
        <span>This shows you can change the step properties</span>
      </Step>
    );
  }
}

class ToggleStep extends React.PureComponent {
  public state = { show: true };

  public componentWillMount() {
    setInterval(() => {
      this.setState((state) => ({ show: !this.state.show }));
    }, 2000);
  }

  public render() {
    if (this.state.show) {
      return (
        <Step name="This step should appear and disapear every 2 seconds">
          <span>This shows you can mount and unmount steps</span>
        </Step>
      );
    }

    return null;
  }
}

class Step2 extends React.PureComponent {
  public render() {
    return (
      <Step name="My second step">
        <span>This is the second step. It shows you can encapsulate steps within other components</span>
      </Step>
    );
  }
}

/** Stories * */
storiesOf("Stepper", module)
  .add("default", () => (
    <Stepper>
      <Step name="My first step">
        This is the first step. This shows the regular way of using steps.
      </Step>
      <Step2 />
      <DynamicStep />
      <ToggleStep />
      <Step name="Last step">
        Last step
      </Step>
    </Stepper>
  ));
