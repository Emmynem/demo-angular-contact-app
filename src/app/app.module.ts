import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteColorComponent2 } from './forms/favorite-color-form';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
// Custom directives import
import { BlueBackWhiteFront } from './directives/blue-back-white-front';
import { RedBackWhiteFront } from './directives/red-back-white-front';
import { PhoneMasksDirective } from './directives/phone-number-mask';
// Custom pipe filters
import { DateSplitFilter } from './pipes/date-split-filter';
import { TimeSplitFilter } from './pipes/time-split-filter';
import { TimeFormatFilter } from './pipes/time-fmt-filter';
import { FileSizeFilter } from './pipes/file-size-filter';
import { ConfigComponent } from './config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    FavoriteColorComponent2,
    ProfileEditorComponent,
    EditProfileComponent,
    NameEditorComponent,
    // Custom directives declaration
    BlueBackWhiteFront,
    RedBackWhiteFront,
    PhoneMasksDirective,
    // Custom pipe filters
    DateSplitFilter,
    TimeSplitFilter,
    TimeFormatFilter,
    FileSizeFilter,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
