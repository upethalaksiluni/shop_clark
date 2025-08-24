import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFilterFormComponent } from './category-filter-form.component';

describe('CategoryFilterFormComponent', () => {
  let component: CategoryFilterFormComponent;
  let fixture: ComponentFixture<CategoryFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryFilterFormComponent]
    });
    fixture = TestBed.createComponent(CategoryFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
