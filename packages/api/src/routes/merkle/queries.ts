// Imports
// ========================================================
import { PrismaClient, Prisma } from '@prisma/client';
import { QueryMerkleFilters, Merkle } from './types';
import dictionary from '../../utils/dictionary.json';
import { NotFound } from '../../utils/errorHandlers';

// Config
// ========================================================
const prisma = new PrismaClient();

// Queries
// ========================================================
/**
 *
 * @param param0
 * @returns
 */
export const QUERY_MERKLES = async ({
  query = null,
  take = 10,
  skip = 0,
  orderBy = 'id',
  sort = 'asc',
  findBy,
}: QueryMerkleFilters) => {
  const optionOrderBy = ['id', 'address'].includes(orderBy) ? orderBy : 'id';
  const optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
  const options: Prisma.MerkleTreeFindManyArgs = {
    where: {},
  };

  if (findBy && query) {
    options.where = {
      [findBy]: query,
    };
  } else if (query) {
    options.where = {
      OR: [
        {
          merkleTree: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  options.orderBy = {
    [optionOrderBy]: optionSort,
  };

  const pagination = {
    query,
    take,
    skip,
    orderBy: optionOrderBy,
    sort: optionSort,
    total: await prisma.merkleTree.count(options as Prisma.MerkleTreeCountArgs),
  };

  options.take = take;
  options.skip = skip;

  const data = await prisma.merkleTree.findMany(options);

  return { data, pagination };
};

/**
 *
 * @param id
 */
export const QUERY_WALLET = async (address: string) => {
  const data = await prisma.wallet.findFirst({
    where: {
      address,
    },
  });

  if (!data) {
    throw new NotFound(dictionary.WALLETS.ERROR.READ.NOT_FOUND);
  }

  return { data };
};

/**
 *
 * @param payload
 * @returns
 */
export const CREATE_MERKLE = async (payload: Partial<Merkle>) => {
  const data = await prisma.merkleTree.create({
    data: {
      merkleTree: payload.merkleTree as string,
      merkleRoot: payload.merkleRoot as string,
    },
  });

  return { data };
};
