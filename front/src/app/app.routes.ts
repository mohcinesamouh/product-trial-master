import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth.guard";

export const APP_ROUTES: Routes = [
  {path : "login", component : LoginComponent},
 // {path : "", redirectTo:"login", pathMatch:"full"},
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "products", canActivate :[ AuthGuard],
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
