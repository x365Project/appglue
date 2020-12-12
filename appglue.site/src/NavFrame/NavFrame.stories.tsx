import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';

import {NavFrame} from './NavFrame';
import {
    ContentTheme,
    FrameProps,
    FrameSize,
    Layout,
    LayoutWidth,
    NavBarTheme,
    SideBarType,
    TopBarTheme
} from './FrameProps';

export default {
    title: 'NavFrame',
    component: NavFrame,
} as Meta;



const Template: Story<FrameProps> = (args) => <NavFrame layoutOptions={args} />;

let frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.BOXED;
frameOptions.layout = Layout.HORIZONTAL;

export const BoxedLayoutHorizontal = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.BOXED;
frameOptions.layout = Layout.HORIZONTAL;

export const BoxedLayoutVertical = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;

export const FullWidthLayoutHorizontal = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;

export const FullWidthLayoutVertical = Template.bind(frameOptions);

// *********** Vertical theme ******


frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarTheme = TopBarTheme.DARK;

export const DarkTopBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarTheme = TopBarTheme.LIGHT;

export const LightTopBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarTheme = TopBarTheme.COLORED;
frameOptions.color = 'red';

export const ColoredTopBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.DARK;

export const DarkNavBar = Template.bind(frameOptions);


frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.LIGHT;

export const LightNavBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.COLORED;
frameOptions.color = 'red';

export const ColoredNavBar = Template.bind(frameOptions);


frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const DarkTheme = Template.bind(frameOptions);

// *********** Horizontal theme ******

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarTheme = TopBarTheme.DARK;

export const HDarkTopBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarTheme = TopBarTheme.LIGHT;

export const HLightTopBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarTheme = TopBarTheme.COLORED;
frameOptions.color = 'red';

export const HColoredTopBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarTheme = NavBarTheme.DARK;

export const HDarkNavBar = Template.bind(frameOptions);


frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarTheme = NavBarTheme.LIGHT;

export const HLightNavBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarTheme = NavBarTheme.COLORED;
frameOptions.color = 'red';

export const HColoredNavBar = Template.bind(frameOptions);


frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const HDarkTheme = Template.bind(frameOptions);



frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.sideBarType = SideBarType.DEFAULT;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const FullNavBar = Template.bind(frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.sideBarType = SideBarType.COMPACT;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const CompactNavBar = Template.bind(frameOptions);


frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.sideBarType = SideBarType.ICON;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const IconNavBar = Template.bind(frameOptions);
