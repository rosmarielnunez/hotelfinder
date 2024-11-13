export interface Product {
    // Modelo para el producto de la atracción
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
  
  // Modelo para la política de cancelación
  export interface CancellationPolicy {
    __typename: string;
    hasFreeCancellation: boolean;
  }
  
  // Modelo para el precio representativo
  export interface RepresentativePrice {
    __typename: string;
    chargeAmount: number;
    currency: string;
    publicAmount: number;
  }
  
  // Modelo para la foto principal
  export interface PrimaryPhoto {
    __typename: string;
    small: string;
  }
  
  // Modelo para estadísticas de reseñas
  export interface ReviewsStats {
    __typename: string;
    allReviewsCount: number;
    percentage: string;
    combinedNumericStats: CombinedNumericStats;
  }
  
  // Modelo para estadísticas combinadas de reseñas
  export interface CombinedNumericStats {
    __typename: string;
    average: number;
    total: number;
  }
  
  // Modelo para los detalles de la ubicación de la atracción
  export interface UfiDetails {
    __typename: string;
    bCityName: string;
    ufi: number;
    url: Url;
  }
  
  // Modelo para la URL de la ubicación
  export interface Url {
    __typename: string;
    country: string;
  }
  
  // Modelo para las ofertas
  export interface Offer {
    __typename: string;
    items: OfferItem[];
  }
  
  // Modelo para cada elemento de oferta
  export interface OfferItem {
    __typename: string;
    id: string;
  }
  
  // Modelo para las características soportadas del producto
  export interface SupportedFeatures {
    __typename: string;
    nativeApp: boolean;
  }
  
  // Modelo para las banderas (flags)
  export interface Flag {
    __typename: string;
    flag: string;
    value: boolean;
    rank: number;
  }
