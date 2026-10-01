import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from '../bank.service';
import { Client } from '../shared/bankModel';
import { ClientCard } from '../client-card/client-card';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientCard],
  templateUrl: './client.html'
})
export class ClientList implements OnInit {
  private readonly bankService = inject(BankService);
  private readonly router = inject(Router);

  // Signals pour l'état du composant
  readonly clients = signal<Client[]>([]);
  readonly clientSelectionne = signal<Client | null>(null);
  readonly errorMessage = signal<string>('');
  readonly isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.chargerClients();
  }

  chargerClients(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.bankService.getClients().subscribe({
      next: (data: any) => {
        this.clients.set(data.content ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Erreur lors du chargement des clients.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  traiterSelection(client: Client): void {
    //this.clientSelectionne.set(client);
    this.router.navigate(['upload', client.id]);
  }

  editClient(client: Client): void {
    this.router.navigate(['clients', client.id, 'edit']);
  }
}
