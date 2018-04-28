import React from "react";
import LiftPropsContext from "./context";
import { IAnyObject, ILifterContext, IPropHolder } from "./types";
import { getDisplayName } from "./utils";

export interface ICreateLifterOptions {
  displayName?: string;
}

export function createLifter<T extends object>(options: ICreateLifterOptions = {}): React.ComponentClass<T> {
  type Props = {
    contextValue: ILifterContext,
  } & T;

  const Lifter = class extends React.PureComponent<Props> { // tslint:disable-line max-classes-per-file
    public static displayName = "Lifter";
    private componentId: number;
    private lifterRef: React.RefObject<null>;
    constructor(props: Props) {
      super(props);
      this.componentId = -1;
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
      }

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
      return <div className="__react-lift-props-lifter__" ref={this.lifterRef}></div>;
    }
  };

  const WrappedLifter = class extends React.PureComponent<T> { // tslint:disable-line max-classes-per-file
    public static displayName = options.displayName || "Wrapped(Lifter)";
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

export type UnwrappedComponent = React.ComponentClass<IAnyObject & { liftedProps: IAnyObject[] }>;
export function withLiftedProps(component: UnwrappedComponent): React.ComponentClass {
  const WrappedComponent = class extends React.PureComponent<
    IAnyObject,
    { liftedProps: IAnyObject[] }
  > { // tslint:disable-line max-classes-per-file
    public static displayName = `withLiftedProps(${getDisplayName(component)})`;
    public idCounter = 0;
    public liftedProps: IPropHolder[] = [];
    public contextValue: ILifterContext;

    constructor(props: IAnyObject) {
      super(props);

      this.contextValue = {
        liftProps: this.liftProps,
        registerComponent: this.registerComponent,
        removeProps: this.removeProps,
      };
    }

    public registerComponent = (index: number) => {
      const componentId = this.idCounter = this.idCounter + 1;
      const newLiftedProps: IPropHolder[] = [ ...this.liftedProps ];

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
      this.liftedProps = newLiftedProps;
      this.updateLiftedProps();
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
      this.updateLiftedProps();
    }

    public updateLiftedProps() {
      const liftedProps = this.liftedProps
        .map((propsHolder) => propsHolder.props)
        .filter(Boolean) as IAnyObject[];

      this.setState({ liftedProps });
    }

    public render() {
      const props = { ...this.props };
      delete props.children;

      return (
        <LiftPropsContext.Provider value={this.contextValue}>
          {this.props.children}
          {this.state && this.state.liftedProps &&
            React.createElement(component, { ...props, liftedProps: this.state.liftedProps })
          }
        </LiftPropsContext.Provider>
      );
    }
  };

  return WrappedComponent;
}
