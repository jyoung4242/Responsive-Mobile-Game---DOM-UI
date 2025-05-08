import { ImageSource } from "excalibur";
import { FlexChildButton, FlexChildButtonState } from "./FlexChildButton";
import { Resources } from "../src/resources";

export type SizeUnit = number | string; // Allow for both numeric (px) and string values (%, vh, vw, etc.)
export type PositionUnit = number | string; // Allow for both numeric (px) and string values (%, vh, vw, etc.)

export type FlexContainerState = {
  id: string;
  orientation: string;
  responsiveLayoutData: {
    landscape: { w: SizeUnit; h: SizeUnit; left: PositionUnit; top: PositionUnit };
    portrait: { w: SizeUnit; h: SizeUnit; left: PositionUnit; top: PositionUnit };
  };
  backgroundImage: ImageSource;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  alignContent?: "normal" | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch";
  gap?: number | string; // Allow for both numeric (px) and string values (%, em, etc.)
  padding?: number | string; // Allow for both numeric (px) and string values (%, em, etc.)
  nineSlice?: {
    borderPadding: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    };
  };
};

export class FlexContainer {
  orientation = "landscape";
  id: string = "";
  backgroundImage: string = "";
  element: HTMLElement | undefined = undefined;
  contentElement: HTMLElement | undefined = undefined;
  state: any;

  responsiveLayoutData: {
    landscape: { w: SizeUnit; h: SizeUnit; left: PositionUnit; top: PositionUnit };
    portrait: { w: SizeUnit; h: SizeUnit; left: PositionUnit; top: PositionUnit };
  } = {
    landscape: { w: 0, h: 0, left: 0, top: 0 },
    portrait: { w: 0, h: 0, left: 0, top: 0 },
  };

  FlexButton = FlexChildButton;

  flexButton1State: FlexChildButtonState = {
    id: "flexButton1",
    orientation: "landscape",
    responsiveLayoutData: {
      landscape: { w: 196, h: 32 },
      portrait: { w: 196, h: 32 },
    },
    upImage: Resources.greenButtonUp,
    downImage: Resources.greenButtonDown,
    text: "Button 1",
    fontSize: "2vw",
    fontColor: "white",
    clickCallback: () => {
      console.log("Button 1 clicked");
    },
    nineSliceUp: {
      borderPadding: {
        top: 8,
        left: 4,
        right: 4,
        bottom: 4,
      },
    },
    nineSliceDown: {
      borderPadding: {
        top: 8,
        left: 4,
        right: 4,
        bottom: 4,
      },
    },
  };
  flexButton2State: FlexChildButtonState = {
    id: "flexButton2",
    orientation: "landscape",
    responsiveLayoutData: {
      landscape: { w: 196, h: 32 },
      portrait: { w: 196, h: 32 },
    },
    upImage: Resources.greenButtonUp,
    downImage: Resources.greenButtonDown,
    text: "Button 2",
    fontSize: "2vw",
    fontColor: "white",
    clickCallback: () => {
      console.log("Button 2 clicked");
    },
    nineSliceUp: {
      borderPadding: {
        top: 8,
        left: 4,
        right: 4,
        bottom: 4,
      },
    },
    nineSliceDown: {
      borderPadding: {
        top: 8,
        left: 4,
        right: 4,
        bottom: 4,
      },
    },
  };
  flexButton3State: FlexChildButtonState = {
    id: "flexButton3",
    orientation: "landscape",
    responsiveLayoutData: {
      landscape: { w: 196, h: 32 },
      portrait: { w: 196, h: 32 },
    },
    upImage: Resources.greenButtonUp,
    downImage: Resources.greenButtonDown,
    text: "Button 3",
    fontSize: "2vw",
    fontColor: "white",
    clickCallback: () => {
      console.log("Button 3 clicked");
    },
    nineSliceUp: {
      borderPadding: {
        top: 8,
        left: 4,
        right: 4,
        bottom: 4,
      },
    },
    nineSliceDown: {
      borderPadding: {
        top: 8,
        left: 4,
        right: 4,
        bottom: 4,
      },
    },
  };

