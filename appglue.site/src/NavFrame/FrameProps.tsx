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
  LIGHT = 'top-light',
  DARK = 'top-dark',
  COLORED = 'top-colored', // from tenant
}

export enum NavBarTheme {
  LIGHT = 'nav-light',
  DARK = 'nav-dark',
  COLORED = 'nav-colored', // from tenant
}

export enum ContentTheme {
  LIGHT = 'light',
  DARK = 'dark',
  MAIN = 'main',
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
  layout: Layout = Layout.VERTICAL;
  sideBarType: SideBarType = SideBarType.DEFAULT;
  frameSize: FrameSize = FrameSize.STANDARD;
  layoutWidth: LayoutWidth = LayoutWidth.FULL_WIDTH;
  topBarTheme: TopBarTheme = TopBarTheme.DARK;
  navBarTheme: NavBarTheme = NavBarTheme.DARK;
  contentTheme: string = 'cyan';
  preloader: Preloader = Preloader.ON;
  minWidth: number = 1500;
}

export const CurrentFrameProps = new FrameProps();
export function getFrameOptions(): FrameProps {
  return CurrentFrameProps;
}
