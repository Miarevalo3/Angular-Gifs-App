import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private gifsService:GifsService){}



  searchTag(tag:string){

    this.gifsService.searchTag(tag)

  }

  get tagsHistory(){
    return this.gifsService.tagsHistory
  }


}
