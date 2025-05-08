// main.ts
import "./style.css";

import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, Color } from "excalibur";
import { model, template } from "./UI/UI";
import { IntroScene } from "./Scenes/IntroScene";
import { loader } from "./resources";

await UI.create(document.body, model, template).attached;

const game = new Engine({
  width: 500, // the width of the canvas
  height: 500, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.FitScreenAndFill, // the display mode
  pixelArt: true,
  backgroundColor: Color.fromHex("#333333"),
  scenes: {
    intro: {
      scene: new IntroScene(),
    },
  },
});

await game.start(loader);
game.goToScene("intro");
