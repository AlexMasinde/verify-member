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

export type ExhibitorErrors = {
  name?: string;
  description?: string;
  contactPerson?: string;
  email?: string;
  phoneNumber?: string;
  spaceReserved?: string;
};

export type UserData = {
  name: string;
  school: string;
  tscNumber: string;
  county: string;
  subCounty: string;
  email: string;
  phoneNumber: string;
  confirmedTSCDeduction: boolean;
};

export type ExhibitorData = {
  name: string;
  email: string;
  description: string;
  spaceReserved: string;
  phoneNumber: string;
  contactPerson: string;
};

export type SpaceData = {
  price: string;
  tent: string;
  tables: string;
  chairs: string;
  tags: string;
  availableSpaces: string;
  id: string;
};
