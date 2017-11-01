import { Device } from './device.model';

export interface User {
    email: string;
    id?: string;
    devices?: Array<Device>;
}
