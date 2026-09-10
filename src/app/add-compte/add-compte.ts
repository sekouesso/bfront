import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BankService} from '../bank.service';
import {Router} from '@angular/router';
import {Client} from '../shared/bankModel';


@Component({
  selector: 'app-account-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-compte.html',
})
export class AddCompte implements OnInit {
  private fb = inject(FormBuilder);
  private bankService = inject(BankService);
  private router = inject(Router);

  accountForm!: FormGroup;
  clients: Client[] = [];

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(8)]],
      balance: [0, [Validators.required, Validators.min(0)]],
      type: ['COURANT', Validators.required],
      clientId: [null, Validators.required]
    });
    this.getClients();
  }

  // Chargement de la liste des clients pour le <select>
  getClients(){
  this.bankService.getClients().subscribe({
    next: (data:any) => this.clients = data.content,
  error: (err) => console.error('Erreur chargement des clients:', err)
});
}

onSubmit(): void {
  if (this.accountForm.valid) {
  this.bankService.createAccount(this.accountForm.value).subscribe({
    next: () => {
      // Redirection vers la liste des clients après création
      this.router.navigate(['/clients']);
    },
    error: (err) => console.error('Erreur à la création du compte:', err)
  });
}
}

}
