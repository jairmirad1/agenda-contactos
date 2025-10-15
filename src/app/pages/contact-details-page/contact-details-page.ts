import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts-service';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/contacto';
import { Toast } from '../../utils/modals';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage implements OnInit {
  idContacto = input.required<string>();
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  router = inject(Router);

  async ngOnInit() {
    if (this.idContacto()) {
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.idContacto());
      if (!this.contacto) this.cargandoContacto = true;
      const res = await this.contactService.getContactById(this.idContacto());
      if (res) this.contacto = res;
      this.cargandoContacto = false;
    }
  }

  async toggleFavorite() {
    if (this.contacto) {

        await this.contactService.setFavourite(this.contacto.id);
        this.contacto.isFavorite = !this.contacto.isFavorite;

        Toast.fire({
          icon: 'success',
          title: this.contacto.isFavorite ? '¡Agregado a favoritos!' : 'Eliminado de favoritos'
        });
    }
  }

  async deleteContact() {
    if (!this.contacto) {
      console.error("No hay ningún contacto seleccionado para eliminar.");
      return;
    }

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "var(--color-dorado)",
      confirmButtonText: "Sí, ¡eliminar!",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        await this.contactService.deleteContact(this.contacto.id);

        Toast.fire({
          icon: 'success',
          title: 'Contacto eliminado'
        });

        this.router.navigate(['/']);

      } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el contacto.",
          icon: "error"
        });
      }
    }
  }
}