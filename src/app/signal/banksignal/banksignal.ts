import {Component, computed, signal} from '@angular/core';
import {DecimalPipe, JsonPipe} from '@angular/common';
import {ButtonDirective, ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';


interface CompteBancaire {
  id: string;
  numeroMasque: string;
  titulaire: string;
  solde: number;
  devise: 'XOF' | 'EUR' | 'USD';
  statut: 'ACTIF' | 'BLOQUE';
}

interface OperationBancaire {
  id: string;
  date: string;
  libelle: string;
  type: 'CREDIT' | 'DEBIT';
  montant: number;
}

export interface Beneficiaire {
  id: number;
  nom: string;
  banque: string;
}


@Component({
  selector: 'app-banksignal',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TableModule,
    TooltipModule,
    JsonPipe
  ],
  templateUrl: './banksignal.html',
  styleUrl: './banksignal.css',
})
export class Banksignal {

      montantInit= signal<number>(100_000);
      tauxFrais= signal<number>(0.01);

  montant_total = computed(()=> this.montantInit()* this.tauxFrais())
  nouveauNom = '';
  nouvelleBanque = '';

  modifierMotant() {
    //this.montantInit.update((value)=>value+1000);
    this.montantInit.set(50000000)
  }

  modifiertauxFrais() {
    this.tauxFrais.update((value)=>value+0.1);
  }

  // 1. Initialisation du signal avec le tableau de bénéficiaires
  beneficiaires = signal([
    { id: 1, nom: 'Ablavi Mensah', banque: 'Ecobank' },
    { id: 2, nom: 'Koffi Silva', banque: 'Orabank' }
  ]);

  /**
   * Ajoute un bénéficiaire de manière immutable
   */
  ajouterBeneficiaire(nouveau: any): void {
    const nouveauBeneficiaire: Beneficiaire = {
      id: Date.now(), // ID unique basique
      ...nouveau
    };

    // Immutabilité : création d'un nouveau tableau avec l'élément ajouté
    this.beneficiaires.update(actuels => [...actuels, nouveauBeneficiaire]);
  }

  /**
   * Supprime un bénéficiaire par son ID de manière immutable
   */
  supprimerBeneficiaire(id: number): void {
    // Immutabilité : filter retourne une nouvelle instance de tableau
    this.beneficiaires.update(actuels => actuels.filter(b => b.id !== id));
  }


}
