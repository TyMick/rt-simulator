import React from "react";
import clsx from "clsx";

export default function Subtitle({
  children,
  className,
  style,
  ...otherProps
}) {
  return (
    <div
      className={clsx("h3 text-secondary", className)}
      style={{ marginBottom: "2rem", ...style }}
      {...otherProps}
    >
      {children}
    </div>
  );
}
