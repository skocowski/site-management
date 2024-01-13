export type Permit = {
  id: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  applicant?: string;
  description?: string;
  company?: string;
  location?: string;
  type?: string;
  rams?: string;
  badge?: string;
  isolation?: string;
  date?: number;
  status?: string;
  email: string;

  equipment?: string;
  startDate?: string;
  endDate?: string;
  pointsOfIsolation?: string;
  primaryEarthingDevice?: string;
  actionsTaken?: string;
  furtherPrecautions?: string;
  variedPrecautions?: string;
};