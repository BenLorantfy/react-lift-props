export interface IAnyObject {
  [key: string]: any;
}

export interface ILifterContext {
  generateComponentId: () => number;
  liftProps: (componentId: number, props: IAnyObject) => void;
  removeProps: (componentId: number) => void;
}
