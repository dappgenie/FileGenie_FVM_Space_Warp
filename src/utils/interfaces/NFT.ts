export interface INFTData {
  bookingId: number,
  description: string, 
  hotelName: string, 
  checkin: string, 
  checkout: string, 
  adults: number, 
  children: number,
  roomName: string,
  city: string
  price: string
  price_with_tax: string
  buk_commission: string
  cancel_penalties?: string[]
  cancellation_policies?: string
  pet_friendly?: string
  parking?: string
  rating?: string
  hotelID: string
  transferable: boolean
  refundable: string,
  cancellationPolicies?: string[]
  nonRefundableDates?: string[]
}

export interface StoreImageResult {
  cid: string;
  imageURI: string;
  metadataURI: string;
  imageGatewayURL: string;
  metadataGatewayURL: string;
}

export interface INFTAttribute {
  display_type: 'property' | 'number' | 'date' | 'boost_number' | 'boost_percentage'
  trait_type: string;
  value: string;
}

export interface INFTStructure {
  image: Blob | File | null;
  name: string;
  description?: string;
  attributes?: INFTAttribute[];
}

export interface INFTCollection {
  name: string;
  nfts: INFTStructure[];
}


export interface ISingleNFT {
  id: number,
  name: string, 
  cid: string, 
  uri: string, 
  user_wallet: string 
}
