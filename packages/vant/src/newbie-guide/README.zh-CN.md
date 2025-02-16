# NewbieGuide 新手引导

### 介绍

用于创建交互式的用户引导和教程。

### 引入

```js
import { createApp } from 'vue';
import { NewbieGuide } from 'vant';

const app = createApp();
app.use(NewbieGuide);
```

## 代码演示

### 基础用法

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
        content: '这是第一步',
      },
      {
        target: '.step-2',
        content: '这是第二步',
      },
    ];

    const onClose = () => {
      show.value = false;
    };

    const onStepChange = (step) => {
      console.log('当前步骤:', step);
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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:show | 是否显示引导 | _boolean_ | `false` |
| steps | 引导步骤数据 | _GuideStep[]_ | `[]` |
| z-index | 层级 | _number \| string_ | `100` |
| theme | 主题色 | _string_ | `primary` |
| closeable | 是否显示关闭按钮 | _boolean_ | `false` |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | _boolean_ | `false` |

### Events

| 事件名      | 说明           | 回调参数        |
| ----------- | -------------- | --------------- |
| close       | 关闭引导时触发 | -               |
| step-change | 步骤改变时触发 | _index: number_ |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义引导内容 |

## 类型定义

```ts
import type { NewbieGuideProps } from 'vant';
```
