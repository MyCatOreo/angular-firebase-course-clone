import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  beginer$: Observable<Course[]>;
  advanced$: Observable<Course[]>;
  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.courses$ = this.coursesService.loadAllCourses();

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
