import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;
  isSubmitting: boolean = false;
  loginType: 'username' | 'email' = 'username'; // Toggle between username and email

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      loginIdentifier: new FormControl('', [
        Validators.required,
        this.loginIdentifierValidator.bind(this)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        this.passwordValidator
      ]),
      rememberMe: new FormControl(false)
    });
  }

  // Custom validator for login identifier (username or email based on toggle)
  loginIdentifierValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    if (this.loginType === 'email') {
      return this.emailValidator(control);
    } else {
      return this.usernameValidator(control);
    }
  }

  // Email validator
  emailValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(value)) {
      return { invalidEmail: true };
    }

    // Check for common email issues
    if (value.includes('..')) {
      return { consecutiveDots: true };
    }

    if (value.startsWith('.') || value.endsWith('.')) {
      return { startsOrEndsWithDot: true };
    }

    return null;
  }

  // Username validator
  usernameValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;
    
    // Username should be 3-20 characters
    if (value.length < 3) {
      return { minLength: { requiredLength: 3, actualLength: value.length } };
    }
    
    if (value.length > 20) {
      return { maxLength: { requiredLength: 20, actualLength: value.length } };
    }

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

    // Check for reserved usernames
    const reservedUsernames = ['admin', 'administrator', 'root', 'user', 'test', 'guest'];
    if (reservedUsernames.includes(value.toLowerCase())) {
      return { reservedUsername: true };
    }
    
    return null;
  }

  // Password validator
  passwordValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const errors: any = {};

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
      errors.noUppercase = true;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(value)) {
      errors.noLowercase = true;
    }

    // Check for at least one digit
    if (!/\d/.test(value)) {
      errors.noDigit = true;
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      errors.noSpecialChar = true;
    }

    // Check for no spaces
    if (/\s/.test(value)) {
      errors.hasSpaces = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  // Toggle between username and email login
  toggleLoginType(): void {
    this.loginType = this.loginType === 'username' ? 'email' : 'username';
    
    // Reset the loginIdentifier control to trigger re-validation
    const loginIdentifierControl = this.loginForm.get('loginIdentifier');
    if (loginIdentifierControl) {
      const currentValue = loginIdentifierControl.value;
      loginIdentifierControl.setValue('');
      loginIdentifierControl.setValue(currentValue);
      loginIdentifierControl.updateValueAndValidity();
    }
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Get login identifier placeholder text
  getLoginPlaceholder(): string {
    return this.loginType === 'email' ? 'Enter your email address' : 'Enter your username';
  }

  // Get login identifier label text
  getLoginLabel(): string {
    return this.loginType === 'email' ? 'Email Address' : 'Username';
  }

  // Form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      
      const formData = {
        loginIdentifier: this.loginForm.get('loginIdentifier')?.value,
        password: this.loginForm.get('password')?.value,
        rememberMe: this.loginForm.get('rememberMe')?.value,
        loginType: this.loginType
      };

      console.log('Login Form Submitted:', formData);

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Login successful! (This is a demo)');
        // Here you would typically call your authentication service
        // this.authService.login(formData).subscribe(...)
      }, 2000);

    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.loginForm);
      alert('Please fix the form errors before submitting.');
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Reset form
  resetForm(): void {
    this.loginForm.reset();
    this.showPassword = false;
    this.isSubmitting = false;
    this.loginType = 'username';
    this.initializeForm();
  }
}