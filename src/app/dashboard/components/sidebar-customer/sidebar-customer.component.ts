import { Component} from '@angular/core';
import { CustomerStatusCount } from '../../models/customer-status-count.interface';
import { CustomerStatusService } from '../../services/customer-status.service';

@Component({
  selector: 'app-sidebar-customer',
  styleUrls: ['sidebar-customer.component.scss'],
  template: `<div>{{ customersByStatus | json }}</div>`
})

export class SidebarCustomerComponent {
  customersByStatus: CustomerStatusCount[];
  constructor(private statusService: CustomerStatusService ) {}
  ngOnInit() {
    this.statusService
      .getCustomerStatus()
      .subscribe((data: CustomerStatusCount[]) => this.customersByStatus = data);
  }
}
