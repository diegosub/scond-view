import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesaViewComponent } from './despesa-view.component';


describe('DespesaViewComponent', () => {
  let component: DespesaViewComponent;
  let fixture: ComponentFixture<DespesaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
