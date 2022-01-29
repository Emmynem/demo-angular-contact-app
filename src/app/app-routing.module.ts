import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './404/404.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile-editor', component: ProfileEditorComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'name-editor', component: NameEditorComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
