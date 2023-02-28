import { CampaignItem } from "./CampaignItem";
import { useFetchCampaignsQuery } from "../store";
import { CampaignForm } from "./CampaignForm";
import { CampaignAdd } from "./CampaignAdd";
import { useState } from "react";

export const CampaignsList: React.FC = () => {
  const { data, error, isFetching } = useFetchCampaignsQuery(null);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center">
      <button
        className="bg-blue-500 px-8 py-4 rounded-2xl my-6 text-xl"
        onClick={() => setShowAddForm(true)}
      >
        + Add Campaign
      </button>
      {showAddForm && <CampaignAdd closeForm={() => setShowAddForm(false)} />}
      {data &&
        data.map((campaign) => (
          <CampaignItem
            key={campaign.id}
            campaign={campaign}
          />
        ))}
    </div>
  );
};
