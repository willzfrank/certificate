import { Category, CourseModules, LastSavedPointType } from 'app/types';
import * as React from 'react';

export interface CourseCreationContextFields {
  courseInfo: {
    id: string;
    courseName: string;
    subtitle: string;
    categories: Category[];
    courseDescription: string;
    targetAudience: string;
    lastSavePoint: LastSavedPointType;
    redirectUrl?: string;
    isExternal: boolean;
  };
  isCertificateRequired: {
    price: number;
    isCertified: boolean;
  };
  courseMedia: {
    videoPreview: string | Blob | File;
    imagePreview: string | Blob | File;
  };
  courseModules: Array<CourseModules>;
}

const CourseCreationContext = React.createContext<{
  courseInfo: CourseCreationContextFields['courseInfo'];
  courseMedia: CourseCreationContextFields['courseMedia'];
  courseModules: CourseCreationContextFields['courseModules'];
  isCertificateRequired: CourseCreationContextFields['isCertificateRequired'];
  updateIsCertificateRequired: (
    value: CourseCreationContextFields['isCertificateRequired']
  ) => void;

  updateCourseInfo: (value: CourseCreationContextFields['courseInfo']) => void;
  updateCourseMedia: (
    value: CourseCreationContextFields['courseMedia']
  ) => void;
  updateCourseModules: (
    value: CourseCreationContextFields['courseModules']
  ) => void;
}>({
  courseInfo: {
    id: '',
    courseName: '',
    subtitle: '',
    categories: [],
    courseDescription: '',
    targetAudience: '',
    lastSavePoint: 0,
    isExternal: false,
  },
  courseMedia: {
    videoPreview: '',
    imagePreview: '',
  },
  isCertificateRequired: {
    price: 0,
    isCertified: true,
  },
  courseModules: [],
  updateCourseInfo(value) {},
  updateCourseMedia(value) {},
  updateCourseModules(value) {},
  updateIsCertificateRequired(value) {},
});

export default CourseCreationContext;
