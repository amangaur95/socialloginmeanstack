import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialprofileComponent } from './socialprofile.component';

describe('SocialprofileComponent', () => {
  let component: SocialprofileComponent;
  let fixture: ComponentFixture<SocialprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
