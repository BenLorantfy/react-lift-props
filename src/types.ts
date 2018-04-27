export interface IAnyObject {
  [key: string]: any;
}

export interface ILifterContext {
  registerComponent: (index: number) => number;
  liftProps: (componentId: number, props: IAnyObject) => void;
  removeProps: (componentId: number) => void;
}

export interface IPropHolder {
  id: number;
  props?: IAnyObject;
}
