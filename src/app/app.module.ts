import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FacilitiesComponent } from './facilities/facilities.component';
import { BackgroundComponent } from './background/background.component';
import { ProblemdefinitionComponent } from './problemdefinition/problemdefinition.component';
import { SwotComponent } from './swot/swot.component';
import { AbilitytopayComponent } from './abilitytopay/abilitytopay.component';
import { CustomerproposalComponent } from './customerproposal/customerproposal.component';
import { PaymentplanComponent } from './paymentplan/paymentplan.component';
import { RemedialofferingsComponent } from './remedialofferings/remedialofferings.component';
import { ActionsComponent } from './actions/actions.component';
// import { RoutesModule } from './routes/routes.module';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        FacilitiesComponent,
        BackgroundComponent,
        ProblemdefinitionComponent,
        SwotComponent,
        AbilitytopayComponent,
        CustomerproposalComponent,
        PaymentplanComponent,
        RemedialofferingsComponent,
        ActionsComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
      NgbModule,
      FileUploadModule,
        SharedModule.forRoot(),
        // RoutesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
