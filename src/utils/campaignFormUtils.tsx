import classNames from "classnames";
import { Typeahead } from "react-bootstrap-typeahead";
import { isString } from "react-bootstrap-typeahead/types/utils";
import { FieldMetaState, FieldRenderProps } from "react-final-form";

const inputClassName = ({ error, touched }: FieldMetaState<string>) => classNames({ "input-error": error && touched });

export const parseKeywords = (kws: any[]) =>
  kws
    .map((keyword) => (isString(keyword) ? keyword : keyword.label))
    .filter((keyword, index, arr) => arr.indexOf(keyword) === index) as string[];

export const renderErrMessage = ({ error, touched }: FieldMetaState<string>) => {
  if (error && touched) {
    return <p className="absolute left-2 text-sm text-rose-600 min-w-max">{error}</p>;
  }
};

export const renderInput = ({ input, meta, ...rest }: FieldRenderProps<any, HTMLInputElement, any>) => (
  <div className="relative input-group flex-1">
    <input
      {...input}
      {...rest}
      className={inputClassName(meta)}
    />
    {renderErrMessage(meta)}
  </div>
);

export const renderSelect = ({ input, meta, options, ...rest }: FieldRenderProps<any, HTMLSelectElement, any>) => (
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

export const renderTypeAhead = ({
  input: { onFocus, ...rest },
  meta,
  savedKeywords,
  defaultKeywords,
}: FieldRenderProps<any, HTMLInputElement, any[]>) => (
  <div className="relative input-group flex-1">
    <Typeahead
      id="keywords"
      placeholder="Keywords"
      className={inputClassName(meta)}
      multiple
      allowNew
      options={savedKeywords}
      selected={rest.value ? parseKeywords(rest.value) : defaultKeywords || []}
      {...rest}
    />
    {renderErrMessage(meta)}
  </div>
);
