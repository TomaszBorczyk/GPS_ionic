import { Coord } from './coords.model';

export interface GPSActivity {

    // constructor(
    //     public wakeupTime: Date,
    //     public coords: Array<Coord>
    // ) { }
    wakeupTime: Date;
    coords: Array<Coord>;

    // public sayHello(): void {
    //     console.log('hello');
    // }
}

