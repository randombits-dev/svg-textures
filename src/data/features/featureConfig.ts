import {linesConfig} from './lines.ts';
import {chaosConfig} from './chaos.ts';
import {circlesConfig} from './circles.ts';
import {solarConfig} from '@/data/features/solar.ts';

let FEATURE_CONFIG: any = {
  circles: circlesConfig,
  lines: linesConfig,
  chaos: chaosConfig,
  solar: solarConfig
};

FEATURE_CONFIG.waves = FEATURE_CONFIG.lines;

export const getFeatureConfig = (feature: string) => {
  return FEATURE_CONFIG[feature] || linesConfig;
};
