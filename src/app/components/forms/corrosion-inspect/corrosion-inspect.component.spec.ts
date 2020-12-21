import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorrosionInspectComponent } from './corrosion-inspect.component';

describe('CorrosionInspectComponent', () => {
  let component: CorrosionInspectComponent;
  let fixture: ComponentFixture<CorrosionInspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrosionInspectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrosionInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
