import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddListComponent } from './room-add-list.component';

describe('RoomAddListComponent', () => {
  let component: RoomAddListComponent;
  let fixture: ComponentFixture<RoomAddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAddListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
