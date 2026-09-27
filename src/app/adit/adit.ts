import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../bank.service';
import { Client } from '../shared/bankModel';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-adit',
  imports: [FormsModule, JsonPipe],
  templateUrl: './adit.html',
  styleUrl: './adit.css',
})
export class Adit implements OnInit {

  private routeActive = inject(ActivatedRoute);
  private router = inject(Router);
  private bankService = inject(BankService);
  private cdr = inject(ChangeDetectorRef);   // ← Ajoute ça

  clientId!: number;

  clientData: Client = {
    nom: '',
    telephone: '',
    email: '',
    statut: 'ACTIF'
  };

  statuts = [
    { label: 'Actif', value: 'ACTIF' },
    { label: 'Inactif', value: 'INACTIF' },
    { label: 'Suspendu', value: 'SUSPENDU' }
  ];

  ngOnInit(): void {
    this.clientId = +this.routeActive.snapshot.params['id'];
    this.loadClient();
  }

  loadClient(): void {
    this.bankService.getClientById(this.clientId).subscribe({
      next: (data) => {
        console.log('Données reçues :', data);

        // Important : on crée une nouvelle référence
        this.clientData = { ...data };

        // Force Angular à mettre à jour le formulaire
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateClient(form: NgForm): void {
    if (form.valid) {
      this.bankService.updateClient(this.clientId, this.clientData).subscribe({
        next: () => this.router.navigate(['/clients']),
        error: (err) => console.error(err)
      });
    }
  }
}
