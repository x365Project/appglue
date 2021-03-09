import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { FrameProps, FrameSize, Layout, LayoutWidth, SideBarType } from './FrameProps';
import { NavFrame } from './NavFrame';

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
export default {
  title: 'NavFrame',
  component: NavFrame,
} as Meta;

const Template: Story<FrameProps> = args => <NavFrame layoutOptions={args} />;

let frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.BOXED;
frameOptions.layout = Layout.HORIZONTAL;

export const BoxedLayoutHorizontal = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.BOXED;
frameOptions.layout = Layout.VERTICAL;

export const BoxedLayoutVertical = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;

export const FullWidthLayoutHorizontal = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;

export const FullWidthLayoutVertical = Template.bind(null, frameOptions);

// *********** Vertical theme ******

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarFontColor = '#fafafa';
frameOptions.topBarColor = '#282F38';
frameOptions.topBarColorEnd = '#282F38';

export const DarkTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarFontColor = '#212121';
frameOptions.topBarColor = '#fafafa';
frameOptions.topBarColorEnd = '#fafafa';

export const LightTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarFontColor = '#fafafa';
frameOptions.topBarColor = '#48A0D5';
frameOptions.topBarColorEnd = '#02D0C1';

export const ColoredTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarFontColor = '#fafafa';
frameOptions.navBarColor = '#282F38';
frameOptions.navBarColorEnd = '#282F38';

export const DarkNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarFontColor = '#212121';
frameOptions.navBarColor = '#fafafa';
frameOptions.navBarColorEnd = '#fafafa';

export const LightNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarFontColor = '#fafafa';
frameOptions.navBarColor = '#48A0D5';
frameOptions.navBarColorEnd = '#02D0C1';

export const ColoredNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarFontColor = '#fafafa';
frameOptions.navBarColor = '#282F38';
frameOptions.navBarColorEnd = '#282F38';
frameOptions.topBarFontColor = '#fafafa';
frameOptions.topBarColor = '#282F38';
frameOptions.topBarColorEnd = '#282F38';

export const DarkTheme = Template.bind(null, frameOptions);

// *********** Horizontal theme ******

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarFontColor = '#212121';
frameOptions.topBarColor = '#fafafa';
frameOptions.topBarColorEnd = '#fafafa';

export const HDarkTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarFontColor = '#212121';
frameOptions.topBarColor = '#fafafa';
frameOptions.topBarColorEnd = '#fafafa';

export const HLightTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarFontColor = '#fafafa';
frameOptions.topBarColor = '#48A0D5';
frameOptions.topBarColorEnd = '#02D0C1';

export const HColoredTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarFontColor = '#212121';
frameOptions.navBarColor = '#fafafa';
frameOptions.navBarColorEnd = '#fafafa';

export const HDarkNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarFontColor = '#212121';
frameOptions.navBarColor = '#fafafa';
frameOptions.navBarColorEnd = '#fafafa';

export const HLightNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarFontColor = '#fafafa';
frameOptions.navBarColor = '#48A0D5';
frameOptions.navBarColorEnd = '#02D0C1';

export const HColoredNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarFontColor = '#fafafa';
frameOptions.navBarColor = '#282F38';
frameOptions.navBarColorEnd = '#282F38';
frameOptions.topBarFontColor = '#fafafa';
frameOptions.topBarColor = '#282F38';
frameOptions.topBarColorEnd = '#282F38';

export const HDarkTheme = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.sideBarType = SideBarType.DEFAULT;

export const FullNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.sideBarType = SideBarType.COMPACT;

export const CompactNavBar = Template.bind(null, frameOptions);

// frameOptions = new FrameProps();
// frameOptions.frameSize = FrameSize.STANDARD;
// frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
// frameOptions.layout = Layout.VERTICAL;
// frameOptions.sideBarType = SideBarType.ICON;
// frameOptions.navBarTheme = NavBarTheme.DARK;
// frameOptions.topBarTheme = TopBarTheme.DARK;
// frameOptions.contentTheme = ContentTheme.DARK;

// export const IconNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarFontColor = '#0288D1';
frameOptions.topBarColor = '#FFB74D';
frameOptions.topBarColorEnd = '#F57C00';

export const OrangeTopBarWithBlueFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarColor = '#64DD17';
frameOptions.navBarColorEnd = '#64DD17';
frameOptions.navBarFontColor = '#fafafa';

export const GreenNavBarWithWhiteFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarColor = '#D4E157';
frameOptions.navBarColorEnd = '#CDDC39';
frameOptions.navBarFontColor = '#fafafa';
frameOptions.topBarColor = '#D4E157';
frameOptions.topBarColorEnd = '#CDDC39';
frameOptions.topBarFontColor = '#3E2723';

export const YellowNavBarWithWhiteFontAndYellowTopBarWithBrownFont = Template.bind(
  null,
  frameOptions
);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarColor = '#18FFFF';
frameOptions.navBarColorEnd = '#00E676';
frameOptions.navBarFontColor = '#fafafa';

export const GradientNavBarWithWhiteFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarColor = '#18FFFF';
frameOptions.topBarColorEnd = '#00E676';
frameOptions.topBarFontColor = '#FF0000';

export const GradientTopBarWithRedFont = Template.bind(null, frameOptions);

// Horizontal Custom colors
frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarFontColor = '#0288D1';
frameOptions.topBarColor = '#FFB74D';
frameOptions.topBarColorEnd = '#F57C00';

export const HOrangeTopBarWithBlueFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarColor = '#EF5350';
frameOptions.navBarColorEnd = '#FF1744';
frameOptions.navBarFontColor = '#FFFF00';

export const HRedNavBarWithYellowFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarColor = '#EF5350';
frameOptions.navBarColorEnd = '#FF1744';
frameOptions.navBarFontColor = '#FFFF00';

export const HGradientNavBarWithYellowFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarColor = '#EF5350';
frameOptions.topBarColorEnd = '#FF1744';
frameOptions.topBarFontColor = '#FFFF00';

export const HGradientTopBarWithWhiteFont = Template.bind(null, frameOptions);

// background-image: linear-gradient(to right, #f88585, #ff8aa0, #ff93ba, #fd9ed4, #f5aaec);
