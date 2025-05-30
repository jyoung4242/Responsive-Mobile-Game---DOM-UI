// resources.ts
import { ImageSource, Loader, Sprite, SpriteSheet } from "excalibur";
import whiteButton from "./Assets/Game Assets/ButtonText_Large_Blank_Square.png"; // replace this
import upButtonImage from "./Assets/Game Assets/button_rectangle_depth_gradient.png";
import downButtonImage from "./Assets/Game Assets/button_rectangle_gradient.png";
import greenButtonUp from "./Assets/Game Assets/greenButtonUp.png";
import greenButtonDown from "./Assets/Game Assets/greenButtonDown.png";
import panel from "./Assets/Game Assets/brownPanel.png";
import transparentPanel from "./Assets/Game Assets/transparentTexture.png";
import helpSVG from "./Assets/Game Assets/help.svg";
import settingsSVG from "./Assets/Game Assets/settings.svg";

console.log(helpSVG);
console.log(settingsSVG);

export const Resources = {
  whiteButton: new ImageSource(whiteButton),
  upButtonImage: new ImageSource(upButtonImage),
  downButtonImage: new ImageSource(downButtonImage),
  greenButtonUp: new ImageSource(greenButtonUp),
  greenButtonDown: new ImageSource(greenButtonDown),
  panel: new ImageSource(panel),
  transparentPanel: new ImageSource(transparentPanel),
  helpSVG: new ImageSource(helpSVG),
  settingsSVG: new ImageSource(settingsSVG),
};

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
