import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAccountComponent } from './header-account.component';

describe('HeaderAccountComponent', () => {
  let component: HeaderAccountComponent;
  let fixture: ComponentFixture<HeaderAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
