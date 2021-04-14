import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AwsService } from 'src/app/services/aws.service';
import { DigService } from 'src/app/services/dig.service';
import { PhotoService } from 'src/app/services/photo.service';
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

  constructor(private route: ActivatedRoute, private digService: DigService,
              private awsService: AwsService, private router: Router,
              private loadingController: LoadingController,
              private photoService: PhotoService,
              ) { }

  
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.route.paramMap.subscribe(data => {
      if (this.route.snapshot.paramMap.has('id')) {
        this.digId = +this.route.snapshot.paramMap.get('id');
        this.digService.getDig(this.digId).subscribe(data => {
          this.dig = data['dig'];
          this.paperworks = data['paperworks'];
        })
        this.digService.getAllUploads().subscribe(ups => {
          this.complete = ups;
          this.complete  = this.complete.filter(upload => {
            return (upload.dig.digId == this.digId);
          })
        })
        this.loadingController.dismiss();
      }
    })
  }

  upload(paperworkType) {
    const file = this.selectedFiles.item(0);
    let loader = this.presentLoading();
    let data = this.awsService.uploadFile(file).then(done => {
      this.digService.createUpload(paperworkType, file.name, this.digId).subscribe(async datas => {
        (await loader).dismiss();
        this.ionViewWillEnter();
      })
    });


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

  openWp() {
    this.router.navigateByUrl('/form/work-permit/'+this.digId);
  }

  openPi() {
    this.router.navigateByUrl('/form/pipe-inspect/'+this.digId);
  }

  openSi() {
    this.router.navigateByUrl('/form/corrosion-inspect/'+this.digId);
  }

  openEaf() {
    this.router.navigateByUrl('/form/encroachment-agree/'+this.digId);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

  return loading;
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }


}
