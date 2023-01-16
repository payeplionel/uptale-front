import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyseComponent } from './analyse/analyse.component';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { JourneyComponent } from './journey/journey.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path: 'datas', component: DataComponent
  },
  {
    path: 'analyses', component: AnalyseComponent
  },
  {
    path: 'parcours', component: JourneyComponent
  },
  {
    path:'stats', component: StatsComponent
  },
  {
    path: '', redirectTo: '/datas', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
