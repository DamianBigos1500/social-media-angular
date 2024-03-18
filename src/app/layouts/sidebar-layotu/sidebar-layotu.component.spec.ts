import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLayotuComponent } from './sidebar-layotu.component';

describe('SidebarLayotuComponent', () => {
  let component: SidebarLayotuComponent;
  let fixture: ComponentFixture<SidebarLayotuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLayotuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarLayotuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
