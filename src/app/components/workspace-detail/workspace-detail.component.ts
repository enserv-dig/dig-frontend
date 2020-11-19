import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AwsService } from 'src/app/services/aws.service';
import { DigService } from 'src/app/services/dig.service';
import { threadId } from 'worker_threads';



@Component({
  selector: 'app-workspace-detail',
  templateUrl: './workspace-detail.component.html',
  styleUrls: ['./workspace-detail.component.scss'],
})
export class WorkspaceDetailComponent implements OnInit {
  digId: any;
  dig: any;
  paperworks: any;
  selectedFiles: FileList;
  complete: any;

  constructor(private route: ActivatedRoute, private digService: DigService, private awsService: AwsService, private router: Router) { }

  
  ngOnInit() {}

  ionViewWillEnter() {
    this.route.paramMap.subscribe(data => {
      if (this.route.snapshot.paramMap.has('id')) {
        this.digId = +this.route.snapshot.paramMap.get('id');
        this.digService.getDig(this.digId).subscribe(data => {
          this.dig = data['dig'];
          this.paperworks = data['paperworks'];
          console.log(this.paperworks);
        })
        this.digService.getAllUploads().subscribe(ups => {
          console.log(ups);
          this.complete = ups;
          this.complete  = this.complete.filter(upload => {
            return (upload.dig.digId == this.digId);
          })
          console.log(this.complete);
        })
      }
    })
  }

  upload(paperworkType) {
    const file = this.selectedFiles.item(0);
    let data = this.awsService.uploadFile(file);
    this.digService.createUpload(paperworkType, file.name, this.digId).subscribe(datas => {
    })
    }
    
    selectFile(event) {
    this.selectedFiles = event.target.files;
    }

  check(paperwork) {
    let flag = false;
    this.complete.map(com => {
      if(com.tag === paperwork.paperworkName){
        flag = true;
      }
    })
    return flag;
  }

  openSec(){
    this.router.navigateByUrl('/form/sec/'+this.digId);
  }


}
