import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clientupload } from './clientupload';

describe('Clientupload', () => {
  let component: Clientupload;
  let fixture: ComponentFixture<Clientupload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clientupload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clientupload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
