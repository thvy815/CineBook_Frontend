export interface UserProfile {
  email: string;
  username: string;
  fullname: string;
  avatarUrl?: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber: string;
  nationalId?: string;
  address?: string;
  loyaltyPoint: number;
  status: string;
}

export interface UserProfileUpdate {
  email: string;
  username: string;
  fullname: string;
  avatarUrl?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  phoneNumber: string;
  nationalId?: string | null;
  address?: string | null;
  loyaltyPoint: number;
  status: string;
}
