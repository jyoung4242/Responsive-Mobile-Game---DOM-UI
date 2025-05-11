import { ImageSource } from "excalibur";
import { Signal } from "../../Lib/Signals";

type PercentOfParent = number;

export type FlexChildEndPointPercentagedIconState = {
  id: string;
  svgId: string; // ID of the SVG element
  pathId: string; // ID of the path element
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
  graphics: {
    image: ImageSource;
  };
  alttext?: string;
  fontDetails?: {
    fontSize?: string | number; // Allow for custom font sizes
    maxFont?: number;
    minFont?: number;
    fontScale?: number;
    fontColor?: string; // Allow for custom font colors
  };
  svgString: string; // Optional SVG string
  parentContainerId: string; // ID of the parent container for positioning
};

export class FlexChildIcon {
  resizeSignal = new Signal("resize");
  private _svgElement: HTMLElement | undefined = undefined;
  private _pathElement: HTMLElement | undefined = undefined;
  private _element: HTMLButtonElement | undefined = undefined;
  private _state: FlexChildEndPointPercentagedIconState;

  public static template = `
        <style>
            #\${_state.id} {
            touch-action: manipulation;
                all: unset; 
                width: \${dims.w}px;
                height: \${dims.h}px;
                image-rendering: pixelated;
                background-color: transparent;
                padding: \${dims.padding.top}px \${dims.padding.right}px \${dims.padding.bottom}px \${dims.padding.left}px;
                user-select: none;
                appearance: none;
                cursor: pointer;
                font-size: \${_state.fontDetails.fontScale}em;
                
            }
            #\${_state.id} > img {
                width: 100%; 
                height: 100%; 
                object-fit: cover; 
                border-radius: 50%;
            }
        </style>
        <div \${==>_element} id="\${_state.id}"></div>
    `;

  //<img src="\${_state.graphics.image.path}" alt="\${_state.alttext}"   />

  constructor(state: FlexChildEndPointPercentagedIconState) {
    this._state = state;

    this.resizeSignal.listen((params: CustomEvent) => {
      let orientation = params.detail.params[0];
      this._state.orientation = orientation;
      this._element!.setAttribute("width", `${this.dims.w}px`);
      this._element!.setAttribute("height", `${this.dims.h}px`);
    });
    setTimeout(() => {
      if (!this._element) return;
      this._element.innerHTML = this._state.svgString;
      this._svgElement = document.getElementById(this._state.svgId) as HTMLElement;
      this._svgElement.setAttribute("fill", this._state.fontDetails?.fontColor || "white");
      this._svgElement.setAttribute("width", `${this.dims.w}px`);
      this._svgElement.setAttribute("height", `${this.dims.h}px`);
    }, 25);
  }

  static create(config: FlexChildEndPointPercentagedIconState) {
    return new FlexChildIcon(config);
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
      let dimheight = dimwidth;
      return {
        w: dimwidth,
        h: dimheight,
        padding: this._state.sizing.padding,
      };
    } else {
      let dimwidth = (this._state.sizing.portrait.w / 100) * parentWidth;
      let dimheight = dimwidth;
      return {
        w: dimwidth,
        h: dimheight,
        padding: this._state.sizing.padding,
      };
    }
  }
}
