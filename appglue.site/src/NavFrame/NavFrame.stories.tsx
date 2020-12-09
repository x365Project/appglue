import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { NavFrame } from './NavFrame';
import { FrameOptions, LayoutWidth, getFrameOptions, Layout } from './FrameOptions';

export default {
    title: 'NavFrame',
    component: NavFrame,
} as Meta;

const Template: Story<any> = (args) => <NavFrame {...args} />;

export const BoxedLayout = Template.bind({});
BoxedLayout.args = {
    layoutOptions: {
        ...getFrameOptions(),
        layoutWidth: LayoutWidth.BOXED
    }
}

export const FullScreenLayout = Template.bind({});
FullScreenLayout.args = {
    layoutOptions: {
        ...getFrameOptions(),
        layoutWidth: LayoutWidth.FULL_WIDTH
    }
}

export const HorizontalLayout = Template.bind({});
HorizontalLayout.args = {
    layoutOptions: {
        ...getFrameOptions(),
        layoutWidth: LayoutWidth.FULL_WIDTH,
        layout: Layout.HORIZONTAL
    }
}

