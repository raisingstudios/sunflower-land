import React, { useContext } from "react";
import { Context } from "features/game/GoblinProvider";

import { getValidAuctionItems } from "./actions/auctioneerItems";
import { useActor } from "@xstate/react";
import { MachineInterpreter } from "features/retreat/auctioneer/auctioneerMachine";
import { AuctionDetails } from "./AuctionDetails";
import { AuctioneerItemName } from "features/game/types/auctioneer";

export const AuctioneerContent = () => {
  const { goblinService } = useContext(Context);
  const [goblinState] = useActor(goblinService);

  const child = goblinState.children.auctioneer as MachineInterpreter;

  const [auctioneerState, send] = useActor(child);

  const { auctioneerItems } = auctioneerState.context;

  const upcoming = getValidAuctionItems(auctioneerItems);

  const mint = (item: AuctioneerItemName) => {
    send({ type: "MINT", item, captcha: "" });
  };

  if (upcoming.length === 0) {
    return (
      <div className="flex flex-col">
        <span className="mt-1 ml-2">Coming soon...</span>
      </div>
    );
  }

  const item = upcoming[0];
  return (
    <div
      className="h-full overflow-y-auto scrollable"
      style={{
        maxHeight: "600px",
      }}
    >
      <AuctionDetails
        item={item}
        game={goblinState.context.state}
        onMint={() => mint(item.name)}
        isMinting={auctioneerState.matches("minting")}
        isUpcomingItem={false}
      />
    </div>
  );
};
