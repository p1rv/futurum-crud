import { useState } from "react";
import { ICampaignEntry } from "../types";
import { CampaignDisplay } from "./CampaignDisplay";
import { CampaignEdit } from "./CampaignEdit";

interface ICampaignItemProps {
  campaign: ICampaignEntry;
}

export interface ICampaignDetailsProps extends ICampaignItemProps {
  toggleEditMode: () => void;
}

export const CampaignItem: React.FC<ICampaignItemProps> = ({ campaign }) => {
  const [editMode, setEditMode] = useState(false);

  if (!editMode) {
    return (
      <CampaignDisplay
        campaign={campaign}
        toggleEditMode={() => {
          setEditMode(true);
        }}
      />
    );
  }
  return (
    <CampaignEdit
      campaign={campaign}
      toggleEditMode={() => {
        setEditMode(false);
      }}
    />
  );
};
