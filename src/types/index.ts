export interface CollectionItem {
  id: number;
  title: string;
  authorImage: string;
  nftImage: string;
  nftId: number;
  authorId: number;
  code: number;
}

export interface NewItem {
  id: number;
  authorId: number;
  authorImage: string;
  nftImage: string;
  nftId: number;
  title: string;
  price: number;
  likes: number;
  expiryDate: number;
}

export interface TopSeller {
  id: number;
  authorName: string;
  authorImage: string;
  authorId: number;
  price: number;
}

export interface ExploreItem {
  id: number;
  authorId: number;
  authorImage: string;
  nftImage: string;
  nftId: number;
  title: string;
  price: number;
  likes: number;
  expiryDate?: number;
}

export interface AuthorNft {
  id: number;
  nftImage: string;
  title: string;
  price: number;
  likes: number;
}

export interface AuthorDetails {
  id: number;
  authorName: string;
  tag: string;
  address: string;
  authorImage: string;
  authorId: number;
  followers: number;
  nftCollection: AuthorNft[];
}

export interface ItemDetails {
  id: number;
  title: string;
  tag: string;
  description: string;
  nftImage: string;
  nftId: number;
  ownerName: string;
  ownerId: number;
  ownerImage: string;
  creatorName: string;
  creatorId: number;
  creatorImage: string;
  price: number;
  likes: number;
  views: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string;
  balance: number;
  walletName: string;
}
