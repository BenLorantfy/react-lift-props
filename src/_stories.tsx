import React from "react";

/** Storybook * */
import { storiesOf } from "@storybook/react";
import { createLifter, withLiftedProps } from "./index";

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

const EncapsulatedStep = () => {
  return (
    <Step name="my encapsulted step">
      <span>wow cool</span>
    </Step>
  );
};

/** Stories * */
storiesOf("Stepper", module)
  .add("default", () => (
    <Stepper>
      <Step name="my first step">
        def
      </Step>
      <Step name="my second step">
        abc
      </Step>
      <EncapsulatedStep />
    </Stepper>
  ));
