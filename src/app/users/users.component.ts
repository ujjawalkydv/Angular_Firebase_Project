import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


import { DbServiceService } from '../Shared/db-service.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userForm!: NgForm;

  displayedColumns: string[] = ['index', 'name', 'score', 'action'];

  dataSource: any;
  userData: any[];

  winnerData: {}[] = [];

  showSpinner = false;



  constructor(private _dbService: DbServiceService,
    private sanckBar: MatSnackBar) { }
  winners: any = [

  ]
  ngOnInit(): void {
    this.onFetchUser();

    this._dbService.getWinners().subscribe(
      (response) => {
        // console.log("user-winner=====",response)
        this.winners = response && response != null ? JSON.parse(JSON.stringify(response)) : []
      },
      (err) => console.error(err)
    )
  }




  // To Fetch User Data from Database

  onFetchUser() {
    
    this.showSpinner = true;
    this._dbService.getUsers().subscribe(
      (response) => {
        // console.log(response)
        const data = JSON.stringify(response)
        // console.log(data)
        const newData = JSON.parse(data)
        // console.log(newData)
        const finalData = newData.filter(newData => {
          return newData.age <= 21;
          
        });
        this.userData = finalData;
        this.showSpinner = false;

        // Paginator & Sort 
        this.dataSource = new MatTableDataSource(this.userData)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => console.error(err)
    )
  }


  //  Filter on User Page

  filterChange(event: Event) {
    const filValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filValue;

  }


  // To save winner Data on Click to Database

  onSaveWinner(data: any) {
    // console.log(data, this.winners)
    let addMessage: any = 'Do you want to add  ' + data.username + ' to Winner list?'
    let alertMessage: any = '  ' + data.username + ' already exists in winner list'
    let sucessMessage: any = '  ' + data.username + ' successfully added to winner list'

    if (confirm(addMessage)) {
      let alreadyData = this.winners.find((el: any) => el.username == data.username);
      if (!alreadyData) {
        this.winners.push(data)
        this._dbService.saveWinner(this.winners).subscribe(
          (response) => console.log(response),
          (err) => console.error(err),
        )
        this.sanckBar.open(sucessMessage, 'Dismiss')
      } else {
        this.sanckBar.open(alertMessage, 'Dismiss')
      }
    }

  }
}

