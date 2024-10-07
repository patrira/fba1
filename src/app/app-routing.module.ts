import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingleBlogComponent } from './pages/single-blog/single-blog.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:"**",
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'blog-form', component: BlogFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'blog/:id', component: SingleBlogComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
