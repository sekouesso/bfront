import {Component, OnInit, inject, Input, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BankService} from '../bank.service';
import {Account} from '../shared/bankModel';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compte.html'
})
export class Compte {
  private bankService = inject(BankService);

  // ID du client passé par le composant parent
  @Input() clientId!: number;

  accounts: Account[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // Déclenché automatiquement à chaque fois que l'Input 'clientId' change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && this.clientId) {
      this.chargerComptesDuClient(this.clientId);
    }
  }

  chargerComptesDuClient(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Appel direct à l'endpoint Spring Boot: GET /api/clients/{clientId}/accounts
    this.bankService.getAccountsByClient(id).subscribe({
      next: (data) => {
        this.accounts = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des comptes du client.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
