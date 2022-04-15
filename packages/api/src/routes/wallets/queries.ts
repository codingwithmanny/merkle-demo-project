// Imports
// ========================================================
import { PrismaClient, Prisma } from '@prisma/client';
import { QueryWalletFilters, Wallet } from './types';
import dictionary from '../../utils/dictionary.json';
import { NotFound } from '../../utils/errorHandlers';

// Config
// ========================================================
const prisma = new PrismaClient();

// Queries
// ========================================================
export const QUERY_WALLETS_ALL = async () => {
  return await prisma.wallet.findMany();
};

/**
 *
 * @param param0
 * @returns
 */
export const QUERY_WALLETS = async ({
  query = null,
  take = 10,
  skip = 0,
  orderBy = 'id',
  sort = 'asc',
  findBy,
}: QueryWalletFilters) => {
  const optionOrderBy = ['id', 'address'].includes(orderBy) ? orderBy : 'id';
  const optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
  const options: Prisma.WalletFindManyArgs = {
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
          address: {
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
    total: await prisma.wallet.count(options as Prisma.WalletCountArgs),
  };

  options.take = take;
  options.skip = skip;

  const data = await prisma.wallet.findMany(options);

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
export const CREATE_WALLET = async (payload: Partial<Wallet>) => {
  const data = await prisma.wallet.create({
    data: {
      address: payload.address as string,
    },
  });

  return { data };
};

/**
 *
 * @param id
 */
export const DELETE_WALLET = async (id: string) => {
  if (
    !(await prisma.wallet.findFirst({
      where: {
        id,
      },
    }))
  )
    throw new NotFound(dictionary.WALLETS.ERROR.READ.NOT_FOUND);

  const data = await prisma.wallet.delete({
    where: {
      id,
    },
  });

  return { data };
};
