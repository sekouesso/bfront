export interface CompteModel{
  id?: number;
  numeroCompte?: string;
  solde?: number;
  proprietaire?: string;
  type?: "COURANT" | "EPARGNE";

}
