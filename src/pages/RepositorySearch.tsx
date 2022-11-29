import logoDark from "../images/logo-dark.svg";
import logoLight from "../images/logo-light.svg";

type RepositorySearchProps = {
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  URL: string;
  isLoading: boolean;
  error: unknown;
};

const RepositorySearch = ({
  handleSubmit,
  handleChange,
  isLoading,
  error,
  URL,
}: RepositorySearchProps) => {
  return (
    <div className="absolute w-full top-1/3 px-4 lg:px-[150px] flex flex-col lg:flex-row justify-start items-start lg:justify-between dark:text-red-100">
      <div className="mb-6">
        <img
          className="hidden dark:block"
          alt="outline of square next codesandbox text"
          src={logoDark}
        ></img>
        <img
          className="dark:hidden"
          alt="outline of square next codesandbox text"
          src={logoLight}
        ></img>
      </div>
      <div className="w-full lg:w-2/3 text-left">
        <h1 className="w-full max-w-[480px] size-01 mb-12 text-light-shade-100 dark:text-dark-shade-100">
          Start by pasting the repository URL.
        </h1>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            aria-label="repository input box"
            placeholder="https://"
            className="grow bg-transparent border-b-[1px] size-03 border-light-shade-100 dark:border-dark-shade-100 dark:text-dark-shade-100 dark:placeholder-dark-shade-300"
            value={URL}
            onChange={handleChange}
          ></input>
          <button
            className="m-2 px-4 py-2 rounded bg-light-shade-400 dark:bg-dark-shade-400"
            type="submit"
            onClick={handleSubmit}
          >
            {isLoading ? "Loading" : "Submit"}
          </button>
        </form>
        <>
          {error && (
            <p className="size-03 text-light-red dark:text-dark-red mt-4">
              {"Oops! Something went wrong. Try again."}
            </p>
          )}
        </>
      </div>
    </div>
  );
};

export default RepositorySearch;
