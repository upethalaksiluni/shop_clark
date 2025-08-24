// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { CategoryService } from '../../services/category.service';
// import { Category } from '../../models/category.model';
// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// @Component({
//   selector: 'app-category-filter-form',
//   templateUrl: './category-filter-form.component.html',
//   styleUrls: ['./category-filter-form.component.css']
// })
// export class CategoryFilterFormComponent implements OnInit {
//   filterForm: FormGroup;
//   allCategories: Category[] = [];
//   filteredCategories: Category[] = [];
//   isLoading = true;
//   error: string | null = null;

//   @Output() categoriesFiltered = new EventEmitter<Category[]>();

//   constructor(
//     private fb: FormBuilder,
//     private categoryService: CategoryService
//   ) {
//     this.filterForm = this.fb.group({
//       searchTerm: ['']
//     });
//   }

//   ngOnInit() {
//     this.loadCategories();
//     this.setupSearchFilter();
//   }

//   private loadCategories() {
//     this.categoryService.getCategories().subscribe({
//       next: (categories) => {
//         this.allCategories = categories;
//         this.filteredCategories = categories;
//         this.isLoading = false;
//         this.categoriesFiltered.emit(this.filteredCategories);
//       },
//       error: (error) => {
//         console.error('Error loading categories:', error);
//         this.error = 'Failed to load categories. Please try again later.';
//         this.isLoading = false;
//       }
//     });
//   }

//   private setupSearchFilter() {
//     this.filterForm.get('searchTerm')?.valueChanges
//       .pipe(
//         debounceTime(300),
//         distinctUntilChanged()
//       )
//       .subscribe(searchTerm => {
//         this.filterCategories(searchTerm);
//       });
//   }

//   private filterCategories(searchTerm: string) {
//     if (!searchTerm || searchTerm.trim() === '') {
//       this.filteredCategories = this.allCategories;
//     } else {
//       const term = searchTerm.toLowerCase().trim();
//       this.filteredCategories = this.allCategories.filter(category => {
//         const formattedName = this.categoryService.formatCategoryName(category.slug).toLowerCase();
//         const slug = category.slug.toLowerCase();
//         return formattedName.includes(term) || slug.includes(term);
//       });
//     }
//     this.categoriesFiltered.emit(this.filteredCategories);
//   }

//   clearSearch() {
//     this.filterForm.get('searchTerm')?.setValue('');
//   }

//   formatCategoryName(slug: string): string {
//     return this.categoryService.formatCategoryName(slug);
//   }
// }