import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Client} from '../shared/bankModel';

@Component({
  selector: 'app-client-card',
  template: `
    <div class="card p-3 mb-2 border rounded" [class.border-primary]="estSelectionne">
      <h4>{{ client.nom }} {{ client.telephone }}</h4>
      <p><strong>Email :</strong> {{ client.email }}</p>

      <!-- Utilisation du nouveau bloc @if au lieu de *ngIf -->
      @if (client.statut === 'ACTIF') {
        <span class="badge bg-success">Compte Actif</span>
      } @else {
        <span class="badge bg-danger">Compte Inactif</span>
      }

      <div class="mt-3">
        <button class="btn btn-outline-primary btn-sm" (click)="onSelect()">
          Sélectionner ce client
        </button>
        <button class="btn btn-outline-warning btn-sm" (click)="onModifClient()">
          modifier ce client
        </button>
      </div>
    </div>
  `
})
export class ClientCard {
  @Input() client!: Client;
  @Input() estSelectionne: boolean = false;

  @Output() selectClient = new EventEmitter<Client>();
  @Output() modifierClient = new EventEmitter<Client>();


  ngOnInit() {
    console.log(this.client);
  }

  onSelect(): void {
    this.selectClient.emit(this.client);
  }

  onModifClient(): void {
    this.modifierClient.emit(this.client);
  }


}
