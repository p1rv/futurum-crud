import { ICampaignEntry } from "./types";

interface ICampaignDetailsProps {
  campaign: ICampaignEntry;
}

export const CampaignDetails: React.FC<ICampaignDetailsProps> = ({ campaign }) => {
  return <div className="w-full">{campaign.campaign_name}</div>;
};
