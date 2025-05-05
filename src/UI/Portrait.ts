import { Color, Engine, vec, Vector } from "excalibur";
import { UIContainer, UIContainerArgs, UILayout } from "../Lib/UILayout";
import { c } from "vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";

export function getPortraitLayout(layout: UILayout, engine: Engine) {
  console.log("getPortraitLayout", engine.screen.contentArea.width, engine.screen.contentArea.height);
  if (layout.root.getChildrenContainers().length > 0) throw new Error("Landscape layout already exists");
  let TitleContainer = new UIContainer({
    pos: vec(0, 0),
    anchor: Vector.Zero,
    name: "TitleContainer",
    layoutDirection: "horizontal",
    positionContentStrategy: "space-between",
    alignmentContentStrategy: "center",
    width: engine.screen.contentArea.width,
    height: 40,
    z: 2,
    color: Color.Red,
  });

  layout.root.addChildContainer(TitleContainer);

  let largeButtonContainer = new UIContainer({
    pos: vec(0, 0),
    anchor: Vector.Zero,
    name: "ButtonContainerVerticalPositioningContainer",
    layoutDirection: "vertical",
    positionContentStrategy: "center",
    alignmentContentStrategy: "center",
    padding: 10,
    width: engine.screen.contentArea.width,
    height: engine.screen.contentArea.height,
    color: Color.Black,
    z: 1,
  });

  layout.root.addChildContainer(largeButtonContainer);

  largeButtonContainer?.addChildContainer(
    new UIContainer({
      anchor: Vector.Zero,
      name: "ButtonContainer",
      width: engine.screen.contentArea.width,
      height: 275,
      color: Color.Blue,
      z: 2,
    })
  );
}
