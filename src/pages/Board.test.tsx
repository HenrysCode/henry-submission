import { fireEvent, render, screen, within } from "@testing-library/react";
import { Branch, Repository } from "../shared/types";

import Board from "./Board";

const repository: Repository = {
  name: "test",
  stargazers_count: 100,
  description: "test repo",
};
const branches: Branch[] = [{ name: "main" }];
const mockClearData = jest.fn();

it("should move a branch from in progress to review", () => {
  render(
    <Board
      repository={repository}
      branches={branches}
      clearData={mockClearData}
    />
  );
  const progressBranchButton = screen.getByTestId("progress-main");
  fireEvent(progressBranchButton, new MouseEvent("click", { bubbles: true }));
  const inProgress = screen.getByTestId("In progress");
  const review = screen.getByTestId("Review");

  const branchesInProgress =
    within(inProgress).queryAllByTestId(/branch-card/i);
  expect(branchesInProgress).toHaveLength(0);
  const branchesInReview = within(review).queryAllByTestId(/branch-card/i);
  expect(branchesInReview).toHaveLength(1);
});
it("should move a branch from In progress to Review to Ready to merge", () => {
  render(
    <Board
      repository={repository}
      branches={branches}
      clearData={mockClearData}
    />
  );
  let progressBranchButton = screen.getByTestId("progress-main");
  fireEvent(progressBranchButton, new MouseEvent("click", { bubbles: true }));
  progressBranchButton = screen.getByTestId("progress-main");
  fireEvent(progressBranchButton, new MouseEvent("click", { bubbles: true }));

  const inProgress = screen.getByTestId("In progress");
  const review = screen.getByTestId("Review");
  const readyToMerge = screen.getByTestId("Ready to merge");

  const branchesInProgress =
    within(inProgress).queryAllByTestId(/branch-card/i);
  expect(branchesInProgress).toHaveLength(0);
  const branchesInReview = within(review).queryAllByTestId(/branch-card/i);
  expect(branchesInReview).toHaveLength(0);
  const branchesInReadyToMerge =
    within(readyToMerge).queryAllByTestId(/branch-card/i);
  expect(branchesInReadyToMerge).toHaveLength(1);
});
it("should return a branch from Review to In progress", () => {
  render(
    <Board
      repository={repository}
      branches={branches}
      clearData={mockClearData}
    />
  );
  const progressBranchButton = screen.getByTestId("progress-main");
  fireEvent(progressBranchButton, new MouseEvent("click", { bubbles: true }));
  const returnBranchButton = screen.getByTestId("return-main");
  fireEvent(returnBranchButton, new MouseEvent("click", { bubbles: true }));

  const inProgress = screen.getByTestId("In progress");
  const review = screen.getByTestId("Review");

  const branchesInProgress =
    within(inProgress).queryAllByTestId(/branch-card/i);
  expect(branchesInProgress).toHaveLength(1);
  const branchesInReview = within(review).queryAllByTestId(/branch-card/i);
  expect(branchesInReview).toHaveLength(0);
});
