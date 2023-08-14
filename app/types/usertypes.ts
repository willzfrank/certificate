import { string } from "yup";

export enum USERTYPES {
  INSTRUCTOR = "instructor",
  STUDENT = "student",
}

export interface Profession {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export type USER = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePictureUrl?: string;
  roleName?: USERTYPES | null;
  dateOfBirth?: string | null;
  dateCreated?: string;
  token?: string;
  professions?: Profession[];
};

export interface InstructorModel extends USER {
  professions: Profession[];
  userName: string;
  professionIds: string[];
  bio: string;
}

export type USERMODEL = USER | InstructorModel;
