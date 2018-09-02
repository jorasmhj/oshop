import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<any[]> {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().pipe(
      map(items => {
        let data = [];
        items.forEach(element => {
          let d = element.payload.val();
          const key = element.payload.key;
          d['key'] = key;
          data.push(d);
        });
        return data;
      })
    );
  }
}
