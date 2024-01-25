import {linesConfig} from './lines.ts';
import {chaosConfig} from './chaos.ts';
import {circlesConfig} from './circles.ts';

let FEATURE_CONFIG: any = {
  circles: circlesConfig,
  lines: linesConfig,
  chaosCircles: chaosConfig
};

FEATURE_CONFIG.waves = FEATURE_CONFIG.lines;

export const getFeatureConfig = (feature: string) => {
  return FEATURE_CONFIG[feature] || linesConfig;
};
