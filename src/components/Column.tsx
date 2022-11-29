import { Branch, MoveBranchFunction } from "../shared/types";
import BranchCard from "./BranchCard";

type ColumnProps = {
  name: string;
  branches: Branch[];
  progressBranch?: MoveBranchFunction;
  returnBranch?: MoveBranchFunction;
};

const Column = ({
  branches,
  progressBranch,
  returnBranch,
  name,
}: ColumnProps) => {
  const cards = branches.map((branch: Branch, index: number) => (
    <BranchCard
      key={branch.name}
      id={`${name}-${index}`}
      branch={branch}
      progressBranch={progressBranch}
      returnBranch={returnBranch}
    />
  ));

  return (
    <div className="w-full max-w-sm flex flex-col items-start sm:w-1/2 md:w-1/3">
      <h2 className="mb-2">{`${name} (${cards.length})`}</h2>
      <div className="flex w-full flex-col space-y-2" data-testid={name}>
        {cards}
      </div>
    </div>
  );
};

export default Column;
