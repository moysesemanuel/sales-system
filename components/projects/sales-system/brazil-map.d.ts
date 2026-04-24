import type * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "brazil-component": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "hidden-states"?: boolean;
        static?: boolean;
      };
    }
  }
}

export {};
