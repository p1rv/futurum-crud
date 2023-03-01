import classNames from "classnames";

interface ISwitchProps {
  disabled?: boolean;
  value: boolean;
  onClick: (event: any) => any;
}

export const Switch: React.FC<ISwitchProps> = ({ disabled, value, onClick }) => {
  const classes = classNames(
    "appearance-none",
    "w-[45px]",
    "h-[25px]",
    "my-1",
    "!rounded-full",
    "relative",
    "after:!absolute",
    "after:w-[19px]",
    "after:h-[19px]",
    "after:top-[3px]",
    "after:rounded-full",
    "after:bg-white",
    { "after:left-[3px] bg-gray-400": !value, "after:right-[3px] bg-blue-500": value, "cursor-pointer": !disabled }
  );

  return (
    <input
      className={classes}
      type="checkbox"
      checked={value}
      onChange={onClick}
      disabled={disabled}
    />
  );
};
