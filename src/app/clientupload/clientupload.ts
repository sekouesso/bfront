import { Component, input, output, signal, inject } from '@angular/core';
import { BankService } from '../bank.service';
import { Client } from '../shared/bankModel';

@Component({
  selector: 'app-client-photo-upload',
  templateUrl: './clientupload.html'
})
export class Clientupload {
  private readonly bankService = inject(BankService);

  // Input Signal : L'ID du client concerné
  readonly clientId = input.required<number>();

  // Output Signal : Émet le client mis à jour après upload réussi
  readonly photoUploaded = output<Client>();

  // Signals d'état
  readonly selectedFile = signal<File | null>(null);
  readonly previewUrl = signal<string | null>(null);
  readonly isUploading = signal<boolean>(false);
  readonly errorMessage = signal<string>('');
  readonly successMessage = signal<string>('');

  /**
   * Capture du fichier sélectionné et génération de la prévisualisation
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validation de type (ex: images seulement)
      if (!file.type.startsWith('image/')) {
        this.errorMessage.set('Veuillez sélectionner un fichier image valide.');
        return;
      }

      this.selectedFile.set(file);
      this.errorMessage.set('');

      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => this.previewUrl.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  /**
   * Envoi du fichier vers le contrôleur Spring Boot
   */
  uploadPhoto(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.isUploading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.bankService.uploadPhoto(this.clientId(), file).subscribe({
      next: (updatedClient) => {
        this.isUploading.set(false);
        this.successMessage.set('Photo mise à jour avec succès !');
        this.selectedFile.set(null);
        this.previewUrl.set(null);

        // Notification au composant parent
        this.photoUploaded.emit(updatedClient);
      },
      error: (err) => {
        this.isUploading.set(false);
        // Traitement du message d'erreur retourné par le controller
        const msg = typeof err.error === 'string'
          ? err.error
          : 'Erreur lors de l\'enregistrement de la photo.';
        this.errorMessage.set(msg);
      }
    });
  }
}
