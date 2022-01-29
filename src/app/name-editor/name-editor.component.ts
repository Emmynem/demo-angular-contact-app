import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html'
})
export class NameEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name = new FormControl('');

  updateName() {
    this.name.setValue('Deltoro');
  }

}
