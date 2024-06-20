import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-submitPicture',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class SubMitPhoto implements OnInit{
  
  public title: string = 'fileUpload';
  public images: any;
  public multipleImages: any[] = [];

  public ok: boolean = false;

  constructor(){}

  ngOnInit(){}

  @Input() 
  src: string | undefined;

  @Output('customEvent') photo: EventEmitter<string> = new EventEmitter();

  valueChanged(files: FileList) {
    if (files.length !== 1) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.src = reader.result as string;
      this.photo.emit(this.src);
    };
    this.ok = true;
  }

  deletePhoto(){
    this.src = undefined;
    this.photo.emit(this.src);
    this.ok = false;
  }
}