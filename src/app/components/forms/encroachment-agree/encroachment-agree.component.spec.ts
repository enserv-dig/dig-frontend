import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncroachmentAgreeComponent } from './encroachment-agree.component';

describe('EncroachmentAgreeComponent', () => {
  let component: EncroachmentAgreeComponent;
  let fixture: ComponentFixture<EncroachmentAgreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncroachmentAgreeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncroachmentAgreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
