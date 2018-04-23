import React from "react";
import { IAnyObject, ILifterContext } from "./types";
import { getDisplayName } from "./utils";

const LiftPropsContext = React.createContext<ILifterContext>();

export function createLifter<T extends object>() {
  const Lifter = class extends React.PureComponent<{
    contextValue: ILifterContext,
  } & T> { // tslint:disable-line max-classes-per-file
    private componentId = null;

    public componentWillUnmount() {
      this.removeProps();
    }


    public componentDidMount() {
      this.componentId = this.props.contextValue.generateComponentId();
      this.liftProps();
    }

    public componentDidUpdate() {
      this.liftProps();
    }

    public removeProps() {
      if (this.props.contextValue) {
        this.props.contextValue.removeProps(this.componentId);
      }
    }

    public liftProps() {
      const props = { ...(this.props as IAnyObject) };
      delete props.contextValue;

      if (this.props.contextValue) {
        this.props.contextValue.liftProps(this.componentId, props);
      }
    }

    public render() {
      return null;
    }
  };

  const WrappedLifter = class extends React.PureComponent<T> { // tslint:disable-line max-classes-per-file
    public render() {
      return (
        <LiftPropsContext.Consumer>
          {(contextValue) => <Lifter {...(this.props as T)} contextValue={contextValue}/>}
        </LiftPropsContext.Consumer>
      );
    }
  };

  return WrappedLifter;
}

export function withLiftedProps(UnwrappedComponent: React.ComponentClass) {
  const WrappedComponent = class extends React.PureComponent<
    IAnyObject,
    { liftedProps: IAnyObject[] }
  > { // tslint:disable-line max-classes-per-file
    public static displayName = `withLiftedProps(${getDisplayName(UnwrappedComponent)})`;
    public idCounter = 0;
    public liftedProps = [];
    public contextValue: ILifterContext = null;

    constructor(props) {
      super(props);

      this.contextValue = {
        generateComponentId: this.generateComponentId,
        liftProps: this.liftProps,
        removeProps: this.removeProps,
      };
    }

    public generateComponentId = () => {      
      this.idCounter++;
      return this.idCounter;
    }

    public removeProps = (id: number) => {
      const newLiftedProps = this.liftedProps.filter((propsHolder) => propsHolder.id !== id);
      const liftedProps = newLiftedProps.map((propsHolder) => propsHolder.props);

      this.liftedProps = newLiftedProps;
      this.setState({ liftedProps })
    }

    public liftProps = (id: number, props: IAnyObject) => {
      let placed = false;
      const newLiftedProps = this.liftedProps.map((propsHolder) => {
        if (propsHolder.id === id) {
          placed = true;
          return {
            id,
            props,
          };
        }

        return propsHolder;
      });

      if (!placed) {
        newLiftedProps.push({
          id,
          props,
        });
      }

      this.liftedProps = newLiftedProps;
      const liftedProps = this.liftedProps.map((propsHolder) => propsHolder.props);
      this.setState({ liftedProps });
    }

    public render() {
      const props = { ...this.props };
      delete props.children;

      return (
        <LiftPropsContext.Provider value={this.contextValue}>
          {this.props.children}
          {this.state && this.state.liftedProps &&
            <UnwrappedComponent {...props} liftedProps={this.state.liftedProps} />
          }
        </LiftPropsContext.Provider>
      );
    }
  };

  return WrappedComponent;
}
