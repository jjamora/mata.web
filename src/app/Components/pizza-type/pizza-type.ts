import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pizza_Type } from '../../Models/pizza-type';
import { PizzaTypeService } from '../../Services/PizzaType/pizza-type';

@Component({
  selector: 'app-pizza-type',
  imports: [ReactiveFormsModule],
  templateUrl: './pizza-type.html',
  styleUrl: './pizza-type.css'
})
export class PizzaTypeComponent  implements OnInit {
@ViewChild('pizzaTypeModal') modal : ElementRef | undefined;

  pizzaTypeForm : FormGroup = new FormGroup({});
  pizzaTypeList:  Pizza_Type[] = [];
  typeService = inject(PizzaTypeService);
  selectedPizzaTypeId: string = '';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setFormState();
    this.getPIzzaTypes();
  }

  openModal() {
    const oModal = document.getElementById('pizzaTypeModal');
    if (oModal != null)
    {
      oModal.style.display = 'block';
    }
  }

  closeModal() {
    if (this.modal != null)
    {
      this.modal.nativeElement.style.display = 'none';
      this.pizzaTypeForm.reset();
      this.selectedPizzaTypeId = '';
    }
  }

  getPIzzaTypes() {
    this.typeService.getAllPizzaTypes().subscribe((res) => {
      this.pizzaTypeList = res
    })
  }

  setModalValues(id: string) {
    this.typeService.getPizzaTypeById(id).subscribe((res) => {
      this.pizzaTypeForm.setValue({
        name: res.name,
        categoryid: res.categoryId,
        ingredients: res.ingredients
      });
      this.selectedPizzaTypeId = res.id;
      this.openModal();
    })
  }

  setFormState() {
    this.pizzaTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      categoryid: ['', [Validators.required]],
      ingredients: ['', [Validators.required]]
    });
  }

  formValues: any;
  onSubmit() {
    if (this.pizzaTypeForm.invalid) {
      alert('Please fill all fields');
      return;
    }
    this.formValues = this.pizzaTypeForm.value;

    if (this.selectedPizzaTypeId == null)
    {
      this.typeService.createPizzaType(this.formValues).subscribe((res) => {
        alert('Pizza created successfully.');
        this.getPIzzaTypes();
        this.closeModal();
      })
    }
    else
    {
      this.formValues.id = this.selectedPizzaTypeId;
        this.typeService.updatePizzaType(this.formValues).subscribe((res) => {
        alert('Pizza updated successfully.');
        
        this.getPIzzaTypes();
        this.closeModal();
      })
    }
  }
}
