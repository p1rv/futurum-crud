import { CampaignItem } from "./CampaignItem";
import { useFetchCampaignsQuery } from "../store";

export const CampaignsList: React.FC = () => {
  const { data, error, isFetching } = useFetchCampaignsQuery(null);

  return (
    <div>
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
