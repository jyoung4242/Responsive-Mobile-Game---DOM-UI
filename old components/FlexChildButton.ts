import { ImageSource } from "excalibur";

export type SizeUnit = number | string; // Allow for both numeric (px) and string values (%, vh, vw, etc.)
export type PositionUnit = number | string; // Allow for both numeric (px) and string values (%, vh, vw, etc.)

export type FlexChildButtonState = {
  id: string;
  orientation: string;
  parentContainerId: string; // ID of the parent container for positioning
  responsiveLayoutData: {
    landscape: { w: SizeUnit; h: SizeUnit };
    portrait: { w: SizeUnit; h: SizeUnit };
  };
  upImage: ImageSource;
  downImage: ImageSource;
  text: string;
  fontSize?: string | number; // Allow for custom font sizes
  fontColor?: string; // Allow for custom font colors
  clickCallback: () => void;
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

export class FlexChildButton {
  orientation = "landscape";
  id: string = "";
  upImage: string = "";
  downImage: string = "";
  clickCallback: () => void = () => {};
  text: string = "";
  textElement: HTMLElement | undefined = undefined;
  element: HTMLButtonElement | undefined = undefined;
  state: any;
  buttonStatus: boolean = false;

  responsiveLayoutData: {
    landscape: { w: SizeUnit; h: SizeUnit };
    portrait: { w: SizeUnit; h: SizeUnit };
  } = {
    landscape: { w: 0, h: 0 },
    portrait: { w: 0, h: 0 },
  };

  public static template = `
        <style>
            #\${id} {
                all: unset; 
                width: \${formatCSSDimension.w};
                height: \${formatCSSDimension.h};
                image-rendering: pixelated;
                cursor: pointer;
                background-color: transparent;
                padding: 0;
                font-size: \${formatCSSDimension.font}px;
                text-align: center;
                font-family: PixelArtFont;
                user-select: none;
                border:\${borderSlice.overall}px solid transparent;
                border-image-slice: \${borderSlice.top} \${borderSlice.right} \${borderSlice.bottom} \${borderSlice.left} fill;
                border-image-width: \${borderSlice.top}px \${borderSlice.right}px \${borderSlice.bottom}px \${borderSlice.left}px;
                border-image-repeat: stretch;
                border-image-outset: 0;
                appearance: none;
            }
            
        </style>
        <button \${==>element} id="\${id}" \${pointerup@=>upHandler} \${pointerdown@=>downHandler}>
          <span \${==>textElement} style="display: block;color: \${state.fontColor};font-size: \${state.fontSize}px;width: 100%;">\${text}</span>
        </button>
    `;

  constructor(state: FlexChildButtonState) {
    this.state = state;
    this.id = state.id;
    if (!state.fontColor) {
      this.state.fontColor = "white"; // Default color if not provided
    }
    this.responsiveLayoutData = state.responsiveLayoutData;
    this.upImage = (state.upImage as ImageSource).path;
    this.downImage = (state.downImage as ImageSource).path;
    this.clickCallback = state.clickCallback;
    this.text = state.text;
    setTimeout(() => {
      this.init();
    }, 25);
  }

  init() {
    this.element!.style.borderImageSource = `url('${this.upImage}')`;
  }

  static create(buttonState: FlexChildButtonState) {
    return new FlexChildButton(buttonState);
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
      w: FlexChildButton.formatCssDimension(this.dims.w),
      h: FlexChildButton.formatCssDimension(this.dims.h),
      left: FlexChildButton.formatCssDimension(this.dims.left),
      top: FlexChildButton.formatCssDimension(this.dims.top),
      font: FlexChildButton.formatCssDimension(this.state.fontSize),
    };
  }

  get borderSlice() {
    let largestUpBorder = Math.max(
      this.state.nineSliceUp?.borderPadding.top || 0,
      this.state.nineSliceUp?.borderPadding.left || 0,
      this.state.nineSliceUp?.borderPadding.right || 0,
      this.state.nineSliceUp?.borderPadding.bottom || 0
    );
    let largestDownBorder = Math.max(
      this.state.nineSliceDown?.borderPadding.top || 0,
      this.state.nineSliceDown?.borderPadding.left || 0,
      this.state.nineSliceDown?.borderPadding.right || 0,
      this.state.nineSliceDown?.borderPadding.bottom || 0
    );
    if (this.buttonStatus) {
      return {
        overall: largestDownBorder,
        top: this.state.nineSliceDown?.borderPadding.top || 0,
        left: this.state.nineSliceDown?.borderPadding.left || 0,
        right: this.state.nineSliceDown?.borderPadding.right || 0,
        bottom: this.state.nineSliceDown?.borderPadding.bottom || 0,
      };
    } else {
      return {
        overall: largestUpBorder,
        top: this.state.nineSliceUp?.borderPadding.top || 0,
        left: this.state.nineSliceUp?.borderPadding.left || 0,
        right: this.state.nineSliceUp?.borderPadding.right || 0,
        bottom: this.state.nineSliceUp?.borderPadding.bottom || 0,
      };
    }
  }

  upHandler() {
    //switch image
    this.element!.style.borderImageSource = "none";
    this.textElement!.style.transform = "translateY(0px)";
    this.element!.style.borderImageSource = `url('${this.upImage}')`;
    this.clickCallback();
    this.buttonStatus = false;
  }

  downHandler() {
    this.element!.style.borderImageSource = "none";
    this.textElement!.style.transform = "translateY(2px)";
    this.element!.style.borderImageSource = `url('${this.downImage}')`;
    this.buttonStatus = true;
  }
}
