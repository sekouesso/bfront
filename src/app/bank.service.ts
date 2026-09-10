import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, Account } from './shared/bankModel';

@Injectable({
  providedIn: 'root' // Le service est un singleton disponible dans toute l'application
})
export class BankService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';


  /** Récupérer la liste des clients */
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }

  /** Récupérer un client par son ID */
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/${id}`);

  }


  /** Créer un nouveau client */
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  /** Mettre à jour un client */
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${id}`, client);
  }

  /** Supprimer un client */
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${id}`);
  }

  // --- OPÉRATIONS COMPTES BANCAIRES ---

  /** Récupérer les comptes d'un client spécifique */
  getAccountsByClient(clientId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/clients/${clientId}/accounts`);
  }

  /** Créer un compte bancaire */
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/accounts`, account);
  }
}
