export interface QueryWalletFilters {
  query?: string | null;
  take?: number;
  skip?: number;
  orderBy?: string;
  sort?: string;
  findBy?: 'id' | 'address';
}

export interface Wallet {
  id?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: Date;
}
