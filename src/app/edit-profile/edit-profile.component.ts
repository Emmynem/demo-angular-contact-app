import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LgasService } from '../lgas.service';
import { DataService } from '../data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../profile-editor/profile-editor.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  
  singleProfilePath: string = "/get_a_profile";
  updateProfilePath: string = "/update_profile";

  // Success
  save_profile_success: string | undefined;

  // Errors 
  save_profile_error: string | undefined;
  edit_profile_error: string | undefined;

  show_spinner: boolean = false;

  // Need to destroy the Observables first step do this
  destroy$: Subject<boolean> = new Subject<boolean>();

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private lgasService: LgasService, private router: Router, private route: ActivatedRoute, private dataService: DataService) { 
    // Use this if you no like stress
    this.profileForm = this.fb.group({
      id:"",
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('([- +()0-9]{6,14})|([0][7-9][0-1][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])')]],
      // Used to group inputs together when collecting their values
      // address: this.fb.group({
      //   street: [this.state, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      //   city: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      //   state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      //   zip: ['']
      // }),
      // aliases: this.fb.array([
      //   this.fb.control('')
      // ])
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
    this.querySingleProfile(this.route.snapshot.paramMap.get('id') as unknown as number);
    this.onChanges();
  }

  ngOnDestroy() {
    this.destroyProfileObservables();
  }

  destroyProfileObservables() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.profileForm.value);
    this.show_spinner = true;
    this.dataService.updateRequest(this.profileForm.value, this.updateProfilePath)
      .subscribe((data: any) => {
        if (data.engineMessage == 1) {
          this.save_profile_error = undefined;
          this.save_profile_success = "Profile updated successfully";
          
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
    // this.profileForm.controls['address'].valueChanges.subscribe(selectedValue => {
    //   if (selectedValue.state != "" && selectedValue.state != this.changed_state && selectedValue.city != "") {
    //     this.profileForm.patchValue({ 
    //       address : {
    //         city : ""
    //       }
    //     }, {emitEvent : false});
    //   }
    //   this.changed_state = selectedValue.state;
    //   this.change_lgas(selectedValue.state);
    // });
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
  
  // Use this if you like stress
  // profileForm = new FormGroup({
  //   firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
  //   lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
  //   phoneNumber: new FormControl('', [Validators.required, Validators.pattern('([- +()0-9]{6,14})|([0][7-9][0-1][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])')]),
  //   address: new FormGroup({
  //     street: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
  //     city: new FormControl(this.city, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
  //     state: new FormControl(this.state, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
  //     zip: new FormControl('')
  //   }),
  //   aliases: new FormArray([
  //     new FormControl('')
  //   ])
  // });

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

  querySingleProfile(id: number) {
    this.dataService.retrieveGetRequest("id=" + id, this.singleProfilePath)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data.engineMessage == 1) {
          this.edit_profile_error = undefined;

          const fullname = data.re_data.fullname.split(" ");
          const firstName = fullname[0];
          const lastName = fullname[1];

          this.profileForm.patchValue({
            state: data.re_data.state
          })
          this.change_lgas(data.re_data.state);
          this.profileForm.patchValue({
            id: data.re_data.id,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: data.re_data.phone_number,
            street: data.re_data.street,
            city: data.re_data.city,
            state: data.re_data.state,
            zip: data.re_data.zip_code
          })
        }
        else if (data.notFound == 2) {
          this.edit_profile_error = "No profile found";
        }
        else {
          this.edit_profile_error = "An error occured";
        }
      })
  }

}
