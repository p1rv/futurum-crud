import classNames from "classnames";

interface ISwitchProps {
  value: boolean;
  onClick: () => any;
}

export const Switch: React.FC<ISwitchProps> = ({ value, onClick }) => {
  const classes = classNames(
    "w-[35px]",
    "h-[20px]",
    "cursor-pointer",
    "rounded-full",
    "relative",
    "after:absolute",
    "after:w-[14px]",
    "after:h-[14px]",
    "after:top-[3px]",
    "after:rounded-full",
    "after:bg-white",
    { "after:left-[3px] bg-gray-400": !value, "after:right-[3px] bg-blue-500": value }
  );

  return (
    <div
      className={classes}
      onClick={onClick}
    />
  );
};
