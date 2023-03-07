import classNames from "classnames";

interface ISkeletonProps {
  rowOnly?: boolean;
  rowsNumber?: number;
  className?: string;
  pills?: boolean;
  campaign?: boolean;
}

export const Skeleton: React.FC<ISkeletonProps> = ({ rowOnly, rowsNumber, className, pills, campaign }) => {
  const classes = classNames(className, "animate-pulse", "bg-gray-200/90", "flex", "flex-wrap", "rounded-xl", {
    "p-1": !rowOnly,
    "w-full shadow-[0_0_30px_#00000020] rounded-2xl px-10 py-6 my-8 text-xl": campaign,
  });
  const innerClasses = classNames("dark:bg-gray-300", "bg-gray-200", "rounded-full", {
    "w-20 h-9": pills,
    "w-full": !pills,
    "m-1 h-6": !rowOnly,
    "h-full": rowOnly,
  });

  if (rowOnly) {
    return (
      <div className={classes}>
        <div className={innerClasses} />
      </div>
    );
  }

  return (
    <div className={classes}>
      {[...Array(rowsNumber)].map((_, i) => (
        <div
          key={`loadingRow-${i}`}
          className={innerClasses}
        />
      ))}
    </div>
  );
};
