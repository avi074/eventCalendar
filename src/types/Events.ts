export interface Event {
    id: number;
    title: string;
    color: string;
    description?: string;
    startTime: string;
    endTime: string;
}

export interface EventsByDate {
    [date: string]: Event[];
}
