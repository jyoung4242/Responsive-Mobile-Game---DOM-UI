import { ImageSource } from "excalibur";

type PercentOfParent = number;

export type FlexContainerState = {
  id: string;
  orientation: string;
  sizing: {
    landscape: { w: PercentOfParent; h: PercentOfParent };
    portrait: { w: PercentOfParent; h: PercentOfParent };
    padding?: number | string; // Allow for both numeric (px) and string values (%, em, etc.)
  };
  graphics?: {
    backgroundImage?: ImageSource;
    nineSlice?: {
      borderPadding: {
        top: number;
        left: number;
        right: number;
        bottom: number;
      };
    };
  };
  flexControls: {
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
    alignContent?: "normal" | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch";
    gap?: number | string; // Allow for both numeric (px) and string values (%, em, etc.)
  };
  parentContainerId?: string; // ID of the parent container for positioning
};

export class FlexContainer {
  private _element: HTMLElement | undefined = undefined;
  private _state: FlexContainerState = {
    id: "",
    orientation: "landscape",
    sizing: { landscape: { w: 0, h: 0 }, portrait: { w: 0, h: 0 } },
    flexControls: {},
  };

  public static template = `
    <style>
      #\${_state.id} {
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
        flex-direction: \${_state.flexDirection};
        flex-wrap: \${_state.flexWrap};
        justify-content: \${_state.justifyContent};
        align-items: \${_state.alignItems };
        gap: \${formatCSSDimension.gap};
      }
    </style>
    <div \${==>element} id="\${id}">
       <!-- Content goes here -->
    </div>
  `;

  constructor(state: FlexContainerState) {
    this._state = state;
    setTimeout(() => {
      this.init();
    }, 25);
  }

  init() {
    if (this._state.graphics?.backgroundImage)
      this._element!.style.borderImageSource = `url('${this._state.graphics.backgroundImage}')`;
  }

  updateOrientation(orientation: "landscape" | "portrait") {
    this._state.orientation = orientation;
  }

  static create(containerState: FlexContainerState) {
    console.log("containerState", containerState);
    return new FlexContainer(containerState);
  }

  get dims() {
    let parentDims = document.getElementById(this._state.parentContainerId!);
    let parentWidth = parentDims?.clientWidth || 0;
    let parentHeight = parentDims?.clientHeight || 0;

    if (this._state.orientation === "landscape") {
      let dims = this._state.sizing.landscape;
      // Handle percentage-based dimensions intelligently
      return {
        w: (dims.w / 100) * parentWidth,
        h: (dims.h / 100) * parentHeight,
        padding: this._state.sizing.padding,
        gap: this._state.flexControls.gap,
      };
    } else {
      let dims = this._state.sizing.portrait;
      // Handle percentage-based dimensions intelligently
      return {
        w: (dims.w / 100) * parentWidth,
        h: (dims.h / 100) * parentHeight,
        padding: this._state.sizing.padding,
        gap: this._state.flexControls.gap,
      };
    }
  }

  get borderSlice() {
    return {
      overall: Math.max(
        this._state.graphics!.nineSlice?.borderPadding.top || 0,
        this._state.graphics!.nineSlice?.borderPadding.left || 0,
        this._state.graphics!.nineSlice?.borderPadding.right || 0,
        this._state.graphics!.nineSlice?.borderPadding.bottom || 0
      ),
      top: this._state.graphics!.nineSlice?.borderPadding.top || 0,
      left: this._state.graphics!.nineSlice?.borderPadding.left || 0,
      right: this._state.graphics!.nineSlice?.borderPadding.right || 0,
      bottom: this._state.graphics!.nineSlice?.borderPadding.bottom || 0,
    };
  }
}
