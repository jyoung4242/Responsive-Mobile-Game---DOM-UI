// resources.ts
import { ImageSource, Loader, Sprite, SpriteSheet } from "excalibur";
import whiteButton from "./Assets/Game Assets/ButtonText_Large_Blank_Square.png"; // replace this

export const Resources = {
  whiteButton: new ImageSource(whiteButton),
};

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
