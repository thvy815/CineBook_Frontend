export interface PromotionDto {
  id: string;
  code: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  startDate: string;     // ISO string
  endDate: string;       // ISO string
  isActive: boolean;
  isOneTimeUse: boolean;
  description?: string;
}

export interface UpdatePromotionRequest {
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  startDate: string;     // ISO string
  endDate: string;       // ISO string
  isActive: boolean;
  isOneTimeUse: boolean;
  description?: string;
}
