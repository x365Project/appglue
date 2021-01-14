
export enum BorderStyle {
    Solid = 'Solid',
    Dotted = 'Dotted',
    Dashed = 'Dashed',
    Groove = 'Groove',
    Double = 'Double',
}

export enum DisplayStyle {
    Block = 'Block',
    Inline = 'Inline',
    'Inline Block' = 'Inline Block',
    Flex = 'Flex',
}

export enum WidthUnitInterface {
    PERCENTAGE = '%',
    PIXEL = 'px'
}

export enum FormMode {
    LayoutDesign = 'LayoutDesign',
    FormDesign = 'FormDesign',
    Runtime ='Runtime',
    JSON = 'Json',
    Data = 'Data',
    Rules = 'Rules'
}

export enum TextControlStyle {
    LABELED = 'labeled',
    OUTLINE = 'outline',
    SHADED = 'shaded',
    UNDERLINED = 'underlined'
}

export enum TextControlSize {
    STANDARD = 'medium',
    SMALL = 'small'
}

export enum NotificationType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

export enum TabOrientation {
    Veritical = 'vertical',
    Horizontal = 'horizontal',
}


export class FormDesignConstants {
    public static LAYOUT_FORM_KEY_NAME = 'baselayoutkey';
    public static SELECTED_CONTROL_BORDER_COLOR = '#4682B4';
    public static SELECTED_CONTROL_BORDER_WIDTH = '2px';

    public static DEFAULT_TAB_CONTENT_HEIGHT = 300;

    public static ERROR_CONTROL_BORDER_WIDTH = '1px';
    public static ERROR_CONTROL_BORDER_COLOR = '#F65C66';
    
    public static TOOLBOX_NOT_DRAGGING_COLOR : string = 'lightgray';
    public static TOOLBOX_DRAGGING_COLOR : string = 'red';
    public static TOOLBOX_LEFT_BEHIND_COLOR : string = '#4682B4';

    public static DESIGN_AREA_BACKGROUND_COLOR = '#DCDCDC';

    public static DESIGN_WIDTH: number = 800;
    public static RUNTIME_WIDTH: number | null = null;
    public static GAP_BETWEEN_CONTAINERS: number = 10;
    public static GAP_BETWEEN_COLUMNS: number = 10;
    public static FORM_MARGIN: number = 10;
    public static INNER_CONTAINER_MARGIN: number = 10;
    public static INTER_CONTROL_SPACING: number = 12;

    public static SHOW_CONTAINER_BORDER : boolean = false;
    public static CONTAINER_BORDER_RADIOUS: number = 5;
    public static CONTAINER_BORDER_WIDTH: number = 2;
    public static CONTAINER_BORDER_COLOR : string = 'lightgray'
    public static CONTAINER_BORDER_STYLE: BorderStyle = BorderStyle.Solid;

    public static TAB_CONTENT_HEIGHT: number = 500;
    public static TAB_CONTENT_WIDTH: number = 500;

    public static INNER_COLUMN_MARGIN: number = 10;

    public static LINE_COLOR_BETWEEN_COLUMNS: string = 'lightgray'
    public static LINE_WIDTH_BETWEEN_COLUMNS: number = 1

    public static FORM_BACKGROUND_COLOR: string | null = null;
    public static CONTAINER_BACKGROUND_COLOR : string | null = null;

    public static FORM_MODE_GRAY: string = 'Gray';
    public static FORM_MODE_WHITE: string = 'None';
    public static FORM_MODE_PAPER: string = 'Paper';
    public static FORM_MODE_OUTLINE: string = 'Outline';
    //'Defined Size', 'Tablet (Horizontal)', 'Tablet (Vertical)', 'Phone (Horizontal)', 'Phone (Vertical)'
    public static FORM_MODE_TABLET_HORIZONTAL: string = 'Tablet (Horizontal)';
    public static FORM_MODE_TABLET_VERTICAL: string = 'Tablet (Vertical)';
    public static FORM_MODE_PHONE_HORIZONTAL: string = 'Phone (Horizontal)';
    public static FORM_MODE_PHONE_VERTICAL: string = 'Phone (Vertical)';

    //['(Current)', 'None', 'Sample 1', 'Sample 2']
    public static FORM_DATA_MODE_CURRENT: string = 'Current';
    public static FORM_DATA_MODE_NONE: string = 'None';
    public static FORM_DATA_MODE_SAMPLE1: string = 'Sample1';
    public static FORM_DATA_MODE_SAMPLE2: string = 'Sample2';

    public static FORM_SECTION_MARGIN: number = 20;

    public static FORM_OUTER_MARGIN: number = 24;

    public static DROPPABLE_BORDER_COLOR: string = '#4682B4';
    public static DROPPABLE_BORDER_WIDTH: number = 2;
    public static DROPPABLE_BORDER_STYLE: BorderStyle = BorderStyle.Dashed;
    public static DROPPABLE_BORDER_RADIUS: number = 5;

    public static DEFAULT_TEXT_STYLE : TextControlStyle = TextControlStyle.LABELED;
    public static DEFAULT_TEXT_SIZE : TextControlSize = TextControlSize.STANDARD;

    public static FORM_MODE: string[] = [
        FormDesignConstants.FORM_MODE_TABLET_HORIZONTAL,
        FormDesignConstants.FORM_MODE_TABLET_VERTICAL,
        FormDesignConstants.FORM_MODE_PHONE_HORIZONTAL,
        FormDesignConstants.FORM_MODE_PHONE_VERTICAL,
        FormDesignConstants.FORM_MODE_GRAY,
        FormDesignConstants.FORM_MODE_WHITE,
        FormDesignConstants.FORM_MODE_PAPER,
        FormDesignConstants.FORM_MODE_OUTLINE
    ];

    public static FORM_DATA_MODE: string[] = [
        FormDesignConstants.FORM_DATA_MODE_CURRENT,
        FormDesignConstants.FORM_DATA_MODE_NONE,
        FormDesignConstants.FORM_DATA_MODE_SAMPLE1,
        FormDesignConstants.FORM_DATA_MODE_SAMPLE2,
    ];

    public static BORDER_STYLES: string[] = [
        BorderStyle.Solid,
        BorderStyle.Dashed,
        BorderStyle.Dotted,
        BorderStyle.Double,
        BorderStyle.Groove
    ]

    public static TAB_ORIENTATION: string[] = [
        TabOrientation.Horizontal,        
        TabOrientation.Veritical
    ];


}


// TODO:  WHAT IS THIS FOR
export interface IDesignPanelConfig {
    mode: string;
	data: string;
}

