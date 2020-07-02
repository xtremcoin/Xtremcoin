import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpasswordComponent } from './recoverpassword.component';

describe('RecoverpasswordComponent', () => {
  let component: RecoverpasswordComponent;
  let fixture: ComponentFixture<RecoverpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
