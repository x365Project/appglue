import React from "react";

export function getFrameOptions() : FrameOptions {
    return new FrameOptions();
}

// these will be fetched from tenant then from user settings
export class FrameOptions {
    icon: JSX.Element | undefined;
    tenantName: string = 'AppGlue';
    color: string = 'darkblue';
    colorGradientEnd?: string; // gradients have 2 colors...

    layout: Layout = Layout.VERTICAL;
    sideBarType: SideBarType = SideBarType.DEFAULT;
    frameSize: FrameSize = FrameSize.STANDARD;
    layoutWidth: LayoutWidth =LayoutWidth.FULL_WIDTH;
    topBarTheme: TopBarTheme = TopBarTheme.DARK;
    navBarTheme: NavBarTheme = NavBarTheme.DARK;
    contentTheme: ContentTheme = ContentTheme.LIGHT;
    preloader: Preloader = Preloader.ON;
    minWidth: number = 1500;

}

export enum SideBarType {
    DEFAULT = 'default',
    COMPACT = 'compact',
    ICON = 'icon'
}

export enum FrameSize {
    STANDARD = 'standard',
    FULLSCREEN = 'fullscreen'
}

export enum LayoutWidth {
    FULL_WIDTH = 'fullwidth',
    BOXED = 'boxed',
}

export enum TopBarTheme {
    LIGHT = 'light',
    DARK = 'dark',
    COLORED = 'colored' // from tenant
}

export enum NavBarTheme {
    LIGHT = 'light',
    DARK = 'dark',
    COLORED = 'colored' // from tenant
}

export enum ContentTheme {
    LIGHT = 'light',
    DARK = 'dark'
}

export enum Layout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal'
}

export enum Preloader {
    ON = 'on',
    OFF = 'off'
}
