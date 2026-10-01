import { Component, input, output, computed } from '@angular/core';
import { Client } from '../shared/bankModel';

@Component({
  selector: 'app-client-card',
  standalone: true,
  templateUrl: './client-card.html'
})
export class ClientCard {
  // Inputs Signals
  readonly client = input.required<Client>();
  readonly isSelected = input<boolean>(false);

  // Outputs Signals
  readonly selectClient = output<Client>();
  readonly modifierClient = output<Client>();

  // Propriété dérivée réactive
  readonly isActif = computed(() => this.client().statut === 'ACTIF');

  onSelect(): void {
    this.selectClient.emit(this.client());
  }

  onModifClient(): void {
    this.modifierClient.emit(this.client());
  }
}
