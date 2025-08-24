import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css']
})
export class CategoryGridComponent implements OnInit {
  categories: Category[] = [];
  displayCategories: Category[] = [];
  isLoading = true;
  error: string | null = null;
  display = false;
  filterForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      filter: [''],
      sort: ['asc']
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.setupFormSubscriptions();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.displayCategories = [...categories]; 
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Failed to load categories. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  private setupFormSubscriptions() {
    this.filterForm.valueChanges.subscribe((value: any) => {
      console.log(value);
    });

    this.filterForm.get('filter')?.valueChanges.subscribe((value: any) => {
      console.log(value);
      if (value) {
        this.displayCategories = this.categories.filter((category: Category) => 
          category.name.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.displayCategories = [...this.categories];
      }
    });

    this.filterForm.get('sort')?.valueChanges.subscribe((value: any) => {
      console.log(value);
      this.display = value === 'desc';
      
      this.displayCategories.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        
        if (value === 'desc') {
          return nameB.localeCompare(nameA);
        } else {
          return nameA.localeCompare(nameB);
        }
      });
    });
  }

  formatCategoryName(slug: string): string {
    return this.categoryService.formatCategoryName(slug);
  }

  retryLoading() {
    this.isLoading = true;
    this.error = null;
    this.loadCategories();
  }
}