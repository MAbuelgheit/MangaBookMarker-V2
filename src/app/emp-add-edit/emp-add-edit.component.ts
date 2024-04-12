import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MangaService } from './../services/manga.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  MangaForm : FormGroup ;
  constructor( 
    private _fb : FormBuilder ,
    private _mangaService : MangaService , 
    private _dialogRef : MatDialogRef<EmpAddEditComponent>,
    private _core : CoreService,
    @Inject(MAT_DIALOG_DATA) public data : any,
  ){
    this.MangaForm = this._fb.group({
      name : '',
      category : '',
      date : '',
      link : '',
      plink : '',
      status : '',
      lastReadChapter : Number,
      totalChapters : Number,
    })
  }

  ngOnInit(): void {
      this.MangaForm.patchValue(this.data)
  }
  onSubmit(){
    if(this.MangaForm.valid){
        if(this.data){
          this._mangaService.editManga(this.data.id,this.MangaForm.value).subscribe({
            next: (val: any) => {
              this._core.openSnackBar("Manga Updated!","Hide")
              this._dialogRef.close(true);
            },error : (err : any) => {
              console.log(err)
            },
          })
        }else{
          this._mangaService.addManga(this.MangaForm.value).subscribe({
            next: (val: any) => {
              this._core.openSnackBar("Manga Added Successfully!","Hide")
              this._dialogRef.close(true);
            },error : (err : any) => {
              console.log(err)
            },
          })
        }
      }
  }

}
