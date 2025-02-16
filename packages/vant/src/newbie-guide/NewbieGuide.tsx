import {
  ref,
  watch,
  computed,
  Transition,
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes,
  PropType,
} from 'vue';
import { createNamespace, isDef } from '../utils';
import { useLazyRender } from '../composables/use-lazy-render';
import { useGlobalZIndex } from '../composables/use-global-z-index';
import { useLockScroll } from '../composables/use-lock-scroll';
import { Overlay } from '../overlay';
import type { NewbieGuideStep } from './types';
import { useExpose } from '../composables/use-expose';

const [name, bem] = createNamespace('newbie-guide');

const newbieGuideProps = {
  show: Boolean,
  steps: {
    type: Array as any,
    default: () => [],
  },
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    }),
  },
  theme: {
    type: String as any,
    default: 'light',
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [Number, String],
    default: 0.3,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  lazyRender: {
    type: Boolean,
    default: true,
  },
};

export type NewbieGuideProps = ExtractPropTypes<typeof newbieGuideProps>;

export default defineComponent({
  name,

  inheritAttrs: false,

  props: newbieGuideProps,

  emits: ['update:show', 'close', 'step-change', 'click-overlay'],

  setup(props, { emit, attrs, slots }) {
    let opened: boolean;
    const zIndex = ref<number>();
    const currentStep = ref(0);
    const popupRef = ref<HTMLElement>();

    const lazyRender = useLazyRender(() => props.show || !props.lazyRender);

    const style = computed(() => {
      if (!props.show) {
        return {};
      }
      const style: CSSProperties = {
        zIndex: zIndex.value,
        backgroundColor: props.overlay
          ? props.overlayStyle.backgroundColor
          : '',
      };
      if (isDef(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }
      return style;
    });

    const open = () => {
      if (!opened) {
        opened = true;
        zIndex.value = useGlobalZIndex();
      }
    };

    const close = () => {
      if (opened) {
        opened = false;
        emit('close');
        emit('update:show', false);
        currentStep.value = 0;
      }
    };

    const nextStep = () => {
      if (currentStep.value < props.steps.length - 1) {
        currentStep.value++;
        emit('step-change', currentStep.value);
      } else {
        close();
      }
    };

    const onClickOverlay = (event: MouseEvent) => {
      emit('click-overlay', event);
      if (props.closeOnClickOverlay && props.overlay) {
        emit('update:show', false);
        close();
      }
    };

    const renderOverlay = () => {
      return (
        <Overlay
          show={props.show}
          class={[
            bem('overlay'),
            { [bem('overlay--clickable')]: props.overlay },
          ]}
          zIndex={zIndex.value}
          duration={props.duration}
          onClick={onClickOverlay}
        />
      );
    };

    const renderDefaultContent = (step: NewbieGuideStep) => {
      const isLastStep = currentStep.value === props.steps.length - 1;
      return (
        <>
          <div
            class={bem(
              props.theme === 'light' ? 'step-content-black' : 'step-content',
              '__step__content',
            )}
          >
            {step.content}
          </div>
          <div class={bem('buttons')}>
            <button
              role="button"
              tabindex={0}
              class={bem('close')}
              onClick={close}
            >
              关闭
            </button>
            <button
              role="button"
              tabindex={0}
              class={[bem('next'), isLastStep ? 'van-theme-success' : '']}
              onClick={nextStep}
            >
              {isLastStep ? '完成' : '下一步'}
            </button>
          </div>
        </>
      );
    };

    const renderContent = () => {
      const step = props.steps[currentStep.value];
      if (!step) return null;

      return (
        <div
          class={bem('content')}
          role="dialog"
          tabindex={0}
          onClick={(event) => event.stopPropagation()}
        >
          {slots.default?.(step) || renderDefaultContent(step)}
        </div>
      );
    };

    const renderGuide = lazyRender(() => {
      if (!props.show) {
        return null;
      }

      return (
        <div
          ref={popupRef}
          style={style.value}
          class={[bem(), bem('--show')]}
          {...attrs}
        >
          {renderContent()}
        </div>
      );
    });

    const renderTransition = () => {
      const name = 'van-fade';

      return (
        <Transition name={name} appear={true}>
          {props.show ? renderGuide() : null}
        </Transition>
      );
    };

    watch(
      () => props.show,
      (value) => {
        if (value && !opened) {
          open();
        }
        if (!value && opened) {
          opened = false;
          currentStep.value = 0;
        }
      },
    );

    useLockScroll(popupRef, () => props.show && props.lockScroll);

    useExpose({
      currentStep,
    });

    return () => (
      <>
        {props.show && renderOverlay()}
        {renderTransition()}
      </>
    );
  },
});
