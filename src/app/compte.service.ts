import { Injectable } from '@angular/core';
import {CompteModel} from './shared/compte.model';

@Injectable({
  providedIn: 'root',
})
export class CompteService {
  liste_compte: CompteModel[] = [
    {id:1, numeroCompte: "EERRFDFFGHG980", type: "COURANT", solde: 5000, proprietaire:'Jean'},
    {id:2, numeroCompte: "EERRFDFFGH45680", type: "EPARGNE", solde: 5000, proprietaire:'HAlou'},
    {id:3, numeroCompte: "EERRFDFFOU89099980", type: "COURANT", solde: 5000, proprietaire:'DUPON'},
    {id:4, numeroCompte: "EERRFDFF980", type: "EPARGNE", solde: 5000, proprietaire:'YAO'},
  ]
}
