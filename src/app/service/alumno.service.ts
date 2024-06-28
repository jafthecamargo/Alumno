import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Alumno } from "../model/Alumno";
import {map, Observable, pipe} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private endPoint: string = 'http://localhost:8080/api/alumnos';
  private httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  )
  constructor() { }


  mostrarAlumnos(http: HttpClient) {
    return http
      .get<Alumno[]>(this.endPoint)
      .pipe(map((response) => response as Alumno[]));
  }

  mostrarAlumno(http: HttpClient, id: number) {
    return http.get<Alumno>(`${this.endPoint}/${id}`);
  }

  crearAlumno(http: HttpClient, alumno: Alumno): Observable<Alumno>{
    return http.post<Alumno>(this.endPoint, alumno,
      {
        headers : this.httpHeaders,
      });
  }

  actualizarAlumno(http: HttpClient, alumno: Alumno): Observable<Alumno>{
    return http.put<Alumno>(`${this.endPoint}/${alumno.idAlumno}`,
      alumno,
      {
        headers : this.httpHeaders,
      });
  }

  eliminarAlumno(http: HttpClient, id: number): Observable<Alumno>{
    return http.delete<Alumno>(`${this.endPoint}/${id}`,
      {
        headers : this.httpHeaders,
      });
  }
}
