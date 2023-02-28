import { useState } from "react";
import { ICampaignDetailsProps } from "./CampaignItem";
import { Switch } from "./Switch";

export const CampaignForm: React.FC<ICampaignDetailsProps> = ({ campaign, toggleEditMode }) => {
  const [keywords, setKeywords] = useState(campaign.keywords.join(", "));
  const [bidAmount, setBidAmount] = useState(campaign.bid_amount);
  const [fund, setFund] = useState(campaign.campaign_fund);
  const [status, setStatus] = useState(campaign.status);
  const [town, setTown] = useState(campaign.town);
  const [radius, setRadius] = useState(campaign.radius);

  const onSubmit = () => {
    toggleEditMode();
  };

  return (
    <div className="w-full shadow-[0_0_40px_#00000030] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-2">
      <p className="text-3xl font-bold mb-4">{campaign.campaign_name}</p>
      <div className="flex flex-row justify-between">
        <p>Keywords</p>
        <input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p>Bid Amount</p>
        <input
          type="number"
          min={10}
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.valueAsNumber)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p>Campaign Fund</p>
        <input
          type="number"
          min={10}
          value={fund}
          onChange={(e) => setFund(e.target.valueAsNumber)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p>Status</p>
        <Switch
          value={status}
          onClick={() => setStatus((currentStatus) => !currentStatus)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p>Town</p>
        <input
          value={town}
          onChange={(e) => setTown(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p>Radius</p>
        <input
          type="number"
          min={0}
          value={radius}
          onChange={(e) => setRadius(e.target.valueAsNumber)}
        />
      </div>
      <button
        className="bg-blue-500 rounded-md px-8 py-4 "
        onClick={onSubmit}
      >
        Apply changes
      </button>
    </div>
  );
};
