export interface IHistoryDates {
    id: number;
    title: string;
    firstDate: number;
    lastDate: number;
    dates: IHistoryDatesItem[];
}

interface IHistoryDatesItem {
    id: number;
    title: number;
    text: string;
}
