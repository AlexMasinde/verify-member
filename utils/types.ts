export type County = {
  id: number;
  county_code: string;
  county_name: string;
};

export type Errors = {
  name?: string;
  tscNumber?: string;
  subCounty?: string;
  school?: string;
  county?: string;
  email?: string;
  phoneNumber?: string;
};

export type UserData = {
  name: string;
  school: string;
  tscNumber: string;
  county: string;
  subCounty: string;
  email: string;
  phoneNumber: string;
};
