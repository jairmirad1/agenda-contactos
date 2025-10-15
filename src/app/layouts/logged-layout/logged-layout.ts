import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
  authService = inject(Auth)
  showlogout(){
  Swal.fire({
  title: "¿Cerrar sesión?",
  icon: "question",
  cancelButtonText:"Cancelar",
  showCancelButton: true,
  confirmButtonColor: "#df2828ff",
  cancelButtonColor: "var(--color-dorado)",
  confirmButtonText: "Cerrar sesión"
}).then((result) => {
  if (result.isConfirmed) {
    this.authService.logout()
  }
});
}

}









