import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form-component.component.html',
  styleUrls: ['./product-form-component.component.css']
})
export class ProductFormComponentComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]), // Added minLength validator
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        street: new FormControl('', [Validators.required, Validators.minLength(3)]),
        city: new FormControl('', Validators.required), // Added required validator
        country: new FormControl('', Validators.required) // Added required validator
      }),
      skills: new FormArray([this.createSkill()])
    });
  }

  createSkill(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      experience: new FormControl('', [Validators.required, Validators.min(0)]),
      rating: new FormControl(1, [Validators.required, this.ratingValidator])
    });
  }

  // Fixed: Made static method for proper validator usage
  ratingValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (value < 1 || value > 5) {
      return { invalidRating: true };
    }
    return null;
  }

  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) { // Prevent removing all skills
      this.skills.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Form Submitted:', this.profileForm.value);
      // Handle form submission logic here
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.profileForm);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }
}