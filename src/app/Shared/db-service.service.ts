import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor( private http: HttpClient) {
  }
  // User Data

  firebaseUsersDbUrl = 'https://angular-fb-9d2c1-default-rtdb.firebaseio.com/users.json';

  saveUser(users: any[]){ 
    return this.http.post(this.firebaseUsersDbUrl, users )
  }

  getUsers(){
    return this.http.get(this.firebaseUsersDbUrl)
  }

  // Winner Data

  firebaseDbwWinnersUrl = 'https://angular-fb-9d2c1-default-rtdb.firebaseio.com/winners.json';

  
  saveWinner(winners: any){   
    return this.http.put(this.firebaseDbwWinnersUrl, winners )
  }

  getWinners(){
    return this.http.get(this.firebaseDbwWinnersUrl )
  }


}
