import { Component, Input, OnInit } from '@angular/core';
import { CustomerStatusCount } from '../../models/customer-status-count.interface';

@Component({
  selector: 'vib-sidebar-customer',
  styleUrls: ['sidebar-customer.component.scss'],
  template: `
            <div class="sidebar-customer">
              <div class="categories-container">
                <div class="category-row"
                     [routerLink]="['./consumer-status', categoryParam]">
                  <div class="status">
                    {{ category.status }}
                  </div>
                  <div class="count">
                    {{ category.count }}
                  </div>
                </div>
              </div>
            </div>`
})

export class SidebarCustomerComponent implements OnInit {
  categoryParam: string;

  @Input() category: CustomerStatusCount;

  ngOnInit() {
    this.categoryParam = this.category.status.replace(/\s/g, '_').toLowerCase();
  }
}
