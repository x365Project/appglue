export interface INavigationPage {
    name: string;
    urlRoute?: string;

    renderIcon() : JSX.Element | null | undefined;
    renderPage() : JSX.Element | null | undefined;
    getSubPages() : INavigationPage[];

}