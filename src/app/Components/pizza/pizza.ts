import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pizza } from '../../Models/pizza';
import { PizzaService } from '../../Services/Pizza/pizza';

@Component({
  selector: 'app-pizza',
  imports: [ReactiveFormsModule],
  templateUrl: './pizza.html',
  styleUrl: './pizza.css'
})
export class PizzaComponent implements OnInit {
@ViewChild('pizzaModal') modal : ElementRef | undefined;

  pizzaForm : FormGroup = new FormGroup({});
  pizzaList:  Pizza[] = [];
  pizzaService = inject(PizzaService);
  selectedPizzaId: string = '';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setFormState();
    this.getPIzzas();
  }

  openModal() {
    const oModal = document.getElementById('pizzaModal');
    if (oModal != null)
    {
      oModal.style.display = 'block';
    }
  }

  closeModal() {
    if (this.modal != null)
    {
      this.modal.nativeElement.style.display = 'none';
      this.pizzaForm.reset();
      this.selectedPizzaId = '';
    }
  }

  getPIzzas() {
    this.pizzaService.getAllPizzas().subscribe((res) => {
      this.pizzaList = res
    })
  }

  setModalValues(id: string) {
    this.pizzaService.getPizzaById(id).subscribe((res) => {
      this.pizzaForm.setValue({
        name: res.name,
        pizzaTypeId: res.pizza_type_Id,
        size: res.size,
        price: res.price
      });
      this.selectedPizzaId = res.id;
      this.openModal();
    })
  }

  setFormState() {
    this.pizzaForm = this.fb.group({
      name: ['', [Validators.required]],
      size: [1, [Validators.required]],
      price: [0, [Validators.required]]
    });
  }

  formValues: any;
  onSubmit() {
    if (this.pizzaForm.invalid) {
      alert('Please fill all fields');
      return;
    }
    this.formValues = this.pizzaForm.value;

    if (this.selectedPizzaId == null)
    {
      this.pizzaService.createPizza(this.formValues).subscribe((res) => {
        alert('Pizza created successfully.');
        this.getPIzzas();
        this.closeModal();
      })
    }
    else
    {
      this.formValues.id = this.selectedPizzaId;
        this.pizzaService.updatePizza(this.formValues).subscribe((res) => {
        alert('Pizza updated successfully.');
        
        this.getPIzzas();
        this.closeModal();
      })
    }
  }
}
