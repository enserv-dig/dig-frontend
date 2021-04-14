import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Dig } from '../commons/dig';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DigService {

  @Output() addItem = new EventEmitter();


  // environmentbackendUrl = 'http://ec2-18-222-177-129.us-east-2.compute.amazonaws.com:8080';
  environmentbackendUrl = 'http://localhost:8080';
  
  
  // environmentbackendUrl = 'http://enservesolutions.us-east-2.elasticbeanstalk.com';

  
  constructor(private http: HttpClient) { }

  uploadCsv(data: String[]) {
    return this.http.post<Dig[]>(this.environmentbackendUrl + '/dig', {data}).pipe(
      map(response => {
      })
    );
  }

  createClient(clientName: String, clientActive: String) {
    return this.http.post<Client>(this.environmentbackendUrl + '/client', {clientName,clientActive}).pipe(
      map(response => {
      })
    );
  }

  updateClient(clientId: Number) {
    return this.http.post<Client>(this.environmentbackendUrl + '/client/update', {clientId}).pipe(
      map(response => {

      })
    );
  }

  updatePipeline(pipelineId: Number) {
    return this.http.post(this.environmentbackendUrl + '/pipeline/update', {pipelineId}).pipe(
      map(response => {

      })
    );
  }


  updateFacility(facilityId: Number) {
    return this.http.post(this.environmentbackendUrl + '/facility/update', {facilityId}).pipe(
      map(response => {

      })
    );
  }

  createFacility(facilityName: String, facilityStatus: String, client: String) {
    return this.http.post(this.environmentbackendUrl + '/facility', {facilityName,facilityStatus, client}).pipe(
      map(response => {
      })
    );
  }

  createPipeline(pipelineName: String, activePipeline: String, facilityId: Number) {
    return this.http.post(this.environmentbackendUrl + '/pipeline', {pipelineName, activePipeline, facilityId}).pipe(
      map(response => {
      })
    )
  }

  createWorkflow(workflowName: String, digIds: any) {
    return this.http.post(this.environmentbackendUrl + '/workflow', {workflowName, digIds}).pipe(
      map(response => {
        console.log(digIds);
      })
    )
  }

  setStepToWorkflow(step: number, workflowId: number) {
    return this.http.post(this.environmentbackendUrl + '/workflow/step', {step, workflowId}).pipe(
      map(response => {
        console.log(response);
      })
    )
  }

  setPPTypeToWorkflow(paperworkTypeId: number, workflowId: number) {
    return this.http.post(this.environmentbackendUrl + '/workflow/pptype', {paperworkTypeId, workflowId}).pipe(
      map(response => {
        console.log(response);
      })
    )
  }

  createUpload(tag: String, fileName: String, digId: Number) {
    return this.http.post(this.environmentbackendUrl + '/upload', {tag, fileName, digId}).pipe(
      map(response => {
        console.log(response);
      })
    );
  }

  createPipeInspection(form, digId) {
    return this.http.post(this.environmentbackendUrl + '/pif',
    {
      digId: digId,
      inspectionDate: form.dateFrom,
      location: form.location,
      inspectionName: form.inspectionName,
      exposeReason: form.exposeReason,
      inspectorQualified: form.inspectorQualified,
      cathodicProtection: form.cathodicProtection,
      pipeReading: form.pipeReading,
      bareOrCoated: form.bareOrCoated,
      coatingType: form.coatingType,
      coatingCondition: form.coatingCondition,
      pipelineCondition: form.pipelineCondition,
      internalPipelineCondition: form.internalPipelineCondition,
      signature: form.signature,
      company: form.company,
      title: form.title
    }).pipe(
      map(response => {
        console.log(response);
      })
    )
  }

  createEncroachmentAgree(form, digId) {
    return this.http.post(this.environmentbackendUrl + '/eaf',
    {
      digId: digId,
      dateFrom: form.digFrom,
      companyName: form.companyName,
      sectionNumber: form.sectionNumber,
      legalDescription: form.legalDescription,
      county: form.county,
      state: form.state,
      alignmentSheetNumber: form.alignmentSheetNumber,
      milePost: form.milePost,
      tractNumber: form.tractNumber,
      encroachmentType: form.encroachmentType,
      ticketNumber: form.ticketNumber,
      callPerson: form.callPerson,
      dispatchPerson: form.dispatchPerson,
      activity: form.activity,
      remarks: form.remarks,
      followUpAction: form.followUpAction,
      explaination: form.explaination,
      personMet: form.personMet,
      partyName: form.partyName,
      partyTitle: form.partyTitle,
      partyCompany: form.partyCompany,
      partyAddress: form.partyAddress,
      partyCity: form.partyCity,
      partyState: form.partyState,
      partyZip: form.partyZip,
      partyPhone: form.partyPhone,
      referencePoint: form.referencePoint,
      referencePointEsn: form.referencePointEsn,
      distAndDirFromReference: form.distAndDirFromReference,
      calcEsnCrossing: form.calcEsnCrossing,
      facilitySize: form.facilitySize,
      encased: form.encased,
      encaseSize: form.encaseSize,
      casingType: form.casingType,
      coatingType: form.coatingType,
      pipelineCoatingType: form.pipelineCoatingType,
      pipelineCoatingCondition: form.pipelineCoatingCondition,
      psGround: form.psGround,
      psDitch: form.psDitch,
      pipelineCondition: form.pipelineCondition,
      companyContact: form.companyContact,
      emergency: form.emergency,
      companyRep: form.companyRep,
      phoneNumber: form.phoneNumber,
      encroachingPartyRep: form.encroachingPartyRep,
      personMetRep: form.personMetRep
  
    }).pipe(
      map(response => {
        console.log(response);
      })
    )
  }

  createCorrosionInspection(form, digId) {
    return this.http.post(this.environmentbackendUrl + '/cif',
    {
      digId: digId,
      dateFrom: form.dateFrom,
      segmentName: form.segmentName,
      inspectorQualified: form.inspectorQualified,
      supervisorApproved: form.supervisorApproved,
      removeReason: form.removeReason,
      location: form.location,
      locationName: form.locationName,
      inWayOf: form.inWayOf,
      city: form.city,
      county: form.county,
      state: form.state,
      cathodicProtection: form.cathodicProtection,
      pipeReading: form.pipeReading,
      bareOrCoated: form.bareOrCoated,
      coatingType: form.coatingType,
      coatingCondition: form.coatingCondition,
      pipelineCondition: form.pipelineCondition,
      outerDiameter: form.outerDiameter,
      wallThickness: form.wallThickness,
      lengthFrom: form.from,
      lengthTo: form.to,
      grade: form.grade,
      internalConditionDesc: form.internalConditionDesc,
      internalCondition: form.internalCondition,
      corrLength: form.corrLength,
      deepestDefect: form.deepestDefect,
      wallThicknessLossPercentage: form.wallThicknessLossPercentage,
      largestCorrPitDiameter: form.largestCorrPitDiameter,
      sentToLab: form.sentToLab,
      labName: form.labName,
      labAddress: form.labAddress,
      completedBy: form.completedBy
    }).pipe(
      map(response => {
        console.log(response);
      })
    )
  }

  createWorkPermit(form, digId) {
    return this.http.post(this.environmentbackendUrl + '/wpf', 
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
    return this.http.post(this.environmentbackendUrl + '/sec', 
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
    return this.http.get(this.environmentbackendUrl + '/workflow').pipe(
      map(response => response)
    );
  }

  getAllClients() {
    return this.http.get(this.environmentbackendUrl + '/client').pipe(
      map(response => response)
    );
  }

  getAllFacilities() {
    return this.http.get(this.environmentbackendUrl + '/facility').pipe(
      map(response =>  response)
    );
  }

  getAllDigs() {
    return this.http.get<Dig>(this.environmentbackendUrl + '/dig').pipe(
      map(response =>  response)
    );
  }

  getNonAssignedDigs() {
    return this.http.get<Dig>(this.environmentbackendUrl + '/dig/na').pipe(
      map(response =>  response)
    );
  }

  getDigsWithWork() {
    return this.http.get<Dig>(this.environmentbackendUrl + '/dig/work').pipe(
      map(response => response)
    );
  }

  getAllPipelines() {
    return this.http.get(this.environmentbackendUrl + '/pipeline').pipe(
      map(response => response)
    );
  }

  getAllPaperworks() {
    return this.http.get(this.environmentbackendUrl + '/paperwork').pipe(
      map(response => response)
    );
  }

  getPaperworksByType(paperworkTypeId: Number) {
    return this.http.post(this.environmentbackendUrl + '/paperwork/type', {paperworkTypeId}).pipe(
      map(response => response)
    );
  }

  getPaperwork(paperworkName: String) {
    return this.http.post(this.environmentbackendUrl + '/paperwork/name', {paperworkName}).pipe(
      map(response => response)
    );
  }

  getAllPaperworkTypes() {
    return this.http.get(this.environmentbackendUrl + '/paperworkType').pipe(
      map(response => response)
    );
  }

  getAllUploads() {
    return this.http.get(this.environmentbackendUrl + '/upload').pipe(
      map(response => response)
    );
  }

  getWorkflow(id: Number) {
    return this.http.get(this.environmentbackendUrl + `/workflow/${id}`).pipe(
      map(response => response)
    );
  }

  assignDigToWorkflow(workflowId: Number, digIds: any) {
    return this.http.post(this.environmentbackendUrl + '/workflow/set', {workflowId, digIds}).pipe(
      map(response => {
      })
    )

  }

  getDig(id: Number) {
    return this.http.get(this.environmentbackendUrl + `/dig/${id}`).pipe(
      map(response => response)
    );
  }

  setRepairStatus(repairStatus: String, workflowId: Number) {
    return this.http.patch(this.environmentbackendUrl + '/workflow', {repairStatus, workflowId}).pipe(
      map(response => response)
    );
  }

  assignPaperworkToWorkflow(workflowId: Number, paperworkId: Number) {
    return this.http.post(this.environmentbackendUrl + '/paperwork', {workflowId, paperworkId}).pipe(
      map(response => response)
    );
  }

  removePaperworkFromWorkflow(workflowId: Number, paperworkId: Number) {
    return this.http.post(this.environmentbackendUrl + '/paperwork/remove', {workflowId, paperworkId}).pipe(
      map(response => response)
    );
  }


}

interface Client {
  clientId: number,
  clientName: String,
  clientStatus: boolean
}

