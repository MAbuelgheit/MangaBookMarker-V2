import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MangaService } from './services/manga.service';
import { OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './services/core.service';

export interface mangaData {
  name : string,
  category : string,
  date : string,
  link : string,
  plink : string,
  status : string,
  lastReadChapter : Number,
  totalChapters : Number,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'MangaBookMarker';


  displayedColumns: string[] = [
     'card',
          ]
           ;
  dataSource!: MatTableDataSource<mangaData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private _dialog: MatDialog , 
    private _mangaService : MangaService,
    private _core : CoreService
  ){
  }

  ngOnInit(): void{
    this.getMangaList()
  }
  openAddEditMangaForm(){
    const _dialogRef = this._dialog.open(EmpAddEditComponent)
    _dialogRef.afterClosed().subscribe({
      next : (val) => {
        if(val){
          this.getMangaList()
        }
      }
    })
  }

  openEditMangaForm(data : any){
    const _dialogRef = this._dialog.open(EmpAddEditComponent,{data : data})
    _dialogRef.afterClosed().subscribe({
      next : (val) => {
        if(val){
          this.getMangaList()
        }
      }
    })
  }


  getMangaList(){
    this._mangaService.getMangaList().subscribe({
      next : (res) =>{
        this.dataSource =  new MatTableDataSource(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      } ,error : console.log
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteManga(id : string){
    this._mangaService.deleteManga(id).subscribe({
      next: (res) => {
        this._core.openSnackBar("Manga Deleted","Hide")
        this.getMangaList()
      },error: console.log
      
    })
  }
}
