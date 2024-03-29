import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LgasService } from '../lgas.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {
  
  saveProfilePath: string = "/set_profile";

  // Success
  save_profile_success: string | undefined;

  // Errors 
  save_profile_error: string | undefined;

  show_spinner: boolean = false;

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private lgasService: LgasService, private router: Router, private dataService: DataService) { 
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('([- +()0-9]{6,14})|([0][7-9][0-1][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])')]],
      street: [this.state, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      city: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      zip: ['']
    });
  }

  state = "";
  // city = "";
  changed_state = "";

  ngOnInit() {
    this.onChanges();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.show_spinner = true;
    this.dataService.postRequest(this.profileForm.value, this.saveProfilePath)
      .subscribe((data: any) => {
        if (data.engineMessage == 1) {
          this.save_profile_error = undefined;
          this.save_profile_success = "Profile added successfully";
          
          setTimeout(() => {
            this.show_spinner = false;
            this.router.navigateByUrl('home');
          }, 2000)
        }
        else if (data.engineNumberExist == 2) {
          this.show_spinner = false;
          this.save_profile_success = undefined;
          this.save_profile_error = "Profile already exists";
        }
        else {
          this.show_spinner = false;
          this.save_profile_success = undefined;
          this.save_profile_error = "An error occured";
        }
      })
  }

  onChanges() {
    this.changed_state;
    this.profileForm.controls['state'].valueChanges.subscribe(selectedValue => {
      if (selectedValue != "" && selectedValue != this.changed_state && this.city.value != "") {
        this.profileForm.patchValue({
          city: ""
        }, { emitEvent: false });
      }
      this.changed_state = selectedValue;
      this.change_lgas(selectedValue);
    });

  }

  lgas: string[] = [];
  all_states: string[] = this.lgasService.listStates();

  change_lgas (state : string){
    this.lgas = this.lgasService.changeLGA(state);
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  get city() {
    return this.profileForm.get('city') as FormControl;
  }

  addAlias() {
    this.aliases.push(new FormControl(""));
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

}
