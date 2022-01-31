import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../data.service';
import { Profile } from '../profile-editor/profile';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [],
    styles: [`.modal{background: rgba(0,0,0, .5)}`]
})

export class HomeComponent implements OnInit, OnDestroy {

    profilesPath: string = "/get_profile";
    singleProfilePath: string = "/get_a_profile";
    deleteProfilePath: string = "/delete_profile";

    profiles: any[] = [];
    single_profile: any = [];

    // Success
    delete_profile_success: string | undefined;

    // Errors 
    single_profile_error: string | undefined;
    profiles_error: string | undefined;
    delete_profile_error: string | undefined;

    // Need to destroy the Observables first step do this
    destroy$: Subject<boolean> = new Subject<boolean>();

    starting_point: number = 0;
    numLimit: number = 10;
    currentPage: number = 1;
    savedCurrentPage: number = 1;
    totalCount: number = 0;
    pages: number = 0;

    activeCount = 0;
    deletedCount = 0;

    show_spinner: boolean = false;

    displayDetails = "none";
    displayDeleteModal = "none";

    delete_id = "";

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.queryProfiles();
    }

    ngOnDestroy() {
        this.destroyProfileObservables();
    }

    destroyProfileObservables() {
        this.destroy$.next(true);
        // Unsubscribe from the subject
        this.destroy$.unsubscribe();
    }

    openModal() {
        this.displayDetails = "block";
    }
    onCloseHandled() {
        this.displayDetails = "none";
    }

    // unused function for count of array values
    filterItems = (arr: Array<any>, query: any) => {
        return arr.filter((obj) => obj.status == query).length
    }

    queryProfiles() {
        this.dataService.sendGetRequest(this.starting_point, this.numLimit, this.profilesPath)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
            if (data.engineMessage == 1) {
                    this.profiles_error = undefined;
                    this.profiles = data.re_data;
                    this.activeCount = data.totalActiveCount;
                    this.deletedCount = data.totalDeletedCount;
                    this.totalCount = data.totalCount;
                    this.pages = Math.ceil(this.totalCount / this.numLimit);
                }
                else if (data.notFound == 2) {
                    this.profiles_error = "No profile found";
                }
                else {
                    this.profiles_error = "An error occured";
                }

            })
    }

    querySingleProfile(id: number) {
        this.openModal();
        this.dataService.retrieveGetRequest("id=" + id, this.singleProfilePath)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                if (data.engineMessage == 1) {
                    this.single_profile_error = undefined;
                    this.single_profile = data.re_data;
                }
                else if (data.notFound == 2) {
                    this.single_profile_error = "No profile found";
                }
                else {
                    this.single_profile_error = "An error occured";
                }
            })
    }

    deleteProfile(id: string) {
        this.displayDeleteModal = "block";
        this.delete_profile_success = undefined;
        this.delete_profile_error = undefined;
        this.delete_id = id;
    }

    delete_now() {
        this.show_spinner = true;
        const data = {
            id: this.delete_id
        }

        this.dataService.deleteRequest(data, this.deleteProfilePath)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                if (data.engineMessage == 1) {
                    this.delete_profile_error = undefined;
                    this.delete_profile_success = "Profile deleted successfully";
                    this.queryProfiles();
                    setTimeout(() =>{
                        this.show_spinner = false;
                        this.removeDeleteModal();
                    }, 2000)
                }
                else if (data.notFound == 2) {
                    this.delete_profile_success = undefined;
                    this.delete_profile_error = "No profile found";
                }
                else {
                    this.delete_profile_success = undefined;
                    this.delete_profile_error = "An error occured";
                }
            })
            
    }

    removeDeleteModal() {
        this.displayDeleteModal = "none";
        this.show_spinner = false;
    }

    // Navigation code start

    hideNext() {
        if ((this.starting_point + this.numLimit) < this.totalCount) {
            return false;
        }
        else
            return true;
    }
    hidePrev() {
        if (this.starting_point === 0) {
            return true;
        }
        else
            return false;
    }

    firstPage() {
        if (this.starting_point != 0) {
            this.currentPage = 1;
            this.starting_point = 0;
            this.savedCurrentPage = this.currentPage;
            this.queryProfiles();
        }
    }
    lastPage() {
        if (this.currentPage != this.pages) {
            this.currentPage = this.pages;
            // damn this nigga for giving me a hard time
            var divide = this.totalCount / this.numLimit;
            var modulus = this.totalCount % this.numLimit;
            var roundDivide = Math.floor(divide);
            this.starting_point = modulus == 0 ? this.totalCount - this.numLimit : roundDivide * this.numLimit;
            this.savedCurrentPage = this.currentPage;
            this.queryProfiles();
        }
    }

    nextPage() {
        this.currentPage++;
        this.starting_point = this.starting_point + this.numLimit;
        this.savedCurrentPage = this.currentPage;
        this.queryProfiles();
    }
    PrevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.savedCurrentPage = this.currentPage;
        }
        this.starting_point = this.starting_point - this.numLimit;
        this.queryProfiles();
    }

    // Navigation code end

    title = 'Profiles App';

    /*
        Notes: 

        We first imported the OnDestroy interface, Subject and the takeUntil() operator. Next, we implemented the OnDestroy interface and added the ngOnDestroy() lifecycle hook to the component.

        Next, we created an instance of Subject which can emit boolean values (the type of the value doesn't really matter in this example) that will be used as the notifier of the takeUntil() operator.
        
        Next, in the ngOnInit() lifecycle hook, we called the sendGetRequest() of our data service and called the pipe() method of the returned Observable to pipe the takeUnitl() operator and finaly subscribed to the combined Observable. In the body of the subscribe() method, we added the logic to put the fetched data of the HTTP response in the products array.
        
        The takeUntil() operator allows a notified Observable to emit values until a value is emitted from a notifier Observable.
        
        When Angular destroys a component it calls the ngOnDestroy() lifecycle method which, in our case, calls the next() method to emit a value so RxJS completes all subscribed Observables.
    
    */

}
