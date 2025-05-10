import { Resources } from "../resources";
import { FlexChildButton, FlexChildEndPointPercentagedButtonState } from "./Components/FlexChildButton";
import { FlexContainer, FlexContainerState } from "./Components/FlexContainer";

export class SubRoot2 extends FlexContainer {
  constructor(state: FlexContainerState) {
    super(state);
  }

  public static template = `
    <style>
      #\${_state.id} {
        width: \${dims.w}px;
        height: \${dims.h}px;
        image-rendering: pixelated;
        box-sizing: border-box;
        padding: \${dims.padding}px;
        border: 2px solid whitesmoke;
        display: flex;
        flex-direction: \${_state.flexControls.flexDirection};
        flex-wrap: \${_state.flexControls.flexWrap};
        justify-content: \${_state.flexControls.justifyContent};
        align-items: \${_state.flexControls.alignItems };
        gap: \${dims.gap}px;
      }
    </style>
    <div \${==>_element} id="\${_state.id}">
       <!-- Content -->

    </div>
  `;

  static create(containerState: FlexContainerState) {
    return new SubRoot2(containerState);
  }
}
