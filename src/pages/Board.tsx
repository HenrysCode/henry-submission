import { useState } from "react";
import { Repository, Branch } from "../shared/types";
import { ReactComponent as BackArrow } from "../icons/back-arrow.svg";
import Column from "../components/Column";

type BoardProps = {
  repository: Repository;
  branches: Branch[];
  clearData: () => void;
};

const Board = ({ repository, branches, clearData }: BoardProps) => {
  const [inProgress, updateInProgress] = useState<Branch[]>(branches);
  const [review, updateReview] = useState<Branch[]>([]);
  const [readyToMerge, updateReadyToMerge] = useState<Branch[]>([]);

  // Four functions to manage state transitions.
  // There is potential to abstract common functionality
  // But since there are only four possible transitions
  // I have kept them explicit for now
  const progressToReview = (name: string) => {
    const BranchToProgress = inProgress.find(
      (Branch: Branch) => Branch.name === name
    );
    if (!BranchToProgress) {
      return;
    }
    updateInProgress(inProgress.filter((Branch) => Branch.name !== name));
    updateReview([...review, BranchToProgress]);
  };

  const progressToReadyToMerge = (name: string) => {
    const BranchToProgress = review.find(
      (Branch: Branch) => Branch.name === name
    );
    if (!BranchToProgress) {
      return;
    }
    updateReview(review.filter((Branch) => Branch.name !== name));
    updateReadyToMerge([...readyToMerge, BranchToProgress]);
  };

  const returnToReview = (name: string) => {
    const BranchToReturn = readyToMerge.find(
      (Branch: Branch) => Branch.name === name
    );
    if (!BranchToReturn) {
      return;
    }
    updateReadyToMerge(readyToMerge.filter((Branch) => Branch.name !== name));
    updateReview([...review, BranchToReturn]);
  };

  const returnToInProgress = (name: string) => {
    const BranchToReturn = review.find(
      (Branch: Branch) => Branch.name === name
    );
    if (!BranchToReturn) {
      return;
    }
    updateReview(review.filter((Branch) => Branch.name !== name));
    updateInProgress([...inProgress, BranchToReturn]);
  };

  return (
    <div className="flex px-4 py-12 flex-col justify-center w-full max-w-7xl mx-auto md:p-[100px]">
      <div className="flex mb-12 break-words">
        <div className="w-1/4 text-left md:w-1/3">
          <button className="flex items-center" onClick={clearData}>
            <BackArrow className="mr-2" />
            {"back"}
          </button>
        </div>
        <div className="w-1/2 text-left md:w-1/3">
          <h1 className="size-01 font-bold mb-4 text-light-shade-100 dark:text-dark-shade-100">
            {repository.name}
          </h1>
          <p className="text-sm">{repository.description}</p>
        </div>
        <div className="w-1/4 text-right md-w-1/3">{`${repository.stargazers_count} ☆`}</div>
      </div>
      <div className="flex flex-col items-center space-y-4 md:flex-row  md:items-start md:space-y-0 md:space-x-4">
        <Column
          name="In progress"
          branches={inProgress}
          progressBranch={progressToReview}
        />
        <Column
          name="Review"
          branches={review}
          progressBranch={progressToReadyToMerge}
          returnBranch={returnToInProgress}
        />
        <Column
          name="Ready to merge"
          branches={readyToMerge}
          returnBranch={returnToReview}
        />
      </div>
    </div>
  );
};

export default Board;
