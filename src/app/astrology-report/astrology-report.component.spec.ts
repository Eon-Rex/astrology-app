import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AstrologyReportComponent } from './astrology-report.component';
import {AstrologyReport} from '../model/astrology-report';

describe('AstrologyReportComponent', () => {
  let component: AstrologyReportComponent;
  let fixture: ComponentFixture<AstrologyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstrologyReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstrologyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
