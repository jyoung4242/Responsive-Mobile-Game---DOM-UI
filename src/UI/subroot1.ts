import { Resources } from "../resources";
import { FlexChildButton, FlexChildEndPointPercentagedButtonState } from "./Components/FlexChildButton";
import { FlexContainer, FlexContainerState } from "./Components/FlexContainer";

export class SubRoot1 extends FlexContainer {
  constructor(state: FlexContainerState) {
    super(state);
    console.log(this.buttonState);
  }

  Button = FlexChildButton;
  buttonState: FlexChildEndPointPercentagedButtonState = {
    orientation: "landscape",
    id: "button1",
    text: "TEST TEXT",
    parentContainerId: "subroot1",
    sizing: { landscape: { w: 75, h: 15 }, portrait: { w: 75, h: 15 } },
    graphics: {
      nineSliceUp: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      nineSliceDown: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      upImage: Resources.greenButtonUp,
      downImage: Resources.greenButtonDown,
    },
    clickCallback: () => console.log("button1 clicked"),
  };

  buttonState2: FlexChildEndPointPercentagedButtonState = {
    orientation: "landscape",
    id: "button2",
    text: "TEST TEXT",
    parentContainerId: "subroot1",
    sizing: { landscape: { w: 75, h: 15 }, portrait: { w: 75, h: 15 } },
    graphics: {
      nineSliceUp: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      nineSliceDown: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      upImage: Resources.greenButtonUp,
      downImage: Resources.greenButtonDown,
    },
    clickCallback: () => console.log("button2 clicked"),
  };
  buttonState3: FlexChildEndPointPercentagedButtonState = {
    orientation: "landscape",
    id: "button3",
    text: "TEST TEXT",
    parentContainerId: "subroot1",
    sizing: { landscape: { w: 75, h: 15 }, portrait: { w: 75, h: 15 } },
    graphics: {
      nineSliceUp: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      nineSliceDown: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      upImage: Resources.greenButtonUp,
      downImage: Resources.greenButtonDown,
    },
    clickCallback: () => console.log("button3 clicked"),
  };
  buttonState4: FlexChildEndPointPercentagedButtonState = {
    orientation: "landscape",
    id: "button4",
    text: "TEST TEXT",
    parentContainerId: "subroot1",
    sizing: { landscape: { w: 75, h: 15 }, portrait: { w: 75, h: 15 } },
    graphics: {
      nineSliceUp: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      nineSliceDown: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      upImage: Resources.greenButtonUp,
      downImage: Resources.greenButtonDown,
    },
    clickCallback: () => console.log("button4 clicked"),
  };
  buttonState5: FlexChildEndPointPercentagedButtonState = {
    orientation: "landscape",
    id: "button5",
    text: "TEST TEXT",
    parentContainerId: "subroot1",
    sizing: { landscape: { w: 75, h: 15 }, portrait: { w: 75, h: 15 } },
    graphics: {
      nineSliceUp: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      nineSliceDown: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      upImage: Resources.greenButtonUp,
      downImage: Resources.greenButtonDown,
    },
    clickCallback: () => console.log("button5 clicked"),
  };
  buttonState6: FlexChildEndPointPercentagedButtonState = {
    orientation: "landscape",
    id: "button6",
    text: "TEST TEXT",
    parentContainerId: "subroot1",
    sizing: { landscape: { w: 75, h: 15 }, portrait: { w: 75, h: 15 } },
    graphics: {
      nineSliceUp: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      nineSliceDown: { borderPadding: { top: 6, left: 7, right: 7, bottom: 6 } },
      upImage: Resources.greenButtonUp,
      downImage: Resources.greenButtonDown,
    },
    clickCallback: () => console.log("button6 clicked"),
  };

  public static template = `
    <style>
      #\${_state.id} {
        width: \${dims.w}px;
        height: \${dims.h}px;
        image-rendering: pixelated;
        box-sizing: border-box;
        padding: \${dims.padding}px;
        border: 2px solid blue;
        display: flex;
        flex-direction: \${_state.flexControls.flexDirection};
        flex-wrap: \${_state.flexControls.flexWrap};
        justify-content: \${_state.flexControls.justifyContent};
        align-items: \${_state.flexControls.alignItems };
        gap: \${dims.gap}px;
      }
    </style>
    <div \${==>_element} id="\${_state.id}">
       <\${Button === buttonState}>
      
       <\${Button === buttonState2}>
       <\${Button === buttonState3}>
       <\${Button === buttonState4}>
       <\${Button === buttonState5}>
        <\${Button === buttonState6}>

    </div>
  `;

  static create(containerState: FlexContainerState) {
    return new SubRoot1(containerState);
  }
}
