import { lazy, Suspense, useState } from "react";
import { ICampaignEntry } from "../types";
import { CampaignDisplay } from "./CampaignDisplay";
import { Skeleton } from "./Skeleton";
const CampaignEdit = lazy(() => import("./CampaignEdit"));

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
    <Suspense
      fallback={
        <Skeleton
          rowsNumber={7}
          campaign
        />
      }
    >
      <CampaignEdit
        campaign={campaign}
        toggleEditMode={() => {
          setEditMode(false);
        }}
      />
    </Suspense>
  );
};
