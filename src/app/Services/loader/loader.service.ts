import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingDialog: any;

  constructor(private load:NgxSpinnerService) { }

  loadingShow(){
    this.load.show()
  }
  loadingHide(): void {
    this.load.hide();
  }
}
