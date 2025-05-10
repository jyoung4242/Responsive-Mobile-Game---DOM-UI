import { ImageSource } from "excalibur";
import { Signal } from "../../Lib/Signals";

type PercentOfParent = number;

export type FlexChildEndPointPercentagedButtonState = {
  id: string;
  orientation: string;
  sizing: {
    landscape: { w: PercentOfParent; h: PercentOfParent };
    portrait: { w: PercentOfParent; h: PercentOfParent };
  };
  graphics?: {
    upImage?: ImageSource;
    downImage?: ImageSource;
    nineSliceUp?: {
      borderPadding: {
        top: number;
        left: number;
        right: number;
        bottom: number;
      };
    };
    nineSliceDown?: {
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

  clickCallback: () => void;
  parentContainerId: string; // ID of the parent container for positioning
};

export class FlexChildButton {
  resizeSignal = new Signal("resize");
  private _textElement: HTMLElement | undefined = undefined;
  private _element: HTMLButtonElement | undefined = undefined;
  private _state: any;
  private _buttonStatus: boolean = false;

  public static template = `
        <style>
            #\${_state.id} {
                all: unset; 
                width: \${dims.w}px;
                height: \${dims.h}px;
                image-rendering: pixelated;
                cursor: pointer;
                background-color: transparent;
                padding: 0;
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
                font-size: clamp(\${_state.fontDetails.minFont}rem, \${_state.fontDetails.fontScale}vw, \${_state.fontDetails.maxFont}rem);
                width: 100%;
            }
            
        </style>
        <button \${==>_element} id="\${_state.id}" \${pointerup@=>upHandler} \${pointerdown@=>downHandler}>
          <span \${==>_textElement}>\${_state.text}</span>
        </button>
    `;

  constructor(state: FlexChildEndPointPercentagedButtonState) {
    this._state = state;
    if (!state.fontDetails?.fontColor) {
      this._state.fontDetailsfontColor = "white"; // Default color if not provided
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
    this._element!.style.borderImageSource = `url('${this._state.graphics?.upImage.path}')`;
  }

  static create(config: FlexChildEndPointPercentagedButtonState) {
    return new FlexChildButton(config);
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
      };
    } else {
      let dimwidth = (this._state.sizing.portrait.w / 100) * parentWidth;
      let dimheight = (this._state.sizing.portrait.h / 100) * parentHeight;
      return {
        w: dimwidth,
        h: dimheight,
      };
    }
  }

  get borderSlice() {
    let largestUpBorder = Math.max(
      this._state.nineSliceUp?.borderPadding.top || 0,
      this._state.nineSliceUp?.borderPadding.left || 0,
      this._state.nineSliceUp?.borderPadding.right || 0,
      this._state.nineSliceUp?.borderPadding.bottom || 0
    );
    let largestDownBorder = Math.max(
      this._state.nineSliceDown?.borderPadding.top || 0,
      this._state.nineSliceDown?.borderPadding.left || 0,
      this._state.nineSliceDown?.borderPadding.right || 0,
      this._state.nineSliceDown?.borderPadding.bottom || 0
    );
    if (this._buttonStatus) {
      return {
        overall: largestDownBorder,
        top: this._state.nineSliceDown?.borderPadding.top || 0,
        left: this._state.nineSliceDown?.borderPadding.left || 0,
        right: this._state.nineSliceDown?.borderPadding.right || 0,
        bottom: this._state.nineSliceDown?.borderPadding.bottom || 0,
      };
    } else {
      return {
        overall: largestUpBorder,
        top: this._state.nineSliceUp?.borderPadding.top || 0,
        left: this._state.nineSliceUp?.borderPadding.left || 0,
        right: this._state.nineSliceUp?.borderPadding.right || 0,
        bottom: this._state.nineSliceUp?.borderPadding.bottom || 0,
      };
    }
  }

  upHandler() {
    //switch image
    this._element!.style.borderImageSource = "none";
    this._textElement!.style.transform = "translateY(0px)";
    this._element!.style.borderImageSource = `url('${this._state.graphics?.upImage.path}')`;
    this._state.clickCallback();
    this._buttonStatus = false;
  }

  downHandler() {
    this._element!.style.borderImageSource = "none";
    this._textElement!.style.transform = "translateY(2px)";
    this._element!.style.borderImageSource = `url('${this._state.graphics?.downImage.path}')`;
    this._buttonStatus = true;
  }
}
