import { Color, Engine, Font, Label, vec, Vector } from "excalibur";
import { UIContainer, UIContainerArgs, UILayout } from "../Lib/UILayout";

export function getLandscapeLayout(layout: UILayout, engine: Engine) {
  console.log("getPortraitLayout", engine.screen.contentArea.width, engine.screen.contentArea.height);

  if (layout.root.getChildrenContainers().length > 0) throw new Error("Landscape layout already exists");

  let TitleContainer = new UIContainer({
    pos: vec(0, 0),
    anchor: Vector.Zero,
    name: "TitleContainer",
    layoutDirection: "horizontal",
    positionContentStrategy: "space-between",
    alignmentContentStrategy: "center",
    width: 100,
    height: 40,
    z: 1,
    color: Color.Red,
  });

  setTimeout(() => {
    console.log("timeout");

    TitleContainer.addChildContainer(
      new LabelContainer({ name: "Title", pos: vec(0, 0), width: 100, height: 40, anchor: Vector.Zero }, "Title")
    );
  }, 25);

  layout.root.addChildContainer(TitleContainer);
  let oneThird = engine.screen.contentArea.width / 3;
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
  });

  layout.root.addChildContainer(largeButtonContainer);

  largeButtonContainer?.addChildContainer(
    new UIContainer({
      anchor: Vector.Zero,
      name: "ButtonContainer",
      width: oneThird,
      height: engine.screen.contentArea.height,
      color: Color.Blue,
      z: 2,
    })
  );
}

class LabelContainer extends UIContainer {
  text: string;
  label: Label;
  constructor(args: UIContainerArgs, text: string) {
    super(args);
    this.text = text;
    console.log("LabelContainer");

    this.label = new Label({
      name: "Label",

      text: this.text,
      pos: vec(0, 0),
      anchor: Vector.Zero,
      width: 100,
      height: 40,
      color: Color.White,
      font: new Font({
        family: "Arial",
        size: 20,
      }),
      z: 2,
    });
    this.addChild(this.label);
  }
}
