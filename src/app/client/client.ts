import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BankService} from '../bank.service';
import {Client} from '../shared/bankModel';
import {ClientCard} from '../client-card/client-card';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, ClientCard],
  templateUrl: './client.html'
})
export class ClientList implements OnInit {
  // Injection du service
  private bankService = inject(BankService);

  clients: Client[] = [];
  clientSelectionne: Client | null = null;
  errorMessage: string = '';

  ngOnInit(): void {
    this.chargerClients();
  }

  chargerClients(): void {
    // Souscription à l'Observable renvoyé par le service
    this.bankService.getClients().subscribe({
      next: (data:any) => {
        this.clients = data.content;
        console.log(this.clients);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des clients.';
        console.error(err);
      }
    });
  }

  traiterSelection(client: Client): void {
    this.clientSelectionne = client;
  }
}
