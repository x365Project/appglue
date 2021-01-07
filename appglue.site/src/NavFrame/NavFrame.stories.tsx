import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';

import { NavFrame } from './NavFrame';
import {
  ContentTheme,
  FrameProps,
  FrameSize,
  Layout,
  LayoutWidth,
  NavBarTheme,
  SideBarType,
  TopBarTheme,
} from './FrameProps';

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
frameOptions.topBarTheme = TopBarTheme.DARK;

export const DarkTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarTheme = TopBarTheme.LIGHT;

export const LightTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarTheme = TopBarTheme.COLORED;
frameOptions.topBarColor = '#c97f7f';
frameOptions.topBarFontColor = '#cccc00';

export const ColoredTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.DARK;

export const DarkNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.LIGHT;

export const LightNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.COLORED;
frameOptions.navBarColor = '#002600';
frameOptions.navBarFontColor = '#fff';

export const ColoredNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const DarkTheme = Template.bind(null, frameOptions);

// *********** Horizontal theme ******

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarTheme = TopBarTheme.DARK;

export const HDarkTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarTheme = TopBarTheme.LIGHT;

export const HLightTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.topBarTheme = TopBarTheme.COLORED;
frameOptions.color = '#ff0000';

export const HColoredTopBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarTheme = NavBarTheme.DARK;

export const HDarkNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarTheme = NavBarTheme.LIGHT;

export const HLightNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarTheme = NavBarTheme.COLORED;
frameOptions.color = '#ff0000';

export const HColoredNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.HORIZONTAL;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const HDarkTheme = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.sideBarType = SideBarType.DEFAULT;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const FullNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.sideBarType = SideBarType.COMPACT;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const CompactNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.sideBarType = SideBarType.ICON;
frameOptions.navBarTheme = NavBarTheme.DARK;
frameOptions.topBarTheme = TopBarTheme.DARK;
frameOptions.contentTheme = ContentTheme.DARK;

export const IconNavBar = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarTheme = TopBarTheme.COLORED;
frameOptions.topBarColor = '#E59400';
frameOptions.topBarFontColor = '#4c4cff';

export const OrangeTopBarWithBlueFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.COLORED;
frameOptions.navBarColor = '#99cc99';
frameOptions.navBarFontColor = '#ffffff';

export const GreenNavBarWithWhiteFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.COLORED;
frameOptions.navBarColor = '#999900';
frameOptions.navBarFontColor = '#ffffff';
frameOptions.topBarTheme = TopBarTheme.COLORED;
frameOptions.topBarColor = '#999900';
frameOptions.topBarFontColor = '#310c0c';

export const YellowNavBarWithWhiteFontAndYellowTopBarWithBrownFont = Template.bind(
  null,
  frameOptions
);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.navBarTheme = NavBarTheme.COLORED;
frameOptions.navBarColor =
  'linear-gradient(to top, #051937, #3a2555, #752a63, #ad2e5d, #d84747)';
frameOptions.navBarFontColor = '#ffffff';

export const GradientNavBarWithWhiteFont = Template.bind(null, frameOptions);

frameOptions = new FrameProps();
frameOptions.frameSize = FrameSize.STANDARD;
frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
frameOptions.layout = Layout.VERTICAL;
frameOptions.topBarTheme = TopBarTheme.COLORED;
frameOptions.topBarColor =
  'linear-gradient(to right, #adc939, #a5d642, #9ae44e, #8af15d, #75ff6f)';
frameOptions.topBarFontColor = '#990000';

export const GradientTopBarWithRedFont = Template.bind(null, frameOptions);
