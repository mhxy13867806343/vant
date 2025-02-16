import { later } from '../../../test';
import { mount } from '../../../test';
import { NewbieGuide } from '..';

test('should render newbie-guide correctly', async () => {
  const wrapper = mount(NewbieGuide, {
    props: {
      show: true,
      steps: [
        {
          target: '.test-target',
          content: 'Test Content',
        },
      ],
    },
  });

  await later();
  expect(wrapper.html()).toMatchSnapshot();
});

test('should emit close event when clicking overlay', async () => {
  const wrapper = mount(NewbieGuide, {
    props: {
      show: true,
      closeOnClickOverlay: true,
      steps: [
        {
          target: '.test-target',
          content: 'Test Content',
        },
      ],
    },
  });

  await later();
  wrapper.find('.van-newbie-guide__mask').trigger('click');
  expect(wrapper.emitted('update:show')?.[0]).toEqual([false]);
  expect(wrapper.emitted('close')?.[0]).toBeTruthy();
});

test('should emit step-change event when clicking next button', async () => {
  const wrapper = mount(NewbieGuide, {
    props: {
      show: true,
      steps: [
        {
          target: '.test-target-1',
          content: 'Step 1',
        },
        {
          target: '.test-target-2',
          content: 'Step 2',
        },
      ],
    },
  });

  await later();
  wrapper.find('.van-newbie-guide__next').trigger('click');
  expect(wrapper.emitted('step-change')?.[0]).toEqual([1]);
});
