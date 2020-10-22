import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DigComponent } from './dig.component';

describe('DigComponent', () => {
  let component: DigComponent;
  let fixture: ComponentFixture<DigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
