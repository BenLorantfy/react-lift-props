declare module "react-lift-props" {
  export function createLifter<T extends object>(options?: { displayName?: string }): React.ComponentClass<T>;
  export function withLiftedProps<T extends object>(component: React.ComponentClass<T>): React.ComponentClass<T>;
}