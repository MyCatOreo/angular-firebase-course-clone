import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, first } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  loadAllCourses() {
    return this.db
      .collection("courses", (ref) =>
        ref.where("seqNo", ">", 0).where("seqNo", "<", 100).orderBy("seqNo")
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap: any) => {
            return <Course>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data(),
            };
          });
        }),
        first()
      );
  }
}
