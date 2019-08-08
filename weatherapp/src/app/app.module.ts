import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ExploreComponent } from './components/explore.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
