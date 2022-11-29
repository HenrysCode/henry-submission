export type Branch = {
  name: string;
};

export type MoveBranchFunction = (name: string) => void;

export type Repository = {
  description: string;
  name: string;
  stargazers_count: number;
};
