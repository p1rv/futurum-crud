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
    <div>
      <CampaignForm
        onSubmit={onSubmit}
        onSubmitText="Add Campaign"
        onDiscard={onDiscard}
        onDiscardText="Discard Changes"
      />
    </div>
  );
};
