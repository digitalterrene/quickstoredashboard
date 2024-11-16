export interface CJDAccountSettingsResponse {
  code: number;
  result: boolean;
  message: string;
  data: {
    openId: number;
    openName: string;
    openEmail: string;
    setting: {
      quotaLimits: {
        quotaUrl: string;
        quotaLimit: number;
        quotaType: number;
      }[];
      qpsLimit: number;
    };
    callback: {
      productType: string;
      productCallbackUrls: string[];
    };
    root: string;
    isSandbox: boolean;
  };
  requestId: string;
}
export interface CJDAccessTokenResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    [key: string]: any;
  };
  message?: string;
}

export interface CJDUserData {
  data: {
    refreshToken: string;
  };
}

export interface CJDCategory {
  id: number;
  name: string;
  parentId: number;
}

export interface CJDCategoryResponse {
  code: number;
  result: boolean;
  message: string;
  data: CJDCategory[];
}

export interface CJDProduct {
  id: string;
  sku: string;
  name: string;
  nameEn: string;
  type: string;
  countryCode: string;
  createTime: string;
  price: number;
  // Add other fields as necessary
}

export interface CJDProductResponse {
  code: number;
  result: boolean;
  message: string;
  data: CJDProduct[] | any;
}

export interface FetchCJDProductsParams {
  pageNum?: number;
  pageSize?: number;
  categoryId?: string;
  pid?: string;
  productSku?: string;
  productName?: string;
  productNameEn?: string;
  productType?: string;
  countryCode?: string;
  createTimeFrom?: string;
  createTimeTo?: string;
  brandOpenId?: string;
  minPrice?: number;
  maxPrice?: number;
}
// types.ts
export interface CJDProductDetails {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  // Add other fields as necessary
}

export interface CJDProductDetailsResponse {
  code: number;
  result: boolean;
  message: string;
  data: CJDProductDetails;
}

export interface FetchCJDProductDetailsParams {
  pid?: string;
  productSku?: string;
  variantSku?: string;
}
// types.ts
export interface CJDVariant {
  variantId: string;
  variantSku: string;
  variantName: string;
  price: number;
  stock: number;
  // Add other fields as necessary
}

export interface CJDVariantResponse {
  code: number;
  result: boolean;
  message: string;
  data: CJDVariant[];
}

export interface FetchCJDVariantsParams {
  pid?: string;
  productSku?: string;
  variantSku?: string;
}
