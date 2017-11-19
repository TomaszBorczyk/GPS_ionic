import { Device } from './device.model';

export interface User {
    email: string;
    _id?: string;
    devices?: Array<Device>;
}
