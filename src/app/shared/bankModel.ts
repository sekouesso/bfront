export interface Client {
  id?: number;
  nom: string;
  telephone: string;
  email: string;
  statut: 'ACTIF' | 'INACTIF' | 'SUSPENDU';
}

export interface Account {
  id?: number;
  accountNumber: string;
  balance: number;
  type: 'COURANT' | 'EPARGNE';
  clientId: number;
}
