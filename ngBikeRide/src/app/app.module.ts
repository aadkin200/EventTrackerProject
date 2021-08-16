import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RideService } from './services/ride.service';
import { RideListComponent } from './components/ride-list/ride-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RideListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RideService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
