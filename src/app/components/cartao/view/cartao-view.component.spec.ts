import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoViewComponent } from './cartao-view.component';


describe('CartaoViewComponent', () => {
  let component: CartaoViewComponent;
  let fixture: ComponentFixture<CartaoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
