import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    id: new FormControl(''),
  });
  title = 'encora_project';
  contacts: any;
  isFormVisible = false;
  isUpdate = false;
  apiPath =
    'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';

  ngOnInit(): void {
    this.http.get(this.apiPath).subscribe((res) => {
      this.contacts = res;
    });
  }

  onAddForm() {
    this.isFormVisible = true;
    this.isUpdate = false;
  }

  onEdit(event: any) {
    this.isUpdate = true;
    this.isFormVisible = true;
    this.profileForm.patchValue(event);
  }

  onDelete(event: any) {
    this.contacts.splice(event, 1);
  }

  onSave() {
    this.profileForm.controls['id'].setValue(this.contacts.length + 1);
    this.contacts.push(this.profileForm.value);
    this.onCancel();
  }

  onUpdate() {
    this.contacts.forEach((element: any, index: any) => {
      if (element.id === this.profileForm.value.id) {
        this.contacts[index] = this.profileForm.value;
      }
    });
    this.onCancel();
  }

  onCancel() {
    this.isFormVisible = false;
    this.profileForm.reset();
  }
}
