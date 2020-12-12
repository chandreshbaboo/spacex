import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceProgramsRoutingModule } from './space-programs-routing.module';
import { ListingComponent } from './listing/listing.component';


@NgModule({
  declarations: [
    ListingComponent
  ],
  imports: [
    CommonModule,
    SpaceProgramsRoutingModule
  ]
})
export class SpaceProgramsModule { }
