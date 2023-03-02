import { CampaignItem } from "./CampaignItem";
import { useFetchCampaignsQuery } from "../store";
import { CampaignForm } from "./CampaignForm";
import { CampaignAdd } from "./CampaignAdd";
import { useState } from "react";
import { Skeleton } from "./Skeleton";

export const CampaignsList: React.FC = () => {
  const { data, error, isFetching } = useFetchCampaignsQuery();
  const [showAddForm, setShowAddForm] = useState(false);

  const renderLoading = (
    <div className="p-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton
          key={`loading-${i}`}
          rowsNumber={7}
          className="w-full shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl"
        />
      ))}
    </div>
  );

  return (
    <div className="w-full flex flex-col justify-center">
      <button
        className="bg-blue-500 px-8 py-4 rounded-2xl my-6 text-xl"
        onClick={() => setShowAddForm(true)}
      >
        + Add Campaign
      </button>
      {showAddForm && <CampaignAdd closeForm={() => setShowAddForm(false)} />}
      {isFetching
        ? renderLoading
        : data?.map((campaign) => (
            <CampaignItem
              key={campaign.id}
              campaign={campaign}
            />
          ))}
    </div>
  );
};
