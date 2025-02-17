import React, { useContext, useState } from "react";

import * as Auth from "features/auth/lib/Provider";

import { Modal } from "react-bootstrap";
import { Button } from "components/ui/Button";
import { Panel } from "components/ui/Panel";

import { Context } from "features/game/GameProvider";
import { TransferAccount } from "./TransferAccount";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { SUNNYSIDE } from "assets/sunnyside";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SubSettings: React.FC<Props> = ({ isOpen, onClose }) => {
  const { authService } = useContext(Auth.Context);

  const { gameService } = useContext(Context);

  const [view, setView] = useState<"settings" | "transfer">("settings");

  const onLogout = () => {
    onClose();
    authService.send("LOGOUT"); // hack used to avoid redundancy
  };

  const refreshSession = () => {
    onClose();
    gameService.send("RESET");
  };

  const Content = () => {
    if (view === "transfer") {
      return (
        <Panel className="p-0">
          <TransferAccount
            isOpen={true}
            onClose={() => {
              onClose();
              setView("settings");
            }}
          />
        </Panel>
      );
    }

    return (
      <CloseButtonPanel title="Settings" onClose={onClose}>
        <Button className="col p-1" onClick={onLogout}>
          Logout
        </Button>
        <Button className="col p-1 mt-2" onClick={() => setView("transfer")}>
          Transfer Ownership
        </Button>
        <Button className="col p-1 mt-2" onClick={refreshSession}>
          Refresh
        </Button>

        <div className="flex items-start">
          <img
            src={SUNNYSIDE.icons.expression_confused}
            className="w-12 pt-2 pr-2"
          />
          <span className="text-xs mt-2">
            Refresh your session to grab the latest changes from the Blockchain.
            This is useful if you deposited items to your farm.
          </span>
        </div>
      </CloseButtonPanel>
    );
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      {Content()}
    </Modal>
  );
};
