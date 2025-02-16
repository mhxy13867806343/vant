import { withInstall } from '../utils';
import _NewbieGuide from './NewbieGuide';

const NewbieGuide = withInstall(_NewbieGuide);

export default NewbieGuide;
export { NewbieGuide };
export type { NewbieGuideStep, NewbieGuideTheme } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    VanNewbieGuide: typeof NewbieGuide;
  }
}
