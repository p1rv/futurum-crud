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
import { ICampaignEntry } from "../types";
import { CampaignForm } from "./CampaignForm";
import { Switch } from "./Switch";

interface ICampaignAddProps {
  closeForm: () => void;
}

export const CampaignAdd: React.FC<ICampaignAddProps> = ({ closeForm }) => {
  const [addCampaign] = useAddCampaignMutation();
  const [addKeyword] = useAddKeywordMutation();
  const { data: keywordsData = [] } = useFetchKeywordsQuery(null);
  const savedKeywords = keywordsData.map(({ name }) => name);

  const onSubmit = (newCampaign: Omit<ICampaignEntry, "id">) => {
    addCampaign(newCampaign);
    newCampaign.keywords.filter((keyword) => !savedKeywords.includes(keyword)).forEach((keyword) => addKeyword(keyword));
    closeForm();
  };

  const onDiscard = () => {
    closeForm();
  };

  return (
    <div className="campaign-form w-full flex flex-col justify-around shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-2">
      <CampaignForm
        onSubmit={onSubmit}
        onSubmitText="Add Campaign"
        onDiscard={onDiscard}
        onDiscardText="Discard Changes"
      />
    </div>
  );
};
