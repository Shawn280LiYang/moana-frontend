import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { routing } from './app.routing';
import { PanelComponent } from './panel/panel.component';
import { ProfileComponent } from './panel/profile.component';
import { LoginComponent } from './panel/login.component';
import { createNewHosts, removeNgStyles } from "@angularclass/hmr/dist/helpers";
import { MovieService } from "./service/movie.service";
import { UserpanelService } from "./service/userpanel.service";
import { MovieorderComponent } from "./components/movieorder/movieorder.component";
import { MovielistComponent } from "./components/movielist/movielist.component";
import { TabnavComponent } from "./components/tabnav/tabnav.component";
import { ListformComponent } from "./components/listform/listform.component";
import { InputelementComponent } from "./components/inputelement/inputelement.component";
import { LoginService } from "./service/login.service";
import { CheckLoginService } from "./service/checklogin.service";
import { ProfileService } from "./service/profile.service";
import { FooterService } from "./service/footer.service";
import { ThirdPartyDivComponent } from "./components/thirdPartyDiv/thirdpartydiv.component";
import {ThirdPartyPanelComponent} from "./panel/thirdpartypanel.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    CarouselComponent,
    MovielistComponent,
    TabnavComponent,
    PanelComponent,
    ProfileComponent,
    LoginComponent,
    MovieorderComponent,
    ListformComponent,
    InputelementComponent,
    ThirdPartyDivComponent,
      ThirdPartyPanelComponent,
  ],
  providers: [
      MovieService,
      UserpanelService,
      LoginService,
      CheckLoginService,
      ProfileService,
      FooterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
    // console.log(wx);
  }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
