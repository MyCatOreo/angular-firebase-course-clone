import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { OrderByDirection } from "firebase/storage";
import { map, first } from "rxjs/operators";
import { Course } from "../model/course";
import { convertSnaps } from "../../db-utils";
import { Observable } from "rxjs";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  loadAllCourses(): Observable<Course[]> {
    return this.db
      .collection("courses", (ref) =>
        ref.where("seqNo", ">", 0).where("seqNo", "<", 100).orderBy("seqNo")
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return convertSnaps<Course>(snaps);
        }),
        first()
      );
  }

  findCourseByUrl(url: string): Observable<Course> {
    return this.db
      .collection("courses", (ref) => ref.where("url", "==", url))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const courses = convertSnaps<Course>(snaps);
          return courses.length === 1 ? courses[0] : undefined;
        }),
        first()
      );
  }

  findLessons(
    courseId: string,
    sortOrder: OrderByDirection = "asc",
    pageNumber: number = 0,
    pageSize: number = 3
  ): Observable<Lesson[]> {
    return this.db
      .collection(`courses/${courseId}/lessons`, (ref) =>
        ref
          .orderBy("seqNo", sortOrder)
          .limit(pageSize)
          .startAfter(pageSize * pageNumber)
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return convertSnaps<Lesson>(snaps);
        }),
        first()
      );
  }
}
