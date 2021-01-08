import { FrameProps } from '../NavFrame/FrameProps';

export interface INavigationPage {
  name: string;
  urlRoute?: string;

  renderIcon(): JSX.Element | null | undefined;
  renderPage(
    layoutOptions?: FrameProps,
    rerender?: any | undefined
  ): JSX.Element | null | undefined;
  getSubPages(): INavigationPage[];
}
