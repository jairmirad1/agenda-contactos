import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Toast } from '../../utils/modals';

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  index = input.required<number>();
  contacto = input.required<Contact>();

  contactsService = inject(ContactsService)

  showDeleteContact() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "var(--color-dorado)",
      confirmButtonText: "Sí, ¡eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactsService.deleteContact(this.contacto().id)
        Toast.fire({
          title: "Usuario Borrado",
          icon: "success"
        });
      }
    });
  }
}