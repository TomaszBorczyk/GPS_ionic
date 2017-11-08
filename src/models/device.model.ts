import { GPS } from './gps.model';

export interface Device {
    device_id: string;
    name: string;
    gpsData: Array<GPS>;
    date: Date;
}
