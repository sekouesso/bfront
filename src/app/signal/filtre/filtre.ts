import { Component, signal, computed } from '@angular/core';
import {DecimalPipe} from '@angular/common';

interface Operation {
  id: number;
  libelle: string;
  type: 'debit' | 'credit';
  montant: number;
}

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.html',
  imports: [
    DecimalPipe
  ]
})
export class Filtre {

  // Liste source
  operations = signal<Operation[]>([
    { id: 1, libelle: 'Salaire', type: 'credit', montant: 450000 },
    { id: 2, libelle: 'Loyer', type: 'debit', montant: 120000 },
    { id: 3, libelle: 'Courses', type: 'debit', montant: 35000 },
    { id: 4, libelle: 'Virement reçu', type: 'credit', montant: 80000 },
    { id: 5, libelle: 'Abonnement', type: 'debit', montant: 15000 },
  ]);

  // Critères de filtrage (Signals)
  recherche = signal('');
  type = signal<'all' | 'debit' | 'credit'>('all');

  // Liste filtrée (computed)
  operationsFiltrees = computed(() => {
    const terme = this.recherche().toLowerCase().trim();
    const typeSelectionne = this.type();

    return this.operations().filter(op => {
      const matchRecherche =
        !terme ||
        op.libelle.toLowerCase().includes(terme);

      const matchType =
        typeSelectionne === 'all' ||
        op.type === typeSelectionne;

      return matchRecherche && matchType;
    });
  });
}
