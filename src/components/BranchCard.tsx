import { Branch, MoveBranchFunction } from "../shared/types";

export type BranchCardProps = {
  id: string;
  branch: Branch;
  progressBranch?: MoveBranchFunction;
  returnBranch?: MoveBranchFunction;
};

const BranchCard = ({
  id,
  branch,
  progressBranch,
  returnBranch,
}: BranchCardProps) => {
  // These could be extracted into
  // a button component
  const handleClickProgress = () => {
    if (progressBranch) {
      progressBranch(branch.name);
    }
  };

  const handleClickReturn = () => {
    if (returnBranch) {
      returnBranch(branch.name);
    }
  };

  return (
    <div
      data-testid={`branch-card-${branch.name}`}
      className="w-full h-[70px] p-[24px] flex items-center justify-between bg-light-shade-400 dark:bg-dark-shade-400"
    >
      <button
        disabled={!returnBranch}
        onClick={handleClickReturn}
        aria-label="return branch"
        data-testid={`return-${branch.name}`}
        className="disabled:text-light-shade-300 dark:disabled:text-dark-shade-300 hover:text-light-shade-500 hover:dark:text-dark-shade-500"
      >
        {"<"}
      </button>
      <h3 className="truncate mx-1">{branch.name}</h3>
      <button
        disabled={!progressBranch}
        onClick={handleClickProgress}
        aria-label="progress branch"
        data-testid={`progress-${branch.name}`}
        className="disabled:text-light-shade-300 dark:disabled:text-dark-shade-300 hover:text-light-shade-500 hover:dark:text-dark-shade-500"
      >
        {">"}
      </button>
    </div>
  );
};

export default BranchCard;
