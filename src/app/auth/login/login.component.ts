import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../interfaces/auth.interfaces';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, InputTextModule, ButtonModule, PasswordModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nombre : ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const credentials: LoginRequest = this.form.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Login exitoso', detail: 'Bienvenido' });
        this.router.navigate(['/productos']);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas' });
      }
    });
  }
}
