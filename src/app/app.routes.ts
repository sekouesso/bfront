import { Routes } from '@angular/router';
import {AddClient} from './add-client/add-client';
import {AddCompte} from './add-compte/add-compte';
import {Compte} from './compte/compte';
import {ClientList} from './client/client';

export const routes: Routes = [
  // Redirection par défaut
  { path: '', redirectTo: 'clients', pathMatch: 'full' },

  // Routes Clients
  { path: 'clients', component: ClientList },
  { path: 'clients/new', component: AddClient },

  // Routes Comptes Bancaires
  { path: 'accounts/new', component: AddCompte },
  { path: 'clients/:clientId/accounts', component: Compte },

  // Redirection en cas d'URL inconnue (Page 404 simple)
  { path: '**', redirectTo: 'clients' }
];
