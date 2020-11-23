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

  createWorkflow(workflowName: String, digIds: any) {
    return this.http.post('http://localhost:8080/workflow', {workflowName, digIds}).pipe(
      map(response => {
        console.log(digIds);
      })
    )
  }

  createUpload(tag: String, fileName: String, digId: Number) {
    return this.http.post('http://localhost:8080/upload', {tag, fileName, digId}).pipe(
      map(response => {
        console.log(response);
      })
    );
  }

  createWorkPermit(form, digId) {
    return this.http.post('http://localhost:8080/wpf', 
    {
      digId: digId,
      dateFrom: form.dateFrom,
      dateTo: form.dateTo,
      confinedSpace: form.confinedSpace,
      entryPurpose: form.entryPurpose,
      isolated: form.isolated,
      atmosphereTested: form.atmosphereTested,
      otherPermits: form.otherPermits,
      testEquipmentRequired: form.testEquipmentRequired,
      signsUsed: form.signsUsed,
      meetingDone: form.meetingDone,
      ventilationMethod: form.ventilationMethod,
      communicationMethod: form.communicationMethod,
      retrievalEquipment: form.retrievalEquipment,
      airMonitoring: form.airMonitoring,
      lightingRequired: form.lightingRequired,
      physicalHazards: form.physicalHazards,
      supervisorName: form.supervisorName,
      safetyAttendentName: form.safetyAttendentName,
      safetyAttendentNameAlt: form.safetyAttendentNameAlt,
      entrantName: form.entrantName,
      clockIn: form.clockIn,
      clockOut: form.clockOut,
      initialOxygen: form.initialOxygen,
      finalOxygen: form.finalOxygen,
      initialFlammability: form.initialFlammability,
      finalFlammability: form.finalFlammability,
      initialH2S: form.initialH2S,
      finalH2S: form.finalH2S,
      initialCO: form.initialCO,
      finalCO: form.finalCO,
      initialBenzene: form.initialBenzene,
      finalBenzene: form.finalBenzene,
      testerInitial: form.testerInitial,
      workType: form.workType,
      ventsProtected: form.ventsProtected,
      freeFromFlame: form.freeFromFlame,
      hotGuards: form.hotGuards,
      valvesChecked: form.valvesChecked,
      floorProtected: form.floorProtected,
      fireWatchAssigned: form.fireWatchAssigned,
      fireEquipmentInspected: form.fireEquipmentInspected,
      atmosphereSafe: form.atmosphereSafe,
      exchangeInitiated: form.exchangeInitiated,
      lineIdentified: form.lineIdentified,
      lineDrained: form.lineDrained,
      lineCleaned: form. lineCleaned,
      jumperRequired: form.jumperRequired,
      blindsInPlace: form.blindsInPlace,
      outOfServiceNotice: form.outOfServiceNotice,
      personOfNotice: form.personOfNotice,
      noticeTime: form.noticeTime,
      equipmentName: form.equipmentName,
      personInitial: form.personInitial,
      equipmentOutTime: form.equipmentOutTime,
      outAllNotified: form.outAllNotified,
      removePersonInitial: form.removePersonInitial,
      equipmentInTime: form.equipmentInTime,
      inAllNotified: form.inAllNotified
    }
    ).pipe(
      map(response => {
        console.log(response);
      })
    )
  }

  createExcavationWorksheet(form, digId) {
    return this.http.post('http://localhost:8080/sec', 
    {
      digId: digId,
      dateFrom: form.dateFrom,
      dateTo: form.dateTo,
      time: form.time,
      description: form.description,
      competentPerson: form.competentPerson,
      siteSupervisor: form.siteSupervisor,
      siteForeman: form.siteForeman,
      contractorCompetentPerson: form.contractorCompetentPerson,
      protectiveSystem: form.protectiveSystem,
      reviewStatus: form.reviewStatus,
      obstructions: form.obstructions,
      landOwners: form.landOwners,
      utilites: form.utilites,
      electrical: form.electrical,
      water: form.water,
      sewer: form.sewer,
      tools: form.tools,
      protectiveEquipments: form.protectiveEquipments,
      blackHoe: form.blackHoe,
      excavator: form.excavator,
      trenchBox: form.trenchBox,
      trenchShields: form.trenchShields,
      signs: form.signs,
      barricades: form.barricades,
      waterRemovalEquipment: form.waterRemovalEquipment,
      safetyObserver: form.safetyObserver,
      excavation4: form.excavation4,
      hazardCondition: form.hazardCondition,
      excavation20: form.excavation20,
      contractorAware: form.contractorAware,
      checklistPriorProvided: form.checklistPriorProvided,
      contractorAdvised: form.contractorAdvised,
    }
    ).pipe(
      map(response => {
        console.log(response);
      })
    )
    
  }

  getAllWorkflows() {
    return this.http.get('http://localhost:8080/workflow').pipe(
      map(response => response)
    );
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
    return this.http.get<Dig>('http://localhost:8080/dig').pipe(
      map(response =>  response)
    );
  }

  getAllPipelines() {
    return this.http.get('http://localhost:8080/pipeline').pipe(
      map(response => response)
    );
  }

  getAllPaperworks() {
    return this.http.get('http://localhost:8080/paperwork').pipe(
      map(response => response)
    );
  }

  getPaperworksByType(paperworkTypeId: Number) {
    return this.http.post('http://localhost:8080/paperwork/type', {paperworkTypeId}).pipe(
      map(response => response)
    );
  }

  getPaperwork(paperworkName: String) {
    return this.http.post('http://localhost:8080/paperwork/name', {paperworkName}).pipe(
      map(response => response)
    );
  }

  getAllPaperworkTypes() {
    return this.http.get('http://localhost:8080/paperworkType').pipe(
      map(response => response)
    );
  }

  getAllUploads() {
    return this.http.get('http://localhost:8080/upload').pipe(
      map(response => response)
    );
  }

  getWorkflow(id: Number) {
    return this.http.get(`http://localhost:8080/workflow/${id}`).pipe(
      map(response => response)
    );
  }

  getDig(id: Number) {
    return this.http.get(`http://localhost:8080/dig/${id}`).pipe(
      map(response => response)
    );
  }

  setRepairStatus(repairStatus: String, workflowId: Number) {
    return this.http.patch('http://localhost:8080/workflow', {repairStatus, workflowId}).pipe(
      map(response => response)
    );
  }

  assignPaperworkToWorkflow(workflowId: Number, paperworkId: Number) {
    return this.http.post('http://localhost:8080/paperwork', {workflowId, paperworkId}).pipe(
      map(response => response)
    );
  }

  removePaperworkFromWorkflow(workflowId: Number, paperworkId: Number) {
    return this.http.post('http://localhost:8080/paperwork/remove', {workflowId, paperworkId}).pipe(
      map(response => response)
    );
  }


}

interface Client {
  clientId: number,
  clientName: String,
  clientStatus: boolean
}

