import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Asegúrate de importar Router y RouterLink
import { Router, RouterLink } from '@angular/router';
import { FormUser } from '../../interfaces/user';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterPage {
  isLoading = false;
  errorRegister = false;

  userService = inject(UsersService);
  // 1. Inyectas el servicio Router
  router = inject(Router);

  async register(form: FormUser) {
    this.errorRegister = false;
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.password2 ||
      form.password !== form.password2
    ) {
      this.errorRegister = true;
      return;
    }

    this.isLoading = true;
    const ok = await this.userService.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    this.isLoading = false;

    if (!ok) {
      this.errorRegister = true;
    } else {
      // 2. Si el registro es exitoso, navegas a otra página
      this.router.navigate(['/login']);
    }
  }
}