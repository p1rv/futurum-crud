import { Form, Field } from "react-final-form";
import { useAddKeywordMutation, useFetchKeywordsQuery, useFetchTownsQuery } from "../store";
import { ICampaignEntry } from "../types";
import { parseKeywords, renderInput, renderSelect, renderTypeAhead } from "../utils/campaignFormUtils";
import { Skeleton } from "./Skeleton";
import { Switch } from "./Switch";
import "./campaign-form.css";

interface ICampaignFormProps {
  campaign?: ICampaignEntry;
  onSubmit: (campaign: Omit<ICampaignEntry, "id">) => any;
  onDiscard: () => any;
  onSubmitText: string;
  onDiscardText: string;
}

export const CampaignForm: React.FC<ICampaignFormProps> = ({ campaign, onSubmit, onDiscard, onSubmitText, onDiscardText }) => {
  const [addKeyword] = useAddKeywordMutation();

  const { data: towns = [], isFetching: isFetchingTowns, error: townsError } = useFetchTownsQuery();
  const { data: keywordsData = [], isFetching: isFetchingKeywords, error: keywordsError } = useFetchKeywordsQuery();

  const savedKeywords = keywordsData.map(({ name }) => name);

  const onFormSubmit = ({ keywords, ...rest }: Omit<ICampaignEntry, "id">) => {
    const parsedKeywords = parseKeywords(keywords);
    onSubmit({ keywords: parsedKeywords, ...rest } as unknown as Omit<ICampaignEntry, "id">);
    parsedKeywords.filter((keyword) => !savedKeywords.includes(keyword)).forEach((keyword) => addKeyword(keyword));
  };

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
    if (
      Object.hasOwn(formValues, "bidAmount") &&
      Object.hasOwn(formValues, "campaignFund") &&
      parseFloat(formValues.bidAmount as unknown as string) > parseFloat(formValues.campaignFund as unknown as string)
    ) {
      errors.campaignFund = "Campaign Fund Cannot Be Lower Than Bid Amount";
      errors.bidAmount = "Bid Amount Cannot Be Higher Than Campaign Fund";
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
      onSubmit={(formValues) => onFormSubmit(formValues as unknown as Omit<ICampaignEntry, "id">)}
      validate={(formValues) => validate(formValues as unknown as ICampaignEntry)}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="campaign-form w-full flex flex-col justify-around shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl [&>div]:my-3 [&>div>label]:flex-1"
        >
          <Field
            name="campaignName"
            className="text-3xl font-bold"
            placeholder="Campaign Name"
            type="text"
            component={renderInput}
          />
          <div className="flex flex-row justify-between !mt-4">
            <label>Keywords</label>
            {keywordsError ? (
              <label>An error occured while trying to access keywords.</label>
            ) : isFetchingKeywords ? (
              <Skeleton
                rowsNumber={campaign?.keywords.length || 3}
                className="input-group flex-1"
                pills
              />
            ) : (
              <Field
                name="keywords"
                savedKeywords={savedKeywords}
                defaultKeywords={campaign?.keywords}
                component={renderTypeAhead}
              />
            )}
          </div>
          <div className="flex flex-row justify-between">
            <label>Bid Amount</label>
            <Field
              name="bidAmount"
              placeholder="Bid Amount"
              type="number"
              min={10}
              component={renderInput}
            />
          </div>
          <div className="flex flex-row justify-between">
            <label>Campaign Fund</label>
            <Field
              name="campaignFund"
              placeholder="Campaign Fund"
              type="number"
              min={100}
              component={renderInput}
            />
          </div>
          <div className="flex flex-row justify-between">
            <label>Status</label>
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
            <label>Town</label>
            {townsError ? (
              <label>An error occured while trying to access towns list.</label>
            ) : isFetchingTowns ? (
              <Skeleton
                rowOnly
                className="input-group flex-1"
              />
            ) : (
              <Field
                name="town"
                options={towns?.map((town) => (
                  <option key={town.id}>{town.name}</option>
                ))}
                component={renderSelect}
              />
            )}
          </div>
          <div className="flex flex-row justify-between">
            <label>Radius</label>
            <Field
              name="radius"
              type="number"
              min={0}
              placeholder="Radius"
              component={renderInput}
            />
          </div>
          <div className="flex justify-between flex-col sm:flex-row">
            <button
              className="bg-blue-500 mb-4 sm:mb-0 sm:mx-4 rounded-lg px-8 py-4 flex-1"
              type="submit"
            >
              {onSubmitText}
            </button>
            <button
              className="bg-red-500 sm:mx-4 rounded-lg px-8 py-4 flex-1"
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
