import { FlexContainer, FlexContainerState } from "./Components/FlexContainer";
import { SubRoot1 } from "./subroot1";
import { SubRoot2 } from "./subroot2";

export class RootFlex extends FlexContainer {
  SubRoot = SubRoot1;
  SubRoot2 = SubRoot2; // Placeholder for another subroot, can be replaced with actual class
  subRootState: FlexContainerState = {
    id: "subroot1",
    orientation: "landscape",
    sizing: { landscape: { w: 45, h: 95 }, portrait: { w: 70, h: 70 }, padding: 2 },
    flexControls: {
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 3,
    },
    parentContainerId: "rootFlex",
  };
  subRootState2: FlexContainerState = {
    id: "subroot2",
    orientation: "landscape",
    sizing: { landscape: { w: 20, h: 95 }, portrait: { w: 70, h: 25 }, padding: 2 },
    flexControls: {
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 3,
    },
    parentContainerId: "rootFlex",
  };

  constructor(state: FlexContainerState) {
    super(state);
    this.resizeSignal.listen((params: CustomEvent) => {
      let orientation = params.detail.params[0];
      this._state.orientation = orientation;
      this._state.flexControls.flexDirection = orientation === "landscape" ? "row" : "column";
    });
  }

  public static template = `
    <style>
      #\${_state.id} {
        top: 0;
        left: 0;
        position: absolute;
        width: \${dims.w}px;
        height: \${dims.h}px;
        image-rendering: pixelated;
        box-sizing: border-box;
        padding: \${dims.padding}px;
        border: 2px solid red;
        display: flex;
        flex-direction: \${_state.flexControls.flexDirection};
        flex-wrap: \${_state.flexControls.flexWrap};
        justify-content: \${_state.flexControls.justifyContent};
        align-items: \${_state.flexControls.alignItems };
        gap: \${dims.gap}px;
      }
    </style>
    <div \${==>_element} id="\${_state.id}">
        <\${SubRoot2 === subRootState2}>
        <\${SubRoot === subRootState}>
    </div>
  `;

  static create(containerState: FlexContainerState) {
    return new RootFlex(containerState);
  }
}
