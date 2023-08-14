export { default as categories } from './categories';
export { default as InstructorCategories } from './instructorCategories';

const IS_TESTING = true;

export const API_URL =
  process.env.NODE_ENV !== 'development' && !IS_TESTING
    ? 'https://api-certifications.unifyedu.ng/api/v1'
    : //'https://unify-stg-cert-api.azurewebsites.net/api/v1';
      'https://unify-dev-cert-api.azurewebsites.net/api/v1';

// export const API_URL = 'https://api-certifications.unifyedu.ng/api/v1'

export const TOKEN_KEY = '$certification__auth__token';
export const USER_TYPE_KEY = '$certification__user__type__key';
export const USER_ID_KEY = '$certification__user__id__key';
export const LOCAL_COMPLETED_COURSES =
  '$certification__local__completed__courses';
