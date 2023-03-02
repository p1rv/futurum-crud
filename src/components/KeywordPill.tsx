import classNames from "classnames";
import { Option } from "react-bootstrap-typeahead/types/types";

interface ITypeaheadTokenArgs {
  keyword: Option;
  props: any;
}

export const KeywordPill: React.FC<ITypeaheadTokenArgs> = ({ keyword, props }) => {
  const classes = classNames(
    "rbt-token",
    "pl-3",
    "pr-2",
    "py-1",
    "rounded-full",
    "bg-blue-500",
    "max-w-max",
    "hover:bg-blue-400",
    "cursor-pointer",
    "m-1",
    "inline-flex",
    "flex-row",
    "items-center",
    "group"
  );

  const innerButtonClasses = classNames(
    "w-6",
    "h-6",
    "rounded-full",
    "bg-white/20",
    "group-hover:bg-white/50",
    "ml-1",
    "relative",
    "after:content-['×']",
    "after:absolute",
    "after:top-1/2",
    "after:left-1/2",
    "after:-translate-x-1/2",
    "after:-translate-y-1/2"
  );

  return (
    <div
      onClick={() => props.onRemove(keyword)}
      className={classes}
    >
      <p>{keyword as string}</p>
      <div className={innerButtonClasses} />
    </div>
  );
};
