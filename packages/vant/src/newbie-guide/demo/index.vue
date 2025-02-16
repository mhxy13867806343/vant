<script setup lang="ts">
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';
import { showToast } from '../../toast';
import VanCell from '../../cell';
import VanCellGroup from '../../cell-group';
import VanSwitch from '../../switch';
import VanButton from '../../button';
import NewbieGuide from '..';

const t = useTranslate({
  'zh-CN': {
    basicUsage: '基础用法',
    buttonBasic: '展示引导',
    darkMode: '深色模式',
    closeOnClickOverlay: '点击遮罩关闭',
    listenEvents: '监听事件',
    clickEvents: '点击事件',
    displayEvents: '显示事件',
    content: {
      step1: '这是第一步引导',
      step2: '这是第二步引导',
      step3: '这是第三步引导',
      step4: '这是第四步引导',
    },
  },
  'en-US': {
    basicUsage: 'Basic Usage',
    buttonBasic: 'Show Guide',
    darkMode: 'Dark Mode',
    closeOnClickOverlay: 'Close on Click Overlay',
    listenEvents: 'Listen Events',
    clickEvents: 'Click Events',
    displayEvents: 'Display Events',
    content: {
      step1: 'This is step 1 guide',
      step2: 'This is step 2 guide',
      step3: 'This is step 3 guide',
      step4: 'This is step 4 guide',
    },
  },
});

const showBasic = ref(false);
const showClickEvents = ref(false);
const showDisplayEvents = ref(false);
const darkMode = ref(false);
const closeOnClickOverlay = ref(true);
const showOverlay = ref(true);

const steps = [
  {
    target: '.step-1',
    content: t('content.step1'),
  },
  {
    target: '.step-2',
    content: t('content.step2'),
  },
  {
    target: '.step-3',
    content: t('content.step3'),
  },
  {
    target: '.step-4',
    content: t('content.step4'),
  },
];

const showToastMessage = (message: string) => {
  showToast(message);
};

const onDarkModeChange = (value: boolean) => {
  darkMode.value = value;
  document.documentElement.classList.toggle('van-theme-dark', value);
};
</script>

<template>
  <demo-block card :title="t('basicUsage')">
    <van-cell :title="t('buttonBasic')" is-link @click="showBasic = true" />
    <van-cell-group inset>
      <van-cell center :title="t('darkMode')">
        <template #right-icon>
          <van-switch v-model="darkMode" @change="onDarkModeChange" />
        </template>
      </van-cell>
      <van-cell center :title="t('closeOnClickOverlay')">
        <template #right-icon>
          <van-switch v-model="closeOnClickOverlay" />
        </template>
      </van-cell>
      <van-cell center title="显示遮罩层">
        <template #right-icon>
          <van-switch v-model="showOverlay" />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="step-1">
      <van-button @click="showBasic = true">{{ t('buttonBasic') }}</van-button>
    </div>

    <NewbieGuide
      v-model:show="showBasic"
      :steps="steps"
      :overlay="showOverlay"
      :close-on-click-overlay="closeOnClickOverlay"
      :theme="darkMode ? 'dark' : 'light'"
    />
  </demo-block>

  <demo-block card :title="t('listenEvents')">
    <van-cell
      :title="t('clickEvents')"
      is-link
      @click="showClickEvents = true"
    />
    <NewbieGuide
      v-model:show="showClickEvents"
      :steps="steps"
      :overlay="showOverlay"
      :close-on-click-overlay="closeOnClickOverlay"
      :theme="darkMode ? 'dark' : 'light'"
      @click-overlay="showToastMessage('click-overlay')"
      @close="showToastMessage('close')"
    />

    <van-cell
      :title="t('displayEvents')"
      is-link
      @click="showDisplayEvents = true"
    />
    <NewbieGuide
      v-model:show="showDisplayEvents"
      :steps="steps"
      :overlay="showOverlay"
      :close-on-click-overlay="closeOnClickOverlay"
      :theme="darkMode ? 'dark' : 'light'"
      @open="showToastMessage('open')"
      @close="showToastMessage('close')"
      @step-change="(step) => showToastMessage(`step ${step + 1}`)"
    />
  </demo-block>
</template>

<style lang="less">
.demo-newbie-guide {
  background: var(--van-background-2);
  transition: background-color var(--van-animation-duration-base);

  .step-1 {
    margin: 16px;
    text-align: center;
  }
}
</style>
