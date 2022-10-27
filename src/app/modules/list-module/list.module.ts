import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ListRecordComponent } from './components/list/list-record/list-record.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ListRoutingModule} from "./list-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
    declarations: [
        ListComponent,
        ListRecordComponent
    ],
    exports: [
        ListComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ListRoutingModule,
        ReactiveFormsModule,
        NgbModule
    ]
})
export class ListModule { }
