import { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { isString } from "react-bootstrap-typeahead/types/utils";
import { Form, Field } from "react-final-form";
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

  const onFormSubmit = (formValues: React.FormEvent<HTMLFormElement>) => {
    onSubmit(formValues as unknown as Omit<ICampaignEntry, "id">);
  };

  const validate = (formValues: ICampaignEntry) => {
    const errors = {} as ICampaignEntry;
    if (!Object.hasOwn(formValues, "campaignName") || formValues.campaignName.length < 2) {
      errors.campaignName = "Campaign Name is Mandatory";
    }
    if (!Object.hasOwn(formValues, "keywords") || formValues.keywords.length < 1) {
      errors.campaignName = "At Least 1 Keyword is Mandatory";
    }
    if (!Object.hasOwn(formValues, "bidAmount") || formValues.bidAmount < 10) {
      errors.campaignName = "Bid Amount of At Least 10 is Mandatory";
    }
    if (!Object.hasOwn(formValues, "campaignFund") || formValues.campaignFund < 100) {
      errors.campaignName = "Campaign Fund of At Least 100 is Mandatory";
    }
    if (!Object.hasOwn(formValues, "town") || !towns?.some(({ name }) => name === formValues.town)) {
      errors.campaignName = "Town from Available List is Mandatory";
    }
    if (!Object.hasOwn(formValues, "radius") || formValues.radius < 0) {
      errors.campaignName = "Radius is Mandatory";
    }
    return errors;
  };

  return (
    <Form
      onSubmit={onFormSubmit}
      validate={(formValues) => validate(formValues as unknown as ICampaignEntry)}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="campaign-form w-full flex flex-col justify-around shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-2"
        >
          <Field
            name="campaignName"
            className="text-3xl font-bold mb-4 !max-w-[100%] w-full"
            component="input"
            placeholder="Campaign Name"
            defaultValue={campaign?.campaignName}
          />
          <div className="flex flex-row justify-between">
            <p>Keywords</p>
            <Field
              name="keywords"
              component={({ input: { onFocus, ...rest }, meta, render }) => (
                <Typeahead
                  id="keywords"
                  className="!max-w-[50%]"
                  placeholder="Keywords"
                  multiple
                  allowNew
                  options={savedKeywords}
                  selected={rest.value || campaign?.keywords || []}
                  {...rest}
                />
              )}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Bid Amount</p>
            <Field
              name="bidAmount"
              component="input"
              placeholder="Bid Amount"
              type="number"
              min={10}
              defaultValue={campaign?.bidAmount}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Campaign Fund</p>
            <Field
              name="campaignFund"
              component="input"
              placeholder="Campaign Fund"
              type="number"
              min={100}
              defaultValue={campaign?.campaignFund}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Status</p>
            <Field
              name="status"
              defaultValue={campaign?.status || false}
              type="checkbox"
              component={({ input }) => {
                return (
                  <Switch
                    value={input.checked || false}
                    onClick={input.onChange}
                  />
                );
              }}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Town</p>
            <Field
              name="town"
              component="select"
              defaultValue={campaign?.town}
            >
              {towns?.map((town) => (
                <option key={town.id}>{town.name}</option>
              ))}
            </Field>
          </div>
          <div className="flex flex-row justify-between">
            <p>Radius</p>
            <Field
              name="radius"
              component="input"
              type="number"
              min={0}
              placeholder="Radius"
              defaultValue={campaign?.radius}
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
      )}
    />
  );
};
