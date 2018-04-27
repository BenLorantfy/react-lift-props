import React from "react";
import { IAnyObject, ILifterContext } from "./types";
import { getDisplayName } from "./utils";

let LiftPropsContext;
if (React.createContext) {
  LiftPropsContext = React.createContext<ILifterContext>();
} else {
  console.warn("react-lift-props requires React >= 16.3"); // tslint:disable-line no-console
  LiftPropsContext = {};
}

export function createLifter<T extends object>(): React.ComponentClass {
  const Lifter = class extends React.PureComponent<{
    contextValue: ILifterContext,
  } & T> { // tslint:disable-line max-classes-per-file
    private componentId = null;
    constructor(props) {
      super(props);
      this.lifterRef = React.createRef();
    }

    public componentWillUnmount() {
      this.removeProps();
    }

    public componentDidMount() {
      // This is a little hacky, but it's the best way I can think of
      // to determine the index this lifter is in the DOM. It also means this
      // will only work with ReactDOM :(
      if (this.props.contextValue) {
        const domNodes = document.querySelectorAll(".__react-lift-props-lifter__");
        const index = [ ...domNodes ].findIndex((domNode) => domNode === this.lifterRef.current);
        this.componentId = this.props.contextValue.registerComponent(index);
        this.liftProps();
      }
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
      return <div className="__react-lift-props-lifter__" ref={this.lifterRef}></div>;
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

export function withLiftedProps(UnwrappedComponent: React.ComponentClass): React.ComponentClass {
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
        liftProps: this.liftProps,
        registerComponent: this.registerComponent,
        removeProps: this.removeProps,
      };
    }

    public registerComponent = (index: number) => {
      const componentId = this.idCounter = this.idCounter + 1;
      const newLiftedProps = [ ...this.liftedProps ];
      this.liftedProps = this.liftedProps;
      if (newLiftedProps[index]) {
        newLiftedProps.splice(index, 0, { id: componentId });
      } else {
        newLiftedProps.push({ id: componentId });
      }

      this.liftedProps = newLiftedProps;
      return componentId;
    }

    public removeProps = (id: number) => {
      const newLiftedProps = this.liftedProps.filter((propsHolder) => propsHolder.id !== id);
      const liftedProps = newLiftedProps.map((propsHolder) => propsHolder.props);

      this.liftedProps = newLiftedProps;
      this.setState({ liftedProps });
    }

    public liftProps = (id: number, props: IAnyObject) => {
      const newLiftedProps = this.liftedProps.map((propsHolder) => {
        if (propsHolder.id === id) {
          return {
            id,
            props,
          };
        }

        return propsHolder;
      });

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
