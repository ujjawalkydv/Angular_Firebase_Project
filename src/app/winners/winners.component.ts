import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbServiceService } from '../Shared/db-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  userForm!: NgForm;

  displayedColumns: string[] = ['index', 'name','score'];

  dataSource: any;
  winnerData: any[];

  showSpinner = false;
  

  constructor(private _dbService: DbServiceService) { }

  ngOnInit(): void {
    this.onFetchWinner ();
  }

  onFetchWinner() {
    this.showSpinner = true;
    this._dbService.getWinners().subscribe(
      (response) => {
        // console.log(response)
        const data = JSON.stringify(response)
        // console.log(data)
        const finalData= JSON.parse(data)
        // console.log(finalData)

        this.winnerData = finalData
        this.showSpinner = false;

        // Paginator Code
        this.dataSource = new MatTableDataSource(this.winnerData)
        this.dataSource.paginator = this.paginator;
      },
      (err) => console.error(err)
    )

  }





 
}
