import {linesConfig} from './lines.ts';
import {chaosConfig} from './chaos.ts';
import {circlesConfig} from './circles.ts';
import {solarConfig} from '@/data/features/solar.ts';
import {wavesConfig} from '@/data/features/waves.ts';

let FEATURE_CONFIG: any = {
  circles: circlesConfig,
  lines: linesConfig,
  chaos: chaosConfig,
  solar: solarConfig,
  waves: wavesConfig
};

export const getFeatureConfig = (feature: string) => {
  return FEATURE_CONFIG[feature] || linesConfig;
};
