import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingDialog: any;

  constructor(
    private confirmationService: ConfirmationService,
  ) {}

  showLoading() {
    this.loadingDialog = this.confirmationService.confirm({
      header: 'Loading',
      message: `<p-progressSpinner></p-progressSpinner>`,
      acceptVisible: false,
      rejectVisible: false,
    });
  }

  hideLoading() {
    if (this.loadingDialog) {
      this.loadingDialog.close();
    }
  }
}
