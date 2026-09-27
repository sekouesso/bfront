import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Banksignal } from './banksignal';

describe('Banksignal', () => {
  let component: Banksignal;
  let fixture: ComponentFixture<Banksignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banksignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Banksignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
