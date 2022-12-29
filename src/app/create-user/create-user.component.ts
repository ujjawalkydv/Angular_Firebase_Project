import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbServiceService } from '../Shared/db-service.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @ViewChild('f', { static: false }) 
  userForm!: NgForm;

  constructor(private _dbService:DbServiceService) { }

  dataTitle = 'Registered Users';

  users = [
    {
      username: 'Demo',
      age: '20',
      score: '100',
    }, 
  ]
  submitted = false;


  ngOnInit(): void {  }

  onCreateUser(username, age, score) {
    this.submitted = true;
      this.users.push({
      username: username.value,
      age: age.value,
      score: score.value 
    }) 
    this.userForm.reset();
    
  }

  onSaveUser (){
    // this._dbService.saveUser(this.users).subscribe(
    //   (response)=> console.log(response),
    //   (err)=> console.error(err)  
    // ) 
  }

  onDeleteUser(id){
    if(confirm('Do you want to delete this user?')){
      this.users.splice(id,1);
    }

  }

  
}