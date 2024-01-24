import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from 'src/app/Services/http/http.service';
import { LoaderService } from 'src/app/Services/loader/loader.service';
import { ProductService } from 'src/app/Services/userData/product.service';
import { dialogHeader, tableHeader, tableKeys } from 'src/app/contents/homepage/homepage';
import { messages } from 'src/app/messages/messages';
import { apiUrl } from 'src/app/urls/apiUrl';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    tableKeys = tableKeys
    dialogHeader = dialogHeader
    tableHeader = tableHeader
    productDialog: boolean = false;
    statisticsDialog: boolean = false
    products!: any[];
    product!: any;
    statuses!: any[];
    statistics: any

    constructor(
        private router:Router,
        private httpService: HttpService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private loaderService: LoaderService) { }

    ngOnInit() {
        
        this.getData()
        
    }

    getData() {
        this.loaderService?.loadingShow()
        if(!localStorage.getItem('token'))
        {
            Swal.fire(messages?.auth,messages.logintry,'error')
            this.loaderService.loadingHide()
            if(Swal)
            {
                this.router.navigate([''])
            }
        }
        else{
            this.httpService.getUserTask().subscribe({
                next: (response: any) => {
                    this.products = response
                    this.loaderService?.loadingHide()
                },
                error: (error: any) => {
                    this.loaderService?.loadingHide()
                    Swal.fire(error?.name, messages?.refresh, 'error')
                }
            })
    
            this.statuses = [
                { label: 'COMPLETED', value: 'COMPLETED' },
                { label: 'INPROGRESS', value: 'INPROGRESS' },
                { label: 'TO DO', value: 'TO DO' },
            ];
        }
    }

    openNew() {
        this.productDialog = true;
        this.product = {};
    }

    showStatistics() {
        this.statisticsDialog = true
        this.loaderService?.loadingShow()
        this.httpService?.getStatistics().subscribe({
            next: (response: any) => {
                this.statistics = response
                this.loaderService?.loadingHide()
            },
            error: (error: any) => {
                this.loaderService?.loadingHide()
                Swal.fire(error?.name, messages?.try, 'error')
            }
        })
    }


    editProduct(product: any) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: any, taskid: any) {
        console.log(taskid);
        
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.title + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.loaderService?.loadingShow()
                this.httpService?.deleteTask(taskid).subscribe({
                    next: (response: any) => {
                        this.loaderService?.loadingHide()
                        this.messageService?.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
                        this.getData()
                    },
                    error: (error: any) => {
                        this.loaderService?.loadingHide()
                        Swal.fire(error?.name, messages?.try, 'error')
                    }
                })
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
    }

    saveProduct(taskid: any) {
        this.loaderService?.loadingShow()
        if (this.product?.title?.trim()) {
            if (this.product.id) {
                this.httpService?.editTask(this.product, taskid).subscribe({
                    next: (response: any) => {
                        this.loaderService?.loadingHide()
                        this.messageService?.add({ severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000 });
                        this.getData()
                    },
                    error: (error: any) => {
                        this.loaderService?.loadingHide()
                        this.messageService.add({ severity: 'primary', summary: 'Failed', detail: 'Task Updated Failed', life: 3000 })
                    }
                })
            }
            else {
                console.log(this.product);
                
                this.httpService.createTask(this.product).subscribe({
                    next: (response: any) => {
                        
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000 });
                        this.getData()
                    },
                    error: (error: any) => {
                        this.messageService.add({ severity: 'primary', summary: 'Failed', detail: 'Task Created Failed', life: 3000 })
                    }
                })
            }

            this.productDialog = false;
            this.product = {};
        }
    }
    getSeverity(status: string): any {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'INPROGRESS':
                return 'warning';
            case 'TO DO':
                return 'danger';
            default:
                return '-'
        }
    }




}
