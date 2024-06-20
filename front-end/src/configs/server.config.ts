import { HttpHeaders } from '@angular/common/http';

console.log("téléchargement config");

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrl = 'http://localhost:8081/api';
