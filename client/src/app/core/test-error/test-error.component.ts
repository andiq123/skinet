import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: string[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/notfound').subscribe(
      (response) => {
        console.log(response);
      },
      (e) => console.log(e)
    );
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(
      (response) => {
        console.log(response);
      },
      (e) => console.log(e)
    );
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(
      (response) => {
        console.log(response);
      },
      (e) => console.log(e)
    );
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'buggy/badrequest/fortyTwo').subscribe(
      (response) => {
        console.log(response);
      },
      (e) => {
        console.log(e);
        this.validationErrors = e;
      }
    );
  }
}
