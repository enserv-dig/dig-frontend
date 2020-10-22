import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Dig } from '../commons/dig';
import { Facility } from '../commons/facility';


@Injectable({
  providedIn: 'root'
})
export class DigService {

  @Output() addItem = new EventEmitter();
  
  constructor(private http: HttpClient) { }

  uploadCsv(data: String[]) {
    return this.http.post<Dig[]>('http://localhost:8080/dig', {data}).pipe(
      map(response => {
      })
    );
  }

  createClient(clientName: String, clientActive: String) {
    return this.http.post<Client>('http://localhost:8080/client', {clientName,clientActive}).pipe(
      map(response => {
      })
    );
  }

  createFacility(facilityName: String, facilityStatus: String, client: String) {
    return this.http.post('http://localhost:8080/facility', {facilityName,facilityStatus, client}).pipe(
      map(response => {
      })
    );
  }

  createPipeline(pipelineName: String, activePipeline: String, facilityId: Number) {
    return this.http.post('http://localhost:8080/pipeline', {pipelineName, activePipeline, facilityId}).pipe(
      map(response => {
      })
    )
  }

  getAllClients() {
    return this.http.get('http://localhost:8080/client').pipe(
      map(response => response)
    );
  }

  getAllFacilities() {
    return this.http.get('http://localhost:8080/facility').pipe(
      map(response =>  response)
    );
  }

  getAllDigs() {
    return this.http.get('http://localhost:8080/dig').pipe(
      map(response =>  response)
    );
  }

  getAllPipelines() {
    return this.http.get('http://localhost:8080/pipeline').pipe(
      map(response => response)
    );
  }


}

interface Client {
  clientId: number,
  clientName: String,
  clientStatus: boolean
}

