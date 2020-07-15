import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Course } from "../model/course";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    //this one doesn't have document id, so for display only
    // this.db
    //   .collection("courses")
    //   .valueChanges()
    //   .subscribe((val) => console.log(val));

    this.db
      .collection("courses")
      .snapshotChanges()
      .subscribe((snaps) => {
        const courses: Course[] = snaps.map((snap: any) => {
          return <Course>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data(),
          };
        });

        console.log(courses);
      });
  }
}
