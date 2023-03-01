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
import { ICampaignEntry } from "../types";
import { Switch } from "./Switch";

interface ICampaignFormProps {
  campaign?: ICampaignEntry;
  onSubmit: (campaign: Omit<ICampaignEntry, "id">) => any;
  onDiscard: () => any;
  onSubmitText: string;
  onDiscardText: string;
}

export const CampaignForm: React.FC<ICampaignFormProps> = ({ campaign, onSubmit, onDiscard, onSubmitText, onDiscardText }) => {
  const { data: towns } = useFetchTownsQuery(null);
  const { data: keywordsData = [] } = useFetchKeywordsQuery(null);
  const savedKeywords = keywordsData.map(({ name }) => name);

  const [campaignName, setCampaignName] = useState(campaign?.campaignName || "");
  const [keywords, setKeywords] = useState<string[]>(campaign?.keywords || []);
  const [bidAmount, setBidAmount] = useState(campaign?.bidAmount || 10);
  const [campaignFund, setCampaignFund] = useState(campaign?.campaignFund || 100);
  const [status, setStatus] = useState(campaign?.status || false);
  const [town, setTown] = useState(campaign?.town || "");
  const [radius, setRadius] = useState(campaign?.radius || 0);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ campaignName, keywords, bidAmount, campaignFund, status, town, radius });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        className="text-3xl font-bold mb-4"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
        required
      />
      <div className="flex flex-row justify-between">
        <p>Keywords</p>
        <Typeahead
          id="keywords"
          className="!max-w-[50%]"
          multiple
          allowNew
          onChange={(selected) => {
            setKeywords(
              selected
                .map((keyword) => (isString(keyword) ? keyword : keyword.label))
                .filter((keyword, index, arr) => arr.indexOf(keyword) === index) as string[]
            );
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
          required
          onChange={(e) => setBidAmount(e.target.valueAsNumber)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p>Campaign Fund</p>
        <input
          type="number"
          min={10}
          required
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
            required
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
          required
          value={radius}
          onChange={(e) => setRadius(e.target.valueAsNumber)}
        />
      </div>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 rounded-md px-8 py-4 "
          type="submit"
        >
          {onSubmitText}
        </button>
        <button
          className="bg-red-500 rounded-md px-8 py-4 "
          onClick={onDiscard}
        >
          {onDiscardText}
        </button>
      </div>
    </form>
  );
};
