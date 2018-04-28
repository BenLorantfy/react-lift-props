
/**
 * @name getDisplayName
 * @description Get's the display name of a component
 * Based off: https://github.com/jurassix/react-display-name/blob/master/src/getDisplayName.js
 * It's copied here so we can have zero dependencies
 */
export const getDisplayName = (Component: any) => (
  Component.displayName ||
  Component.name ||
  (typeof Component === "string" && Component.length > 0
    ? Component
    : "Unknown")
);
