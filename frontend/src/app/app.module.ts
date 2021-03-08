import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';

// Angular Materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {MatTabsModule} from '@angular/material/tabs';



import { AdminModalComponent } from './admin-modal/admin-modal.component';
import { PrintViewComponent } from './print-view/print-view.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AdminModalComponent,
    PrintViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatOptionModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatSidenavModule,
    SnotifyModule,
    MatDatepickerModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    NgbModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: 'SnotifyToastConfig',
      useValue: ToastDefaults
    },
    SnotifyService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
