import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'products-filters',
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  public filtersList: any = [
    { id: 1, name: "Category", filters: [{ id: 1, name: "Shirts", count: 45 }, { id: 2, name: "T-shirts", count: 20 }, { id: 3, name: "Jean Pants", count: 250 }, { id: 4, name: "Shorts", count: 25 }, { id: 5, name: "Shoes", count: 89 }, { id: 6, name: "Jackets", count: 63 }] },
    { id: 2, name: "Size", filters: [{ id: 1, name: "S", count: 45 }, { id: 2, name: "M", count: 256 }, { id: 3, name: "L", count: 450 }, { id: 4, name: "XL", count: 98 }, { id: 5, name: "XXL", count: 234}, { id: 6, name: "3XL", count: 34 }] },
    { id: 3, name: "Color", filters: [{ id: 1, name: "Brown", count: 60}, { id: 2, name: "Blue",count: 113 }, { id: 3, name: "Green",count: 243 }, { id: 4, name: "Orange",count: 145 }, { id: 5, name: "Pink", count: 78 }, { id: 6, name: "White", count: 324 }, { id: 6, name: "Yellow",count: 200 }, { id: 7, name: "Black",count: 630 }] },
    { id: 4, name: "Price", filters: [{id: 1, name: "Rs. 500 - Rs. 999", count: 1286}, {id: 2, name: "Rs. 1,000 - Rs. 1,999", count: 1056}, {id: 3, name: "Rs. 2,000 - Rs. 2,999", count: 890}, {id: 4, name: "Rs. 3,000 - Rs. 3,999", count: 350}]},
    { id: 5, name: "Fabric", filters: [{id: 1, name: "Cotton", count: 235},{id: 2, name: "Polyester",count: 124},{id: 3, name: "Silk", count: 564},{id: 4, name: "Wool", count: 312}]},
    {id: 6, name: "Discount", filters: [{id: 1, name:"10% And Above", count: 450},{id: 2, name:"20% And Above", count: 678},{id: 3, name:"30% And Above", count: 342},{id: 4, name:"40% And Above", count: 786}]}
  ];
}
