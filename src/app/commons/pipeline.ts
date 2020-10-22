export class Pipeline {
    pipelineName: String;
    pipelineStatus: String;
    facilityId: String;

    constructor(pipelineName: String, pipelineStatus: String, facilityId: String) {
        this.pipelineName = pipelineName;
        this.pipelineStatus = pipelineStatus;
        this.facilityId = facilityId;
    }
}
