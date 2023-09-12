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
  certificateRequired: boolean;
  courseMedia: {
    videoPreview: string | Blob | File;
    imagePreview: string | Blob | File;
  };
  pricings: {
    id: string;
    name: string;
    subscriptionType: string;
    price: number;
    offers: string[];
  }[];
  courseModules: Array<CourseModules>;
}

const CourseCreationContext = React.createContext<{
  courseInfo: CourseCreationContextFields['courseInfo'];
  courseMedia: CourseCreationContextFields['courseMedia'];
  courseModules: CourseCreationContextFields['courseModules'];
  certificateRequired: CourseCreationContextFields['certificateRequired'];
  pricings: CourseCreationContextFields['pricings'];
  updateCertificateRequired: (
    value: CourseCreationContextFields['certificateRequired']
  ) => void;
  updatePricings: (value: CourseCreationContextFields['pricings']) => void;

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
  pricings: [
    {
      id: '',
      name: '',
      subscriptionType: 'Standard' || 'Free',
      price: 0,
      offers: [''],
    },
  ],
  certificateRequired: true,
  courseModules: [],
  updateCourseInfo(value) {},
  updateCourseMedia(value) {},
  updateCourseModules(value) {},
  updateCertificateRequired(value) {},
  updatePricings(value) {},
});

export default CourseCreationContext;
