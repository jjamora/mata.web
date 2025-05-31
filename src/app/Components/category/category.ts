import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../Models/category';
import { CategoryService } from '../../Services/Category/category';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent implements OnInit {
@ViewChild('categoryModal') modal : ElementRef | undefined;

  categoryForm : FormGroup = new FormGroup({});
  categoryList:  Category[] = [];
  catService = inject(CategoryService);
  selectedCategoryId: string = '';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setFormState();
    this.getCategories();
  }

  openModal() {
    const oModal = document.getElementById('categoryModal');
    if (oModal != null)
    {
      oModal.style.display = 'block';
    }
  }

  closeModal() {
    if (this.modal != null)
    {
      this.modal.nativeElement.style.display = 'none';
      this.categoryForm.reset();
      this.selectedCategoryId = '';
    }
  }

  getCategories() {
    this.catService.getAllCategories().subscribe((res) => {
      this.categoryList = res
    })
  }

  setModalValues(id: string) {
    this.catService.getCategoryById(id).subscribe((res) => {
      this.categoryForm.setValue({
        name: res.name
      });
      this.selectedCategoryId = res.id;
      this.openModal();
    })
  }

  setFormState() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  formValues: any;
  onSubmit() {
    if (this.categoryForm.invalid) {
      alert('Please fill all fields');
      return;
    }
    this.formValues = this.categoryForm.value;
    if (this.selectedCategoryId == null)
    {
      this.catService.createCategory(this.formValues).subscribe((res) => {
        alert('Category created successfully.');
        this.getCategories();
        this.closeModal();
      })
    }
    else
    {
      this.formValues.id = this.selectedCategoryId;
        this.catService.updateCategory(this.formValues).subscribe((res) => {
        alert('Category updated successfully.');
        
        this.getCategories();
        this.closeModal();
      })
    }
  }
}
