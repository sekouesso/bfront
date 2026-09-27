import {Component, inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {BankService} from '../bank.service';
import {Router} from '@angular/router';
import {Client} from '../shared/bankModel';

@Component({
  selector: 'app-add-client',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-client.html',
  styleUrl: './add-client.css',
})
export class AddClient {
  private bankService = inject(BankService);
  private router = inject(Router);

  // Modèle de données lié au formulaire via [(ngModel)]
  clientData: Client = {
    nom: '',
    telephone: '',
    email: '',
    statut: 'ACTIF'
  };

  // Options du Dropdown
  statuts = [
    { label: 'Actif', value: 'ACTIF' },
    { label: 'Inactif', value: 'INACTIF' },
    { label: 'Suspendu', value: 'SUSPENDU' }
  ];

  saveClient(form: NgForm): void {
    if (form.valid) {
      this.bankService.createClient(this.clientData).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'enregistrement du client :', err);
        }
      });
    }
  }
}
