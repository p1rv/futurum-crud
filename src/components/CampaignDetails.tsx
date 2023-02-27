import { ICampaignEntry } from "../types";
import { Switch } from "./Switch";

interface ICampaignDetailsProps {
  campaign: ICampaignEntry;
}

export const CampaignDetails: React.FC<ICampaignDetailsProps> = ({ campaign }) => {
  return (
    <div className="w-full shadow-[0_0_40px_#00000030] rounded-2xl p-4 my-8">
      <p className="text-xl font-bold mb-4">{campaign.campaign_name}</p>
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
