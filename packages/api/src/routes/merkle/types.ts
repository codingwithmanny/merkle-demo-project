export interface QueryMerkleFilters {
  query?: string | null;
  take?: number;
  skip?: number;
  orderBy?: string;
  sort?: string;
  findBy?: 'id' | 'merkleTree' | 'merkleRoot';
}

export interface Merkle {
  id?: string;
  merkleTree?: string;
  merkleRoot?: string;
  createdAt?: string;
  updatedAt?: Date;
}
