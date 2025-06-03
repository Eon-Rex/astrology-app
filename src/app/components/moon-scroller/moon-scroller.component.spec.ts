import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonScrollerComponent } from './moon-scroller.component';

describe('MoonScrollerComponent', () => {
  let component: MoonScrollerComponent;
  let fixture: ComponentFixture<MoonScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonScrollerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
