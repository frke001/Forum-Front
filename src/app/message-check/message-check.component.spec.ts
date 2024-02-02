import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCheckComponent } from './message-check.component';

describe('MessageCheckComponent', () => {
  let component: MessageCheckComponent;
  let fixture: ComponentFixture<MessageCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
