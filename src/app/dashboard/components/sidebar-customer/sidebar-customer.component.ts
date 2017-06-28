import { Component, Input } from '@angular/core';
import { CustomerStatusCount } from '../../models/customer-status-count.interface';

@Component({
  selector: 'app-sidebar-customer',
  styleUrls: ['sidebar-customer.component.scss'],
  template: `
            <div class="sidebar-customer">
              <div class="categories-container">
                <div class="category-row">      
                  <a [routerLink]="['./customer-status', category.status]"></a>
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

export class SidebarCustomerComponent {
  @Input()
  category: CustomerStatusCount;
}
