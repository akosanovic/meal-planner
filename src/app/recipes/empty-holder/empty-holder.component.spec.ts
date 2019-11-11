import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyHolderComponent } from './empty-holder.component';

describe('EmptyHolderComponent', () => {
  let component: EmptyHolderComponent;
  let fixture: ComponentFixture<EmptyHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
