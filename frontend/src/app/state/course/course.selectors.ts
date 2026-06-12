import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, selectAll, selectEntities } from './course.reducer';
import { Course } from '../../models/course.model';
import { Dictionary } from '@ngrx/entity';

export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(
  selectCourseState,
  selectAll
);

export const selectCourseEntities = createSelector(
  selectCourseState,
  selectEntities
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state) => state.loading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state) => state.error
);

export const selectSelectedCourseId = createSelector(
  selectCourseState,
  (state) => state.selectedCourseId
);

export const selectSelectedCourse = createSelector(
  selectCourseEntities,
  selectSelectedCourseId,
  (entities: any, selectedId) => {
    const coursesDict = entities as Dictionary<Course>;
    return selectedId ? coursesDict[selectedId] || null : null;
  }
);

export const selectCourseFilters = createSelector(
  selectCourseState,
  (state) => state.filters
);

export const selectFilteredCourses = createSelector(
  selectAllCourses,
  selectCourseFilters,
  (courses: any, filters) => {
    const coursesList = courses as Course[];
    return coursesList.filter((course: Course) => {
      const matchesSearch = !filters.search || 
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || course.category === filters.category;
      const matchesLevel = !filters.level || course.level === filters.level;
      const matchesAvailability = !filters.availability || course.availability === filters.availability;

      return matchesSearch && matchesCategory && matchesLevel && matchesAvailability;
    });
  }
);
