import classNames from "classnames";

interface ISkeletonProps {
  rowOnly?: boolean;
  rowsNumber?: number;
  className?: string;
  pills?: boolean;
}

export const Skeleton: React.FC<ISkeletonProps> = ({ rowOnly, rowsNumber, className, pills }) => {
  const classes = classNames(className, "animate-pulse", "bg-gray-200/90", "flex", "flex-wrap", "rounded-xl", { "p-1": !rowOnly });
  const innerClasses = classNames("dark:bg-gray-300", "bg-gray-200", "rounded-full", {
    "w-16": pills,
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
