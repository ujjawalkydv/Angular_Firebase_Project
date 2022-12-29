import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbServiceService } from '../Shared/db-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css']
})
export class ToppersComponent implements OnInit {
  userForm!: NgForm;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['index', 'name', 'age', 'score'];

  dataSource: any;
  topperData: any[];

  showSpinner = false;

  constructor(private _dbService: DbServiceService) { }

  ngOnInit(): void {
    this.onFetchTopper();
  }


  onFetchTopper() {
    this.showSpinner = true;
    this._dbService.getUsers().subscribe(
      (response) => {
        //console.log(response)
        const data = JSON.stringify(response)
        // console.log(data)
        const newData= JSON.parse(data)
        // console.log(newData)
        const finalData = newData.filter(newData=> {
          return newData.score >= 90;
        });
        this.topperData = finalData;
        this.showSpinner = false;

        // PaginatorCode
        this.dataSource = new MatTableDataSource(this.topperData)
        this.dataSource.paginator = this.paginator;
      },
      (err) => console.error(err)
    )

  }

}
