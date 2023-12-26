export type SoldierType = {
  name: string;
  price: number;
  sold: boolean;
  image: string;
};

export type BossType = {
  image: string;
  name: string;
  price: number;
  sold: boolean;
  auction: bigint;
  soldiers: SoldierType[]
};

export type ChooseBossProps = {
  setCurrentBoss: (boss: BossType) => void; 
};

export interface CaptainAttributes {
  trait_type: string;
  value: string;
}

export interface Captain {
  attributes: CaptainAttributes[];
  // other properties...
}