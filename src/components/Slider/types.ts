interface ISliderItem {
    label: string;
    onItemClick?: (index: number) => void;
}

export interface ISliderProps {
    items: ISliderItem[];
    selectedIndex: number;
    sliderItemClass?: string;
}
