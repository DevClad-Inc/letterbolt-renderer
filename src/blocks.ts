/* Think I might have to use something like this, this is a rough outline */

type Block = {
  pageID: string;
  blockNo: number;
};

const blockMap: Map<string, Block> = new Map();

const getBlock = (key: string) => {
  if (blockMap.has(key)) {
    return blockMap.get(key);
  }
  throw new Error("Block not found");
};

const setBlock = (key: string, block: Block) => {
  if (blockMap.has(key)) {
    throw new Error("Block already exists");
  }
  blockMap.set(key, block);
};

export { getBlock, setBlock };
