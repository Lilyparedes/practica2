import { Routes } from '@angular/router';
import { CreateOrder } from './create-order/create-order';
import { UpdateOrder } from './update-order/update-order';
import { TrackOrder } from './track-order/track-order';

export const routes: Routes = [
  { path: '', component: CreateOrder },           
  { path: 'update', component: UpdateOrder },     // actualizar orden
  { path: 'tracking', component: TrackOrder },    // rastrear orden
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
