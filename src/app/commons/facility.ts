import { Client } from './client';

export class Facility {
    facilityName: String;
    facilityStatus: String;
    client: String;
    constructor(facilityName: String, facilityStatus: String, client: String) {
        this.facilityName = facilityName;
        this.facilityStatus = facilityStatus;
        this.client = client;
    }
}
