import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form-component.component.html',
  styleUrls: ['./product-form-component.component.css']
})
export class ProductFormComponentComponent {
profileForm: FormGroup = new FormGroup ({});

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3) , Validators.maxLength(100)]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        street: new FormControl('', [Validators.required, Validators.minLength(3)]),
        city: new FormControl(''),
        country: new FormControl('')
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

  ratingValidator(control: AbstractControl){
    const value = control.value;
    if (value < 1 || value > 5) return { invalidRating: true};
    return null;
  }

  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  addSkill(){
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number){
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    } else {
      this.profileForm.markAsTouched();
    }
  }
}

