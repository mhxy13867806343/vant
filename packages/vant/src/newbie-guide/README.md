# NewbieGuide

### Intro

A component for creating interactive user guides and tutorials.

### Install

```js
import { createApp } from 'vue';
import { NewbieGuide } from 'vant';

const app = createApp();
app.use(NewbieGuide);
```

## Usage

### Basic Usage

```html
<van-newbie-guide
  v-model:show="show"
  :steps="steps"
  @close="onClose"
  @step-change="onStepChange"
/>
```

```js
export default {
  setup() {
    const show = ref(false);
    const steps = [
      {
        target: '.step-1',
        content: 'This is step 1',
      },
      {
        target: '.step-2',
        content: 'This is step 2',
      },
    ];

    const onClose = () => {
      show.value = false;
    };

    const onStepChange = (step) => {
      console.log('Current step:', step);
    };

    return {
      show,
      steps,
      onClose,
      onStepChange,
    };
  },
};
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:show | Whether to show guide | _boolean_ | `false` |
| steps | Guide steps data | _GuideStep[]_ | `[]` |
| z-index | Z-index | _number \| string_ | `100` |
| theme | Theme color | _string_ | `primary` |
| closeable | Whether to show close button | _boolean_ | `false` |
| close-on-click-overlay | Whether to close when overlay is clicked | _boolean_ | `false` |

### Events

| Event       | Description                  | Arguments       |
| ----------- | ---------------------------- | --------------- |
| close       | Emitted when guide is closed | -               |
| step-change | Emitted when step changes    | _index: number_ |

### Slots

| Name    | Description          |
| ------- | -------------------- |
| default | Custom guide content |

## Types

```ts
import type { NewbieGuideProps } from 'vant';
```
