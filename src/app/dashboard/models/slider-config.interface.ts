export interface SliderConfig {
    start: number;
    range: {
        min: number,
        max: number
    };
    step?: number;
    tooltips: any;
    connect: boolean;
    behaviour?: string;
}
