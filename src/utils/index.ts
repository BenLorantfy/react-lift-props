// https://github.com/jurassix/react-display-name/blob/master/src/getDisplayName.js
export const getDisplayName = (Component: any) => (
  Component.displayName ||
  Component.name ||
  (typeof Component === "string" && Component.length > 0
    ? Component
    : "Unknown")
);
