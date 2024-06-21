import { HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';

console.log("téléchargement config");

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrl = env.serverUrl;
