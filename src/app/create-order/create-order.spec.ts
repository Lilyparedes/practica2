import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrder } from './create-order';

describe('CreateOrder', () => {
  let component: CreateOrder;
  let fixture: ComponentFixture<CreateOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrder]
    }).compileComponents();

    //  Creamos el componente de prueba
    fixture = TestBed.createComponent(CreateOrder);
    component = fixture.componentInstance;

    //  Detectamos cambios en el DOM del componente
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
