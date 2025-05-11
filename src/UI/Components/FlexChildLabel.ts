import { ImageSource } from "excalibur";
import { Signal } from "../../Lib/Signals";

type PercentOfParent = number;

export type FlexChildEndPointPercentagedLabelState = {
  id: string;
  orientation: string;
  sizing: {
    landscape: { w: PercentOfParent; h: PercentOfParent };
    portrait: { w: PercentOfParent; h: PercentOfParent };
    padding: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    };
  };
  graphics?: {
    image?: ImageSource;
    nineSlice?: {
      borderPadding: {
        top: number;
        left: number;
        right: number;
        bottom: number;
      };
    };
  };
  text?: string;
  fontDetails?: {
    fontSize?: string | number; // Allow for custom font sizes
    maxFont?: number;
    minFont?: number;
    fontScale?: number;
    fontColor?: string; // Allow for custom font colors
  };
  parentContainerId: string; // ID of the parent container for positioning
};

export class FlexChildLabel {
  resizeSignal = new Signal("resize");
  private _textElement: HTMLElement | undefined = undefined;
  private _element: HTMLButtonElement | undefined = undefined;
  private _state: FlexChildEndPointPercentagedLabelState;

  public static template = `
        <style>
            #\${_state.id} {
                all: unset; 
                width: \${dims.w}px;
                height: \${dims.h}px;
                image-rendering: pixelated;
      touch-action: manipulation;
                background-color: transparent;
                padding: \${dims.padding.top}px \${dims.padding.right}px \${dims.padding.bottom}px \${dims.padding.left}px;
                text-align: center;
                font-family: PixelArtFont;
                user-select: none;
                border:\${.borderSlice.overall}px solid transparent;
                border-image-slice: \${.borderSlice.top} \${.borderSlice.right} \${.borderSlice.bottom} \${.borderSlice.left} fill;
                border-image-width: \${.borderSlice.top}px \${.borderSlice.right}px \${.borderSlice.bottom}px \${.borderSlice.left}px;
                border-image-repeat: stretch;
                border-image-outset: 0;
                appearance: none;
                
            }
            #\${_state.id} > span {
                display: block;
                color: \${_state.fontDetails.fontColor};
                font-size: \${_state.fontDetails.fontScale}em; 
                width: 100%;
            }
        </style>
        <div \${==>_element} id="\${_state.id}">
          <span \${==>_textElement} >\${_state.text} </span>
        </div>
    `;

  constructor(state: FlexChildEndPointPercentagedLabelState) {
    this._state = state;
    if (!state.fontDetails?.fontColor) {
      this._state!.fontDetails!.fontColor = "white"; // Default color if not provided
    }

    this.resizeSignal.listen((params: CustomEvent) => {
      let orientation = params.detail.params[0];
      this._state.orientation = orientation;
    });

    setTimeout(() => {
      this.init();
    }, 25);
  }

  init() {
    if (this._state && this._state.graphics?.image) {
      this._element!.style.borderImageSource = `url('${this._state.graphics.image.path}')`;
    }
  }

  static create(config: FlexChildEndPointPercentagedLabelState) {
    return new FlexChildLabel(config);
  }

  get dims() {
    // Get the parent container dimensions
    const parentContainer = document.getElementById(this._state.parentContainerId);
    if (!parentContainer) {
      throw new Error(`Parent container with ID ${this._state.parentContainerId} not found.`);
    }
    const parentWidth = parentContainer.clientWidth;
    const parentHeight = parentContainer.clientHeight;

    this._state.orientation = this._state.orientation;
    // Handle percentage-based dimensions intelligently

    if (this._state.orientation === "landscape") {
      let dimwidth = (this._state.sizing.landscape.w / 100) * parentWidth;
      let dimheight = (this._state.sizing.landscape.h / 100) * parentHeight;
      return {
        w: dimwidth,
        h: dimheight,
        padding: this._state.sizing.padding,
      };
    } else {
      let dimwidth = (this._state.sizing.portrait.w / 100) * parentWidth;
      let dimheight = (this._state.sizing.portrait.h / 100) * parentHeight;
      return {
        w: dimwidth,
        h: dimheight,
        padding: this._state.sizing.padding,
      };
    }
  }

  get borderSlice() {
    if (!this._state.graphics || !this._state.graphics.nineSlice) return;

    let largestBorder = Math.max(
      this._state.graphics.nineSlice.borderPadding.top || 0,
      this._state.graphics.nineSlice.borderPadding.left || 0,
      this._state.graphics.nineSlice.borderPadding.right || 0,
      this._state.graphics.nineSlice.borderPadding.bottom || 0
    );

    return {
      overall: largestBorder,
      top: this._state.graphics.nineSlice.borderPadding.top || 0,
      left: this._state.graphics.nineSlice.borderPadding.left || 0,
      right: this._state.graphics.nineSlice.borderPadding.right || 0,
      bottom: this._state.graphics.nineSlice.borderPadding.bottom || 0,
    };
  }
}
