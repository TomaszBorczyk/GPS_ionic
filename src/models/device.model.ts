import { GPS } from './gps.model';

export interface Device {
    name: string;
    gpsData: Array<GPS>;
    date: Date;
}
