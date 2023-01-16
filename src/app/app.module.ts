import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataComponent} from './data/data.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DataDialog} from './data/data.component';
import {DialogStructureView} from './data/data.component';
import {DataAdd} from './experience-data/experience-data.component';
import {DialogGroupView} from './data/data.component';
import {NgChartsModule} from 'ng2-charts';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {AnalyseComponent} from './analyse/analyse.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableExporterModule} from 'mat-table-exporter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Globals} from './Globals';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ExperienceDataComponent} from './experience-data/experience-data.component';
import {MatRadioModule} from '@angular/material/radio';
import { LearnerDataComponent } from './learner-data/learner-data.component';
import { InformationSelectorComponent } from './information-selector/information-selector.component';
import { JourneyComponent } from './journey/journey.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ListLearnerComponent } from './list-learner/list-learner.component';
import { GraphCountComponent } from './graph-count/graph-count.component';
import { TimeSceneComponent } from './time-scene/time-scene.component';
import { ChoiceSceneComponent } from './choice-scene/choice-scene.component';
import { StatsComponent } from './stats/stats.component';
import { StatsTimeSceneComponent } from './stats-time-scene/stats-time-scene.component';
import { StatsAnswerGroupComponent } from './stats-answer-group/stats-answer-group.component';
import { UploadQuizComponent } from './upload-quiz/upload-quiz.component';
import { DialogQuiz } from './stats/stats.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { DialogQuestionnaire } from './stats/stats.component';
import { ManageQuestion } from './data/data.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ManageRessourcesComponent } from './manage-ressources/manage-ressources.component';
import { RessourcesGestion } from './manage-ressources/manage-ressources.component';
import { ressourcesGroup } from './manage-ressources/manage-ressources.component';


@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    DataDialog,
    AnalyseComponent,
    DialogStructureView,
    DialogGroupView,
    DataAdd,
    ExperienceDataComponent,
    LearnerDataComponent,
    InformationSelectorComponent,
    JourneyComponent,
    ListLearnerComponent,
    GraphCountComponent,
    TimeSceneComponent,
    ChoiceSceneComponent,
    StatsComponent,
    StatsTimeSceneComponent,
    StatsAnswerGroupComponent,
    UploadQuizComponent,
    DialogQuiz,
    QuizQuestionsComponent,
    ManageQuestion,
    DialogQuestionnaire,
    ManageRessourcesComponent,
    RessourcesGestion,
    ressourcesGroup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    NgChartsModule,
    HttpClientModule,
    MatTooltipModule,
    MatTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableExporterModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatGridListModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    Globals,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