  public static template = `
    <style>
      #\${id} {
        position: absolute;
        top: \${formatCSSDimension.top};
        left: \${formatCSSDimension.left};
        width: \${formatCSSDimension.w};
        height: \${formatCSSDimension.h};
        
        image-rendering: pixelated;
        box-sizing: border-box;
        padding: \${formatCSSDimension.padding};
        border:\${borderSlice.overall}px solid transparent;
        border-image-slice: \${borderSlice.top} \${borderSlice.right} \${borderSlice.bottom} \${borderSlice.left} fill;
        border-image-width: \${borderSlice.top}px \${borderSlice.right}px \${borderSlice.bottom}px \${borderSlice.left}px;
        border-image-repeat: stretch;
        border-image-outset: 0;
        display: flex;
        flex-direction: \${state.flexDirection};
        flex-wrap: \${state.flexWrap};
        justify-content: \${state.justifyContent};
        align-items: \${state.alignItems };
        gap: \${formatCSSDimension.gap};
      }
      
    </style>
    <div \${==>element} id="\${id}">
       <\${FlexButton === flexButton1State}> 
       <\${FlexButton === flexButton2State}> 
       <\${FlexButton === flexButton3State}> 
    </div>
  `;

  constructor(state: FlexContainerState) {
    this.state = state;
    this.id = state.id;
    this.responsiveLayoutData = state.responsiveLayoutData;
    this.backgroundImage = (state.backgroundImage as ImageSource).path;

    setTimeout(() => {
      this.init();
    }, 25);
  }

  init() {
    this.element!.style.borderImageSource = `url('${this.backgroundImage}')`;
  }

  static create(containerState: FlexContainerState) {
    console.log("containerState", containerState);
    return new FlexContainer(containerState);
  }

  get dims() {
    this.orientation = this.state.orientation;

    if (this.orientation === "landscape") {
      let dims = this.state.responsiveLayoutData.landscape;
      // Handle percentage-based dimensions intelligently
      return {
        w: dims.w,
        h: dims.h,
        left: dims.left,
        top: dims.top,
      };
    } else {
      let dims = this.state.responsiveLayoutData.portrait;
      // Handle percentage-based dimensions intelligently
      return {
        w: dims.w,
        h: dims.h,
        left: dims.left,
        top: dims.top,
      };
    }
  }

  // Static helper method to format dimension values with appropriate units for CSS
  static formatCssDimension(value: number | string | undefined): string {
    if (value === undefined) return "0";

    if (typeof value === "number") {
      return `${value}px`;
    }

    // If it's already a string with units (%, vh, vw, etc.), return as is
    return value;
  }

  get formatCSSDimension() {
    return {
      w: FlexContainer.formatCssDimension(this.dims.w),
      h: FlexContainer.formatCssDimension(this.dims.h),
      left: FlexContainer.formatCssDimension(this.dims.left),
      top: FlexContainer.formatCssDimension(this.dims.top),
      padding: FlexContainer.formatCssDimension(this.state.padding || 0),
      gap: FlexContainer.formatCssDimension(this.state.gap || 0),
    };
  }

  get borderSlice() {
    return {
      overall: Math.max(
        this.state.nineSlice?.borderPadding.top || 0,
        this.state.nineSlice?.borderPadding.left || 0,
        this.state.nineSlice?.borderPadding.right || 0,
        this.state.nineSlice?.borderPadding.bottom || 0
      ),
      top: this.state.nineSlice?.borderPadding.top || 0,
      left: this.state.nineSlice?.borderPadding.left || 0,
      right: this.state.nineSlice?.borderPadding.right || 0,
      bottom: this.state.nineSlice?.borderPadding.bottom || 0,
    };
  }

  // Method to add a child component to the flex container
  addChild(childElement: HTMLElement) {
    this.contentElement?.appendChild(childElement);
  }

  // Method to remove a child component from the flex container
  removeChild(childElement: HTMLElement) {
    this.contentElement?.removeChild(childElement);
  }

  // Method to clear all child components
  clearChildren() {
    if (this.contentElement) {
      while (this.contentElement.firstChild) {
        this.contentElement.removeChild(this.contentElement.firstChild);
      }
    }
  }
}
