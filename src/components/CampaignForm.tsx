import { useState } from "react";
import { useDeleteCampaignMutation, useUpdateCampaignMutation } from "../store";
import { ICampaignDetailsProps } from "./CampaignItem";
import { Switch } from "./Switch";

export const CampaignForm: React.FC<ICampaignDetailsProps> = ({ campaign, toggleEditMode }) => {
  const [campaignName, setCampaignName] = useState(campaign.campaignName);
  const [keywords, setKeywords] = useState(campaign.keywords.join(", "));
  const [bidAmount, setBidAmount] = useState(campaign.bidAmount);
  const [campaignFund, setCampaignFund] = useState(campaign.campaignFund);
  const [status, setStatus] = useState(campaign.status);
  const [town, setTown] = useState(campaign.town);
  const [radius, setRadius] = useState(campaign.radius);

  const [updateCampaign] = useUpdateCampaignMutation();
  const [deleteCampaign] = useDeleteCampaignMutation();

  const onSubmit = () => {
    updateCampaign({ ...campaign, keywords: keywords.split(", "), bidAmount, campaignFund, status, town, radius });
    toggleEditMode();
  };

  const onDelete = () => {
    deleteCampaign(campaign.id);
    toggleEditMode();
  };

  return (
    <div className="campaign-form w-full flex flex-col justify-around shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-2">
      <input
        className="text-3xl font-bold mb-4"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
      />
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
          value={campaignFund}
          onChange={(e) => setCampaignFund(e.target.valueAsNumber)}
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
      <div className="flex justify-between">
        <button
          className="bg-blue-500 rounded-md px-8 py-4 "
          onClick={onSubmit}
        >
          Apply changes
        </button>
        <button
          className="bg-red-500 rounded-md px-8 py-4 "
          onClick={onDelete}
        >
          Delete campaign
        </button>
      </div>
    </div>
  );
};
