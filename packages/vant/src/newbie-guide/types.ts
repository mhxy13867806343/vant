import type { ExtractPropTypes, PropType } from 'vue';
import { makeStringProp, truthProp } from '../utils';

export type NewbieGuideTheme = 'light' | 'dark';

export type NewbieGuideStep = {
  target: string;
  content: string;
};

export const newbieGuideProps = {
  /** 是否显示新手引导 */
  show: Boolean,
  /** 引导步骤数据 */
  steps: {
    type: Array as PropType<NewbieGuideStep[]>,
    default: () => [],
  },
  /** 主题 */
  theme: makeStringProp<NewbieGuideTheme>('light'),
  /** 是否在点击遮罩层后关闭 */
  closeOnClickOverlay: truthProp,
};

export type NewbieGuideProps = ExtractPropTypes<typeof newbieGuideProps>;
