declare module "react-lift-props" {
  export interface ICreateLifterOptions {
    displayName?: string;
    wrapper?: boolean;
    extraProps?: {
      [key: string]: any;
    };
  }

  export function createLifter<T extends object>(options?: ICreateLifterOptions): React.ComponentClass<T>;
  export function withLiftedProps<T extends object>(component: React.ComponentClass<T>): React.ComponentClass<T>;
}