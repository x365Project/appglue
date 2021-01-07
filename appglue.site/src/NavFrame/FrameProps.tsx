export enum SideBarType {
  DEFAULT = 'default',
  COMPACT = 'compact',
  ICON = 'icon',
}

export enum FrameSize {
  STANDARD = 'standard',
  FULLSCREEN = 'fullscreen',
}

export enum LayoutWidth {
  FULL_WIDTH = 'fullwidth',
  BOXED = 'boxed', //1440px
}

export enum TopBarTheme {
  LIGHT = 'light',
  DARK = 'dark',
  COLORED = 'colored', // from tenant
}

export enum NavBarTheme {
  LIGHT = 'light',
  DARK = 'dark',
  COLORED = 'colored', // from tenant
}

export enum ContentTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum Layout {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export enum Preloader {
  ON = 'on',
  OFF = 'off',
}

// these will be fetched from tenant then from user settings
export class FrameProps {
  icon: JSX.Element | undefined;
  teamName: string = 'AppGlue';
  allTeams: string[] = ['AppGlue', 'OtherTeam', 'YetAnotherTeam'];

  color: string = '#203156';
  colorGradientEnd: string =
    'linear-gradient(160.55deg, #49A0D5 1.59%, #00D1C1 94.21%)'; // gradients have 2 colors...
  topBarFontColor: string = '';
  topBarColor: string = '';
  navBarFontColor: string = '';
  navBarColor: string = '';
  layout: Layout = Layout.HORIZONTAL;
  sideBarType: SideBarType = SideBarType.DEFAULT;
  frameSize: FrameSize = FrameSize.STANDARD;
  layoutWidth: LayoutWidth = LayoutWidth.FULL_WIDTH;
  topBarTheme: TopBarTheme = TopBarTheme.DARK;
  navBarTheme: NavBarTheme = NavBarTheme.DARK;
  contentTheme: ContentTheme = ContentTheme.LIGHT;
  preloader: Preloader = Preloader.ON;
  minWidth: number = 1500;
}

export const CurrentFrameProps = new FrameProps();
export function getFrameOptions(): FrameProps {
  return CurrentFrameProps;
}
