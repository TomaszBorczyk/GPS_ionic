import { GPSActivity } from './gps.model';

export interface Device {
    deviceId: string;
    name: string;
    gpsData: Array<GPSActivity>;
    date: Date;
}
