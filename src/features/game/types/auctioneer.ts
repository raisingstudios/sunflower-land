export type AuctioneerItemName =
  | "Peeled Potato"
  | "Christmas Snow Globe"
  | "Cabbage Boy"
  | "Cabbage Girl"
  | "Wood Nymph Wendy"
  | "Cyborg Bear"
  | "Collectible Bear";

export const AUCTIONEER_ITEMS: Record<
  AuctioneerItemName,
  { description: string; boost?: string }
> = {
  "Peeled Potato": {
    description: "A precious potato, encourages bonus potatoes on harvest.",
  },
  "Cabbage Boy": {
    description: "Don't wake the baby!",
  },
  "Cabbage Girl": {
    description: "Shhh it's sleeping",
  },
  "Wood Nymph Wendy": {
    description: "Cast an enchantment to entice the wood fairies.",
    boost: "+0.2 Wood",
  },
  "Christmas Snow Globe": {
    description: "Swirl the snow and watch it come to life",
  },
  "Cyborg Bear": {
    description: "Hasta la vista, bear",
  },
  "Collectible Bear": {
    description: "A prized possession still in mint condition!",
  },
};
