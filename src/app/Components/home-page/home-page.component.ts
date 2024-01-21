import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/Services/loader/loader.service';
import { ProductService } from 'src/app/Services/userData/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  productDialog: boolean = false;

  statisticsDialog:boolean= false

  products!: any[];

  product!: any;

  selectedProducts!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private productService: ProductService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private http:HttpClient,
    private loaderService:LoaderService) {}

  ngOnInit() {
      this.getData()
      this.getDataFromApi()
  }

  getData(){
    this.productService.getProducts().then((data:any) => (this.products = data));

    this.statuses = [
        { label: 'COMPLETE', value: 'COMPLETE' },
        { label: 'INPROGRESS', value: 'INPROGRESS' },
        { label: 'DELAY', value: 'DELAY' }
    ];
  }

  openNew() {
      this.productDialog = true;
      this.product = {};
      this.submitted = false;
  }

  showStatistics(){
    this.statisticsDialog = true
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
              this.selectedProducts = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
          }
      });
  }

  editProduct(product: any) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: any) { 
       
      this.confirmationService.confirm({        
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => val.id !== product.id);
              this.product = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name?.trim()) {
          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000 });
          } else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  getSeverity(status: string):any {            
      switch (status) {
          case 'COMPLETE':
              return 'success';
          case 'INPROGRESS':
              return 'warning';
          case 'DELAY':
              return 'danger';
          default:
            break
      }
  }



  getDataFromApi() {
    
    const url = 'https://8fb6-136-185-177-167.ngrok-free.app/api/User/alltasks';

    this.http.get(url, {
      headers: {
        'Accept': 'application/text'
      }
    })
    .subscribe((data: any) => {
      console.log(data); 
    }, error => {
      console.error('Error:', error);
    });
  }
}
