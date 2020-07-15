import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  beginer$: Observable<Course[]>;
  advanced$: Observable<Course[]>;
  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.courses$ = this.db
      .collection("courses")
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap: any) => {
            return <Course>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data(),
            };
          });
        })
      );

    this.beginer$ = this.courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.categories.includes("BEGINNER"))
      )
    );

    this.advanced$ = this.courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.categories.includes("ADVANCED"))
      )
    );
  }
}
