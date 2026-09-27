import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adit } from './adit';

describe('Adit', () => {
  let component: Adit;
  let fixture: ComponentFixture<Adit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
