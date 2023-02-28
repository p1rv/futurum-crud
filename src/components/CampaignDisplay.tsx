import { ICampaignDetailsProps } from "./CampaignItem";
import { Switch } from "./Switch";

export const CampaignDisplay: React.FC<ICampaignDetailsProps> = ({ campaign, toggleEditMode }) => {
  return (
    <div
      className="w-full shadow-[0_0_40px_#00000030] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-2"
      onClick={toggleEditMode}
    >
      <p className="text-3xl font-bold mb-4">{campaign.campaign_name}</p>
      <div className="flex flex-row justify-between">
        <p>Keywords</p>
        <p>{campaign.keywords.join(", ")}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>Bid Amount</p>
        <p>{campaign.bid_amount}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>Campaign Fund</p>
        <p>{campaign.campaign_fund}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>Status</p>
        <Switch
          disabled
          value={campaign.status}
          onClick={() => {}}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p>Town</p>
        <p>{campaign.town}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>Radius</p>
        <p>{campaign.radius} km</p>
      </div>
    </div>
  );
};
