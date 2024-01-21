import { Injectable } from '@angular/core';
    
@Injectable()
export class ProductService {
    getProductsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Meeting',
                description: 'Product Description',
                duedate: '11.2.2024',
                inventoryStatus: 'COMPLETE',
                rating: 5
            },
            {
                id: '1001',
                code: 'nvklal433',
                name: 'Project Demo',
                description: 'Product Description',
                duedate: '13.2.2024',
                inventoryStatus: 'INPROGRESS',
                rating: 4
            },
            {
                id: '1002',
                code: 'zz21cz3c1',
                name: 'Project Review',
                description: 'Product Description',
                duedate: '14.2.2024',
                inventoryStatus: 'DELAY',
            },
            {
                id: '1003',
                code: '244wgerg2',
                name: 'Interview',
                description: 'Product Description',
                duedate: '16.2.2024',
                inventoryStatus: 'COMPLETE',
                rating: 5
            },
            {
                id: '1004',
                code: 'h456wer53',
                name: 'Meeting',
                description: 'Product Description',
                duedate: '19.2.2024',
                inventoryStatus: 'DELAY',
                rating: 4
            }
        ];
    }

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    }

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    }

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }

};