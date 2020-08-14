import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { kebabCase } from "lodash";

export default function IconButton({
  icon,
  tooltip,
  tooltipId,
  tooltipPlacement,
  className,
  style,
  ...otherProps
}) {
  return tooltip ? (
    <OverlayTrigger
      placement={tooltipPlacement}
      overlay={
        <Tooltip
          id={tooltipId || kebabCase(tooltip)}
          style={{ minWidth: "max-content" }}
        >
          {tooltip}
        </Tooltip>
      }
    >
      <Button
        className={clsx("rounded-circle px-0 text-center", className)}
        style={{ width: "2.375rem", ...style }}
        aria-label={tooltip}
        {...otherProps}
      >
        <FontAwesomeIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  ) : (
    <Button
      className={clsx("rounded-circle px-0 text-center", className)}
      style={{ width: "2.375rem", ...style }}
      {...otherProps}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}
