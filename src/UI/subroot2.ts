import { helpSVG, settingsSVG } from "../Assets/Game Assets/svg";
import { Resources } from "../resources";
import { FlexChildButton, FlexChildEndPointPercentagedButtonState } from "./Components/FlexChildButton";
import { FlexChildEndPointPercentagedIconState, FlexChildIcon } from "./Components/FlexChildIcon";
import { FlexChildEndPointPercentagedLabelState, FlexChildLabel } from "./Components/FlexChildLabel";
import { FlexContainer, FlexContainerState } from "./Components/FlexContainer";

export class SubRoot2 extends FlexContainer {
  constructor(state: FlexContainerState) {
    super(state);
    this.resizeSignal.listen((params: CustomEvent) => {
      let orientation = params.detail.params[0];
      this._state.orientation = orientation;
      this._state.flexControls.flexDirection = orientation === "landscape" ? "column" : "row";
      this._state.flexControls.justifyContent = orientation === "landscape" ? "space-between" : "center";
    });
  }

  label = FlexChildLabel;
  lable1State: FlexChildEndPointPercentagedLabelState = {
    id: "title",
    orientation: "landscape",
    text: "Time Wasters",
    sizing: { landscape: { w: 100, h: 10 }, portrait: { w: 60, h: 50 }, padding: { top: 10, left: 2, right: 2, bottom: 10 } },
    fontDetails: {
      maxFont: 3,
      minFont: 1,
      fontScale: 1,
      fontColor: "white",
    },
    graphics: {
      image: Resources.transparentPanel,
      nineSlice: {
        borderPadding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
    },

    parentContainerId: "subroot2",
  };
  lable2State: FlexChildEndPointPercentagedLabelState = {
    id: "title2",
    orientation: "landscape",
    text: "Time Wasters",
    sizing: { landscape: { w: 100, h: 10 }, portrait: { w: 60, h: 50 }, padding: { top: 10, left: 2, right: 2, bottom: 10 } },
    fontDetails: {
      maxFont: 3,
      minFont: 1,
      fontScale: 1,
      fontColor: "white",
    },
    graphics: {
      image: Resources.transparentPanel,
      nineSlice: {
        borderPadding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
    },

    parentContainerId: "subroot2",
  };

  Icon = FlexChildIcon;
  icon1: FlexChildEndPointPercentagedIconState = {
    id: "icon1",
    svgId: "path-1",
    orientation: "landscape",
    alttext: "Help Menu",
    graphics: {
      image: Resources.helpSVG,
    },
    fontDetails: { fontColor: "whitesmoke" },
    sizing: { landscape: { w: 10, h: 10 }, portrait: { w: 10, h: 10 }, padding: { top: 2, left: 2, right: 2, bottom: 2 } },
    parentContainerId: "subroot2",
    svgString: helpSVG,
  };
  icon2: FlexChildEndPointPercentagedIconState = {
    id: "icon2",
    svgId: "path-2",
    orientation: "landscape",
    alttext: "Settings Menu",
    graphics: {
      image: Resources.settingsSVG,
    },
    fontDetails: { fontColor: "whitesmoke" },
    sizing: { landscape: { w: 10, h: 10 }, portrait: { w: 10, h: 10 }, padding: { top: 2, left: 2, right: 2, bottom: 2 } },
    parentContainerId: "subroot2",
    svgString: settingsSVG,
  };
  icon3: FlexChildEndPointPercentagedIconState = {
    id: "icon3",
    svgId: "path-1",
    orientation: "landscape",
    alttext: "Help Menu",
    graphics: {
      image: Resources.helpSVG,
    },
    fontDetails: { fontColor: "whitesmoke" },
    sizing: { landscape: { w: 10, h: 10 }, portrait: { w: 10, h: 10 }, padding: { top: 2, left: 2, right: 2, bottom: 2 } },
    parentContainerId: "iconWrapper",
    svgString: helpSVG,
  };
  icon4: FlexChildEndPointPercentagedIconState = {
    id: "icon4",
    svgId: "path-2",
    orientation: "landscape",
    alttext: "Settings Menu",
    graphics: {
      image: Resources.settingsSVG,
    },
    fontDetails: { fontColor: "whitesmoke" },
    sizing: { landscape: { w: 10, h: 10 }, portrait: { w: 10, h: 10 }, padding: { top: 2, left: 2, right: 2, bottom: 2 } },
    parentContainerId: "iconWrapper",
    svgString: settingsSVG,
  };

  public static template = `
    <style>
      #\${_state.id} {
        width: \${dims.w}px;
        height: \${dims.h}px;
        image-rendering: pixelated;
        box-sizing: border-box;
        padding: \${dims.padding}px;
        /* border: 2px solid whitesmoke; */
        display: flex;
        flex-direction: \${_state.flexControls.flexDirection};
        flex-wrap: \${_state.flexControls.flexWrap};
        justify-content: \${_state.flexControls.justifyContent};
        align-items: \${_state.flexControls.alignItems };
        gap: \${dims.gap}px;
      }
    </style>
    <div id="outerWrapper">
      <div  \${!==isLandscape} id="\${_state.id}">
        <\${Icon === icon1}>
        <\${label === lable1State}>
        <\${Icon === icon2}>
      </div>
      <div  \${===isLandscape} id="\${_state.id}">
        <\${label === lable2State}>
        <div id="iconWrapper" style="width: 100%; height: 20%; margin-bottom: 10px; justify-content: space-evenly; display: flex; flex-direction: column; gap: 20px; order: 2">
          <\${Icon === icon3}>
          <\${Icon === icon4}>
        </div>
      </div>
    </div>
  `;

  static create(containerState: FlexContainerState) {
    return new SubRoot2(containerState);
  }

  get isLandscape() {
    return this._state.orientation === "landscape";
  }
}
