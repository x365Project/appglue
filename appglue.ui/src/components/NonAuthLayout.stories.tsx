import React, {ComponentProps} from 'react';
import {Story} from '@storybook/react/types-6-0';

import NonAuthLayout from './NonAuthLayout';

export default {
    title: 'NonAuthLayout',
    component: NonAuthLayout,
};

const Template: Story<ComponentProps<typeof NonAuthLayout>> = (args) => (
    <NonAuthLayout {...args}>
        <span style={{color:'gray'}}>Some content</span>
    </NonAuthLayout>
);

export const FirstStory = Template.bind({});
FirstStory.args = {
    location: {
        pathname: 'long - pathname'
    }
};
