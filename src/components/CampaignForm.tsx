import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { isString } from "react-bootstrap-typeahead/types/utils";
import { Form, Field, FieldMetaState, FieldRenderProps } from "react-final-form";
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
  const { data: towns = [] } = useFetchTownsQuery(null);
  const { data: keywordsData = [] } = useFetchKeywordsQuery(null);

  const savedKeywords = keywordsData.map(({ name }) => name);

  const inputClassName = ({ error, touched }: FieldMetaState<string>) => classNames({ "input-error": error && touched });

  const onFormSubmit = (formValues: React.FormEvent<HTMLFormElement>) => {
    onSubmit(formValues as unknown as Omit<ICampaignEntry, "id">);
  };

  const renderErrMessage = ({ error, touched }: FieldMetaState<string>) => {
    if (error && touched) {
      return <p className="absolute left-2 text-sm text-rose-600 min-w-max">{error}</p>;
    }
  };

  const renderInput = ({ input, meta, ...rest }: FieldRenderProps<any, HTMLInputElement, any>) => (
    <div className="relative input-group flex-1">
      <input
        {...input}
        {...rest}
        className={inputClassName(meta)}
      />
      {renderErrMessage(meta)}
    </div>
  );

  const renderSelect = ({ input, meta, options, ...rest }: FieldRenderProps<any, HTMLSelectElement, any>) => (
    <div className="relative input-group flex-1">
      <select
        {...input}
        {...rest}
        className={inputClassName(meta)}
      >
        <option>Choose from the list</option>
        {options}
      </select>
      {renderErrMessage(meta)}
    </div>
  );

  const renderTypeAhead = ({ input: { onFocus, ...rest }, meta }: FieldRenderProps<any, HTMLInputElement, any>) => (
    <div className="relative input-group flex-1">
      <Typeahead
        id="keywords"
        placeholder="Keywords"
        className={inputClassName(meta)}
        multiple
        allowNew
        options={savedKeywords}
        selected={rest.value || campaign?.keywords || []}
        {...rest}
      />
      {renderErrMessage(meta)}
    </div>
  );

  const validate = (formValues: ICampaignEntry) => {
    const errors = {} as { [key in keyof ICampaignEntry]: string };
    if (!Object.hasOwn(formValues, "campaignName") || formValues.campaignName.length < 2) {
      errors.campaignName = "Campaign Name is Mandatory";
    }
    if (!Object.hasOwn(formValues, "keywords") || formValues.keywords.length < 1) {
      errors.keywords = "At Least 1 Keyword is Mandatory";
    }
    if (!Object.hasOwn(formValues, "bidAmount") || formValues.bidAmount < 10) {
      errors.bidAmount = "Bid Amount of At Least 10 is Mandatory";
    }
    if (!Object.hasOwn(formValues, "campaignFund") || formValues.campaignFund < 100) {
      errors.campaignFund = "Campaign Fund of At Least 100 is Mandatory";
    }
    if (!Object.hasOwn(formValues, "town") || !towns?.some(({ name }) => name === formValues.town)) {
      errors.town = "Choose Town from Available List";
    }
    if (!Object.hasOwn(formValues, "radius") || formValues.radius < 0) {
      errors.radius = "Radius is Mandatory";
    }
    return errors;
  };

  return (
    <Form
      initialValues={campaign}
      onSubmit={onFormSubmit}
      validate={(formValues) => validate(formValues as unknown as ICampaignEntry)}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="campaign-form w-full flex flex-col justify-around shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-3 [&>div>p]:flex-1"
        >
          <Field
            name="campaignName"
            className="text-3xl font-bold"
            placeholder="Campaign Name"
            type="text"
            component={renderInput}
          />
          <div className="flex flex-row justify-between !mt-4">
            <p>Keywords</p>
            <Field
              name="keywords"
              component={renderTypeAhead}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Bid Amount</p>
            <Field
              name="bidAmount"
              placeholder="Bid Amount"
              type="number"
              min={10}
              component={renderInput}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Campaign Fund</p>
            <Field
              name="campaignFund"
              placeholder="Campaign Fund"
              type="number"
              min={100}
              component={renderInput}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Status</p>
            <Field
              name="status"
              type="checkbox"
              component={({ input }) => (
                <Switch
                  value={input.checked || false}
                  onClick={input.onChange}
                />
              )}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Town</p>
            <Field
              name="town"
              options={towns?.map((town) => (
                <option key={town.id}>{town.name}</option>
              ))}
              component={renderSelect}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Radius</p>
            <Field
              name="radius"
              type="number"
              min={0}
              placeholder="Radius"
              component={renderInput}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 rounded-r-none rounded-lg px-8 py-4 flex-1"
              type="submit"
            >
              {onSubmitText}
            </button>
            <button
              className="bg-red-500 rounded-l-none rounded-lg px-8 py-4 flex-1"
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
