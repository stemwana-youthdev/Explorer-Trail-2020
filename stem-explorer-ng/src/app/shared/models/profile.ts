export interface Profile {
  id: number;
  email: string;
  userId: string;
  profileCompleted: boolean;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  region?: string;
  homeTown?: string;
}
