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
      username: new FormControl('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(20),
        this.usernameValidator
      ]),
      firstName: new FormControl('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(100)
      ]),
      lastName: new FormControl('', [
        Validators.required, 
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email
      ]),
      address: new FormGroup({
        street: new FormControl('', [
          Validators.required, 
          Validators.minLength(3)
        ]),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required)
      }),
      skills: new FormArray([this.createSkill()])
    });
  }

  createSkill(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      experience: new FormControl('', [
        Validators.required, 
        Validators.min(0),
        Validators.max(50)
      ]),
      rating: new FormControl(1, [
        Validators.required, 
        this.ratingValidator
      ])
    });
  }

  // Custom username validator
  usernameValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;
    
    // Username should contain only alphanumeric characters and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    
    if (!usernameRegex.test(value)) {
      return { invalidUsername: true };
    }
    
    // Username should not start with a number
    if (/^[0-9]/.test(value)) {
      return { startsWithNumber: true };
    }
    
    // Username should not be all numbers
    if (/^[0-9]+$/.test(value)) {
      return { allNumbers: true };
    }
    
    return null;
  }

  // Rating validator (fixed to be static)
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
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Form Submitted:', this.profileForm.value);
      // Handle form submission logic here
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.profileForm);
      alert('Please fill all required fields correctly.');
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

// createSkill() - Creates a new skill FormGroup
// addSkill() - Adds new skill to the FormArray
// removeSkill(index) - Removes skill at specific index
// get skills() - Getter to access the FormArray

// The markFormGroupTouched() method includes special handling for FormArray controls

// FormArray Import & Declaration
// typescriptimport { FormArray } from '@angular/forms';
// skills: new FormArray([this.createSkill()])