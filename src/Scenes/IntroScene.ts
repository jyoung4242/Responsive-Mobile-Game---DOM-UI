import { Color, Engine, LogLevel, Scene, SceneActivationContext, ScreenAppender, ScreenAppenderOptions, vec, Vector } from "excalibur";
import { UI, UIView } from "@peasy-lib/peasy-ui";

import { RootFlex } from "../UI/rootFlex";
import { FlexContainerState } from "../UI/Components/FlexContainer";
import { Signal } from "../Lib/Signals";

export class IntroScene extends Scene {
  mobileLogger = new Signal("mobileLogger");
  layout: UIView | undefined;
  orientation = "portrait";
  resizeHandler: any;
  screenAppender: ScreenAppender | undefined;

  constructor() {
    super();
  }

  async onActivate(context: SceneActivationContext<unknown>): Promise<void> {
    let SAOptions: ScreenAppenderOptions = {
      engine: context.engine,
      width: 500,
      height: 500,
      xPos: 0,
      color: Color.White,
      zIndex: 100,
    };
    this.screenAppender = new ScreenAppender(SAOptions);

    this.mobileLogger.listen((params: CustomEvent) => {
      this.screenAppender?.log(LogLevel.Info, [params.detail.params[0], params.detail.params[1]]);
    });
    //get cnv parent
    let parentContainer = document.getElementById("cnv")?.parentElement;
    //get screen size

    if (!parentContainer) return;

    this.layout = UI.create(parentContainer, new IntroSceneUI(this.orientation), IntroSceneUI.template);
    await this.layout.attached;

    this.orientation = getOrientation();
    console.log("initial orientation", this.orientation);

    syncHudToCanvas(this.layout);

    this.resizeHandler = async () => {
      this.orientation = getOrientation();
      syncHudToCanvas(this.layout);
      let displayTable = [
        ["screen dims", this.engine.screen.width, this.engine.screen.height],
        ["viewport dims", this.engine.screen.viewport.width, this.engine.screen.viewport.height],
        ["resolution", this.engine.screen.resolution.width, this.engine.screen.resolution.height],
        ["contentArea", this.engine.screen.contentArea.width, this.engine.screen.contentArea.height],
      ];
      console.table(displayTable);
    };
    window.addEventListener("resize", this.resizeHandler);
  }

  onPreUpdate(engine: Engine, elapsed: number): void {}
}

function getOrientation() {
  return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
}

class IntroSceneUI {
  resizeSignal = new Signal("resize");
  width: number = 0;
  height: number = 0;
  left: number = 0;
  top: number = 0;
  _pixelConversion: number = 1;
  orientation = "landscape";

  responsiveComponents: any[] = [];

  RootFlex = RootFlex;
  rootFlexState: FlexContainerState = {
    id: "rootFlex",
    orientation: this.orientation,
    sizing: { landscape: { w: 100, h: 100 }, portrait: { w: 100, h: 100 }, padding: 5 },
    flexControls: {
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 30,
    },
    parentContainerId: "ui",
  };

  static template = `
  <div id="ui" style="position:absolute; top: 0px; left: 0px; width:500px; height:500px;">
    <style>
      
      #ui {
       /* transform from the top left of the element */
        transform-origin: 0 0;
        /* scale the ui */
        transform: scale(var(--pixel-conversion), var(--pixel-conversion));
      }
    </style>
    
    <\${RootFlex === rootFlexState}> 
    
  </div>
  `;

  constructor(orientation: string) {
    this.orientation = orientation;

    this.responsiveComponents.push(this.rootFlexState);

    window.addEventListener("resize", () => {
      let orientation = getOrientation();
      this.resizeSignal.send([orientation]);
    });
  }

  get dims() {
    return { w: this.width, h: this.height, left: this.left, top: this.top };
  }

  set dims(dims: { w: number; h: number; left: number; top: number }) {
    this.width = dims.w;
    this.height = dims.h;
    this.left = dims.left;
    this.top = dims.top;
  }
}

const calculateExPixelConversion = (screen: ex.Screen, ui: IntroSceneUI) => {
  const origin = screen.worldToPageCoordinates(Vector.Zero);
  const singlePixel = screen.worldToPageCoordinates(vec(1, 0)).sub(origin);
  const pixelConversion = singlePixel.x;
  document.documentElement.style.setProperty("--pixel-conversion", pixelConversion.toString());
};

function syncHudToCanvas(hudView: UIView | undefined) {
  if (!hudView) return;

  const canvas = document.getElementById("cnv") as HTMLCanvasElement;
  const hud = document.getElementById("ui") as HTMLDivElement;
  const rect = canvas.getBoundingClientRect();

  hud.style.width = `${rect.width}px`;
  hud.style.height = `${rect.height}px`;
  hud.style.top = `${rect.top}px`;
  hud.style.left = `${rect.left}px`;
  hudView.model.dims = { w: rect.width, h: rect.height, left: rect.left, top: rect.top };
  hudView.model.resizeSignal.send([getOrientation()]);
}
