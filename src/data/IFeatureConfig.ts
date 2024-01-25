export interface IFeatureConfig {
  name: string;
  controls: Record<string, boolean | number | [number, number]>;
  presetPath: string;
  presets: any[];
}
