import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeProductsComponent } from './visualize-products.component';

describe('VisualizeProductsComponent', () => {
  let component: VisualizeProductsComponent;
  let fixture: ComponentFixture<VisualizeProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizeProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
