export interface Product {
    __typename: string;
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    representativePrice: RepresentativePrice;
    primaryPhoto: PrimaryPhoto;
    reviewsStats: ReviewsStats;
    ufiDetails: UfiDetails;
    offers: Offer[];
    supportedFeatures: SupportedFeatures;
    flags: Flag[];
    cancellationPolicy: CancellationPolicy;
  }
  
  export interface CancellationPolicy {
    __typename: string;
    hasFreeCancellation: boolean;
  }
  
  export interface RepresentativePrice {
    __typename: string;
    chargeAmount: number;
    currency: string;
    publicAmount: number;
  }
  
  export interface PrimaryPhoto {
    __typename: string;
    small: string;
  }
  
  export interface ReviewsStats {
    __typename: string;
    allReviewsCount: number;
    percentage: string;
    combinedNumericStats: CombinedNumericStats;
  }
  
  export interface CombinedNumericStats {
    __typename: string;
    average: number;
    total: number;
  }
  
  export interface UfiDetails {
    __typename: string;
    bCityName: string;
    ufi: number;
    url: Url;
  }
  
  export interface Url {
    __typename: string;
    country: string;
  }
  
  export interface Offer {
    __typename: string;
    items: OfferItem[];
  }
  
  export interface OfferItem {
    __typename: string;
    id: string;
  }
  
  export interface SupportedFeatures {
    __typename: string;
    nativeApp: boolean;
  }
  
  export interface Flag {
    __typename: string;
    flag: string;
    value: boolean;
    rank: number;
  }
