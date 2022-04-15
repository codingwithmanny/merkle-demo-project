// Imports
// ========================================================

import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';

// Types
// ========================================================
interface ResponseFormat {
  success: boolean;
  data?: any;
  errors?: any;
  pagination?: any;
}

// Helper Functions
// ========================================================
/**
 * Create success response object
 * @param data Any object
 * @returns {ResponseFormat}
 */
export const buildSuccessResponse = (
  data: any,
  pagination?: {
    limit?: number;
    offset?: number;
    total?: number;
  },
): ResponseFormat => {
  const response: ResponseFormat = {
    success: true,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
};

/**
 * Create errors response object
 * @param data Any object
 * @returns {ResponseFormat}
 */
export const buildErrorResponse = (errors: any): ResponseFormat => {
  return {
    success: false,
    errors,
  };
};

/**
 *
 * @param data
 */
export const generateMerkleTree = (
  walletAddresses: string[],
  walletAddressLeaf?: string,
) => {
  const walletLeafHash = `0x${keccak256(walletAddressLeaf || '').toString(
    'hex',
  )}`;
  try {
    const tree = new MerkleTree(walletAddresses, keccak256, {
      sortPairs: true,
      sortLeaves: true,
      sort: true,
      hashLeaves: true,
    });

    console.log(`Merkle tree generated.
      \nRoot hash is ${tree.getHexRoot()}
      \nTree Summary:
      \n     Leaf Count: ${tree.getLeafCount()}
      \n     Layer Count: ${tree.getLayerCount()}
      \n     Tree Depth: ${tree.getDepth()}
    `);

    const leaves = tree.getHexLeaves();
    const leafIndex = tree.getLeafIndex(walletLeafHash as any);
    const proof = tree.getHexProof(leaves[leafIndex]);

    return {
      tree: tree.toString(),
      root: tree.getHexRoot(),
      proof,
    };
  } catch (error) {
    console.log({ error });
    return {
      tree: '',
      root: '',
      proof: [],
    };
  }
};

/**
 *
 * @param walletAddresses
 * @param merkleProof
 * @param walletAddress
 * @param merkleRoot
 * @returns
 */
export const verifyMerkleProof = (
  walletAddresses: string[],
  merkleProof: string[],
  walletAddress: string,
  merkleRoot: string,
) => {
  console.log({ walletAddress });
  console.log({ merkleProof });
  console.log({ merkleRoot });

  const walletLeafHash = `0x${keccak256(walletAddress || '').toString('hex')}`;
  const tree = new MerkleTree(walletAddresses, keccak256, {
    sortPairs: true,
    sortLeaves: true,
    sort: true,
    hashLeaves: true,
  });
  return tree.verify(merkleProof, walletLeafHash, merkleRoot);
};
