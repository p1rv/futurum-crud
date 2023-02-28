import { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { isString } from "react-bootstrap-typeahead/types/utils";
import {
  useAddKeywordMutation,
  useDeleteCampaignMutation,
  useFetchKeywordsQuery,
  useFetchTownsQuery,
  useUpdateCampaignMutation,
} from "../store";
import { ICampaignDetailsProps } from "./CampaignItem";
import { Switch } from "./Switch";

export const CampaignForm: React.FC<ICampaignDetailsProps> = ({ campaign, toggleEditMode }) => {
  const [campaignName, setCampaignName] = useState(campaign.campaignName);
  const [keywords, setKeywords] = useState(campaign.keywords);
  const [bidAmount, setBidAmount] = useState(campaign.bidAmount);
  const [campaignFund, setCampaignFund] = useState(campaign.campaignFund);
  const [status, setStatus] = useState(campaign.status);
  const [town, setTown] = useState(campaign.town);
  const [radius, setRadius] = useState(campaign.radius);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [updateCampaign] = useUpdateCampaignMutation();
  const [deleteCampaign] = useDeleteCampaignMutation();
  const [addKeyword] = useAddKeywordMutation();
  const { data: towns } = useFetchTownsQuery(null);
  const { data: keywordsData = [] } = useFetchKeywordsQuery(null);
  const savedKeywords = keywordsData.map(({ name }) => name);

  const onSubmit = () => {
    updateCampaign({ ...campaign, keywords, bidAmount, campaignFund, status, town, radius });
    keywords.filter((keyword) => !savedKeywords.includes(keyword)).forEach((keyword) => addKeyword(keyword));
    toggleEditMode();
  };

  const onDelete = () => {
    deleteCampaign(campaign.id);
    toggleEditMode();
  };

  const onWindowClick = (e: MouseEvent) => {
    !wrapperRef.current?.contains(e.target as HTMLElement) && toggleEditMode();
  };

  useEffect(() => {
    window.addEventListener("click", onWindowClick, { capture: true });
    return () => {
      window.removeEventListener("click", onWindowClick, { capture: true });
    };
  }, []);

  return (
    <div
      className="campaign-form w-full flex flex-col justify-around shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-2"
      ref={wrapperRef}
    >
      <input
        className="text-3xl font-bold mb-4"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
      />
      <div className="flex flex-row justify-between">
        <p>Keywords</p>
        <Typeahead
          id="keywords"
          multiple
          allowNew
          onChange={(selected) => {
            setKeywords(selected.map((keyword) => (isString(keyword) ? keyword : keyword.label)) as string[]);
          }}
          options={savedKeywords}
          selected={keywords}
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
        {towns ? (
          <select
            value={town}
            onChange={(e) => setTown(e.target.value)}
          >
            {towns.map((town) => (
              <option key={town.id}>{town.name}</option>
            ))}
          </select>
        ) : (
          <input
            value={town}
            disabled
          />
        )}
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
