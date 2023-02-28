import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { isString } from "react-bootstrap-typeahead/types/utils";
import {
  useAddCampaignMutation,
  useAddKeywordMutation,
  useDeleteCampaignMutation,
  useFetchKeywordsQuery,
  useFetchTownsQuery,
} from "../store";
import { Switch } from "./Switch";

interface ICampaignAddProps {
  closeForm: () => void;
}

export const CampaignAdd: React.FC<ICampaignAddProps> = ({ closeForm }) => {
  const [campaignName, setCampaignName] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [bidAmount, setBidAmount] = useState(10);
  const [campaignFund, setCampaignFund] = useState(100);
  const [status, setStatus] = useState(false);
  const [town, setTown] = useState("");
  const [radius, setRadius] = useState(0);

  const [addCampaign] = useAddCampaignMutation();
  const [deleteCampaign] = useDeleteCampaignMutation();
  const [addKeyword] = useAddKeywordMutation();
  const { data: towns } = useFetchTownsQuery(null);
  const { data: keywordsData = [] } = useFetchKeywordsQuery(null);
  const savedKeywords = keywordsData.map(({ name }) => name);

  const onSubmit = () => {
    addCampaign({ campaignName, keywords, bidAmount, campaignFund, status, town, radius });
    keywords.filter((keyword) => !savedKeywords.includes(keyword)).forEach((keyword) => addKeyword(keyword));
    closeForm();
  };

  const onDiscard = () => {
    closeForm();
  };

  return (
    <div className="campaign-form w-full flex flex-col justify-around shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-2">
      <input
        className="text-3xl font-bold mb-4"
        value={campaignName}
        placeholder="Campaign Name"
        onChange={(e) => setCampaignName(e.target.value)}
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
          Add campaign
        </button>
        <button
          className="bg-red-500 rounded-md px-8 py-4 "
          onClick={onDiscard}
        >
          Discard
        </button>
      </div>
    </div>
  );
};
