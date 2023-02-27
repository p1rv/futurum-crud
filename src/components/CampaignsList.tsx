import { CampaignDetails } from "./CampaignDetails";
import { useFetchCampaignsQuery } from "../store";

export const CampaignsList: React.FC = () => {
  const { data, error, isFetching } = useFetchCampaignsQuery(null);

  return (
    <div>
      {data &&
        data.map((campaign) => (
          <CampaignDetails
            key={campaign.id}
            campaign={campaign}
          />
        ))}
    </div>
  );
};
