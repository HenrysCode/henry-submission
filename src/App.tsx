import React, { useState } from "react";
import { Branch, Repository } from "./shared/types";
import Board from "./pages/Board";
import RepositorySearch from "./pages/RepositorySearch";
import useFetchData from "./shared/hooks/useFetchData";

const GITHUB_API_URL = "https://api.github.com/repos";

/**
 * Helper function to get the repo and branches api urls given
 * a link to a repo on github website. There is potential to improve
 * this by using a regex to match anything after github.com but nothing
 * after the repo name e.g:
 * https://github.com/codesandbox/sandpack/issues
 * would ideally still give you back useful urls
 * @param url - URL user has pasted in input box from which we work out api urls
 * @returns github api urls for the repo and the branches
 */
const getRepoAndBranchesURL = (url: string) => {
  const repoName = url.split("github.com")[1];
  const repoURL = `${GITHUB_API_URL}${repoName}`;
  const branchesURL = `${repoURL}/branches`;
  return [repoURL, branchesURL];
};

function App() {
  const [URL, setURL] = useState("");
  const {
    isLoading: isLoadingRepo,
    data: repoData,
    error: repoError,
    fetchData: fetchRepo,
    clearData: clearRepoData,
    clearError: clearRepoError,
  } = useFetchData<Repository>();
  const {
    isLoading: isLoadingBranches,
    data: branchesData,
    error: branchesError,
    fetchData: fetchBranches,
    clearData: clearBranchesData,
    clearError: clearBranchesError,
  } = useFetchData<Branch[]>();

  /**
   * Update the url value and clear any errors when a user
   * types in the input box.
   * @param event - on change event when a user types
   */
  function updateRepoURL(event: React.ChangeEvent<HTMLInputElement>) {
    clearBranchesError();
    clearRepoError();
    setURL(event.target.value);
  }

  /**
   * Fetch the repository and branches when a user hits submit
   * @param event - onSubmit event when user submits a repo
   */
  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const [repoURL, branchesURL] = getRepoAndBranchesURL(URL);
    fetchRepo(repoURL);
    fetchBranches(branchesURL);
  }

  /**
   * When a user clicks back on the Board page this clears the
   * data fetched from the api. This changes the condition
   * of which component to show, so the RepoSearch appears again.
   * In a more complete app we would want to use some url state
   * and routing as well.
   */
  function clearData() {
    clearRepoData();
    clearBranchesData();
  }

  const isLoading = isLoadingBranches && isLoadingRepo;
  const error = repoError || branchesError;
  return (
    <div className="App bg-light-shade-500 dark:bg-dark-shade-500 w-full min-h-screen text-light-shade-200 dark:text-dark-shade-200 ">
      {repoData && branchesData ? (
        <Board
          repository={repoData}
          branches={branchesData}
          clearData={clearData}
        />
      ) : (
        <RepositorySearch
          handleChange={updateRepoURL}
          handleSubmit={handleSubmit}
          URL={URL}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}

export default App;
