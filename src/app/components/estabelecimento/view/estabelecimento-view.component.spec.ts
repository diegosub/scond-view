import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoViewComponent } from './estabelecimento-view.component';

describe('EstabelecimentoViewComponent', () => {
  let component: EstabelecimentoViewComponent;
  let fixture: ComponentFixture<EstabelecimentoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabelecimentoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
