import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotasPage } from './rotas.page';

describe('RotasPage', () => {
  let component: RotasPage;
  let fixture: ComponentFixture<RotasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
