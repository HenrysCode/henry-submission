# Repository Kanban

## Installation instructions

Make sure you have the correct version of node: 18.12.1. Then run

`nvm use`

To use the correct version.

To install the required packages run

`npm install`

Then to start the application run

`npm run start`

To run tests you can use the command

`npm run test`

## Technologies and design decisions

I have tried to keep things as simple as possible for this task.

React, Typescript, Tailwind

Beyond the core requirement the main decision here is to use Tailwind.
I have more experience using styled components but have used Tailwind for
one or two projects recently and really love it. I find I am much faster
at developing when using it so speed was a primary reason for a project like
this.

Create React App

I chose this to scaffold the project as it is quick to get going. For larger
projects I would have chosen NextJS but I didn't really need many of the
benefits it offered here.

Data Fetching

I thought about using react query as this could have been a bit quicker
to get data from the github api. I decided against it in the end as
I like keeping the bundle size small and I didn't need the majority
of functionality it offered. It is also relatively simple to add
a custom hook to fetch data that fits my needs here. If the project
were to grow and require updates to a server then something like
react-query would be a good fit.

## Improvements

DnD

I decided to not add a drag and drop functionality as this would allow
me to spend more time on core functionality, mobile layouts and adding tests.
Adding DnD and some subtle transition animations could improve the polish of
the app.

More testing

I have added some tests around the core functionality of moving branches
between columns. I would have liked to add some more testing here for
completeness. Some tests around the first page would also be useful
to make sure that we are handling errors and successes properly. I also
made a function that gets the api url from a github link. This could
be tested and indeed it would be easy enough to create some tests where
it failed, and could then be improved.

Routing

The main issue I have with the current implementation is that it
doesn't save your state on reload if you are in the Kanban board view.
Given more time I would like to add some routing so that the url
changes when you go to the board page. That way you can keep state
between refreshes. I did think it would also be possible to save the
board state in the url so that you could share it with someone else.
