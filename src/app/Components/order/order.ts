import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '../../Models/order';
import { OrderService } from '../../Services/Order/order';

@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class OrderCompnent  implements OnInit {
@ViewChild('orderModal') modal : ElementRef | undefined;

  orderForm : FormGroup = new FormGroup({});
  orderList:  Order[] = [];
  orderService = inject(OrderService);
  selectedPizzaId: string = '';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setFormState();
    this.getOrders();
  }

  openModal() {
    const oModal = document.getElementById('orderModal');
    if (oModal != null)
    {
      oModal.style.display = 'block';
    }
  }

  closeModal() {
    if (this.modal != null)
    {
      this.modal.nativeElement.style.display = 'none';
      this.orderForm.reset();
      this.selectedPizzaId = '';
    }
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe((res) => {
      this.orderList = res
    })
  }

  setModalValues(id: string) {
    this.orderService.getOrderById(id).subscribe((res) => {
      this.orderForm.setValue({
        date: res.date,
        time: res.time
      });
      this.selectedPizzaId = res.id;
      this.openModal();
    })
  }

  setFormState() {
    this.orderForm = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }

  formValues: any;
  onSubmit() {
    if (this.orderForm.invalid) {
      alert('Please fill all fields');
      return;
    }
    this.formValues = this.orderForm.value;

    if (this.selectedPizzaId == null)
    {
      this.orderService.createOrder(this.formValues).subscribe((res) => {
        alert('Order created successfully.');
        this.getOrders();
        this.closeModal();
      })
    }
    else
    {
      this.formValues.id = this.selectedPizzaId;
        this.orderService.updateOrder(this.formValues).subscribe((res) => {
        alert('Order updated successfully.');
        
        this.getOrders();
        this.closeModal();
      })
    }
  }
}
