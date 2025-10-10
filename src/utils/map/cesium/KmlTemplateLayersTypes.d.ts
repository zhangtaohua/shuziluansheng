import { KmlDataSource, SplitDirection } from "cesium";

export interface KmlTemplateOptions extends KmlDataSource.ConstructorOptions {
  id: string;
  url: string;
  name?: string;
  zIndex?: number;
  extent?: Array<number>;
  minZoom?: number;
  maxZoom?: number;
  isSplit?: boolean;
  splitDirection?: SplitDirection;
  isFitToView?: boolean;
}
