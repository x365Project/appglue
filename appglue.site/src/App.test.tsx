import { render } from '@testing-library/react';
import React from 'react';

import { FrameProps, FrameSize, Layout, LayoutWidth, SideBarType } from './NavFrame/FrameProps';
import { NavFrame } from './NavFrame/NavFrame';

it('renders the app in the default state', () => {
  let frameOptions = new FrameProps();

  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.BOXED;
  frameOptions.layout = Layout.HORIZONTAL;
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.BOXED;
  frameOptions.layout = Layout.VERTICAL;
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  render(<NavFrame layoutOptions={frameOptions} />);


  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.topBarFontColor = '#fafafa';
  frameOptions.topBarColor = '#282F38';
  frameOptions.topBarColorEnd = '#282F38';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.topBarFontColor = '#212121';
  frameOptions.topBarColor = '#fafafa';
  frameOptions.topBarColorEnd = '#fafafa';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.topBarFontColor = '#fafafa';
  frameOptions.topBarColor = '#48A0D5';
  frameOptions.topBarColorEnd = '#02D0C1';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.navBarFontColor = '#fafafa';
  frameOptions.navBarColor = '#282F38';
  frameOptions.navBarColorEnd = '#282F38';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.navBarFontColor = '#212121';
  frameOptions.navBarColor = '#fafafa';
  frameOptions.navBarColorEnd = '#fafafa';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.navBarFontColor = '#fafafa';
  frameOptions.navBarColor = '#48A0D5';
  frameOptions.navBarColorEnd = '#02D0C1';
  render(<NavFrame layoutOptions={frameOptions} />);

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
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.topBarFontColor = '#212121';
  frameOptions.topBarColor = '#fafafa';
  frameOptions.topBarColorEnd = '#fafafa';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.topBarFontColor = '#212121';
  frameOptions.topBarColor = '#fafafa';
  frameOptions.topBarColorEnd = '#fafafa';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.topBarFontColor = '#fafafa';
  frameOptions.topBarColor = '#48A0D5';
  frameOptions.topBarColorEnd = '#02D0C1';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.navBarFontColor = '#212121';
  frameOptions.navBarColor = '#fafafa';
  frameOptions.navBarColorEnd = '#fafafa';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.navBarFontColor = '#212121';
  frameOptions.navBarColor = '#fafafa';
  frameOptions.navBarColorEnd = '#fafafa';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.navBarFontColor = '#fafafa';
  frameOptions.navBarColor = '#48A0D5';
  frameOptions.navBarColorEnd = '#02D0C1';
  render(<NavFrame layoutOptions={frameOptions} />);

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
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.sideBarType = SideBarType.DEFAULT;
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.sideBarType = SideBarType.COMPACT;
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.topBarFontColor = '#0288D1';
  frameOptions.topBarColor = '#FFB74D';
  frameOptions.topBarColorEnd = '#F57C00';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.navBarColor = '#64DD17';
  frameOptions.navBarColorEnd = '#64DD17';
  frameOptions.navBarFontColor = '#fafafa';
  render(<NavFrame layoutOptions={frameOptions} />);

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
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.navBarColor = '#18FFFF';
  frameOptions.navBarColorEnd = '#00E676';
  frameOptions.navBarFontColor = '#fafafa';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.VERTICAL;
  frameOptions.topBarColor = '#18FFFF';
  frameOptions.topBarColorEnd = '#00E676';
  frameOptions.topBarFontColor = '#FF0000';
  render(<NavFrame layoutOptions={frameOptions} />);

  // Horizontal Custom colors
  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.topBarFontColor = '#0288D1';
  frameOptions.topBarColor = '#FFB74D';
  frameOptions.topBarColorEnd = '#F57C00';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.navBarColor = '#EF5350';
  frameOptions.navBarColorEnd = '#FF1744';
  frameOptions.navBarFontColor = '#FFFF00';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.navBarColor = '#EF5350';
  frameOptions.navBarColorEnd = '#FF1744';
  frameOptions.navBarFontColor = '#FFFF00';
  render(<NavFrame layoutOptions={frameOptions} />);

  frameOptions = new FrameProps();
  frameOptions.frameSize = FrameSize.STANDARD;
  frameOptions.layoutWidth = LayoutWidth.FULL_WIDTH;
  frameOptions.layout = Layout.HORIZONTAL;
  frameOptions.topBarColor = '#EF5350';
  frameOptions.topBarColorEnd = '#FF1744';
  frameOptions.topBarFontColor = '#FFFF00';
  render(<NavFrame layoutOptions={frameOptions} />);
});


// test('renders learn react link', () => {
//   // render(<App />);
//  //  const linkElement = screen.getByText(/learn react/i);
//    //expect(linkElement).toBeInTheDocument();
//  });
