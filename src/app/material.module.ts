// https://stackoverflow.com/questions/45166844/how-to-import-angular-material-in-project
import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatLineModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSliderModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatLineModule,
        MatGridListModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSliderModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatLineModule,
        MatGridListModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSliderModule
    ]
})

export class MaterialModule { }

