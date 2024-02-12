# Agap2 Front-end Challenge

## Requirements
- Node.js

## Live demo
This project is running live on https://agap2.vercel.app/ .

## This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Development notes

### Domain-Driven Design
This project follows the principles of Domain-Driven Design. Hence, the `application` layer depends on the `domain` layer, and the `infrastructure` layer depends on both. There are tests on each level.

However, given the opinionated handling of `create-react-app`, it's not possible to keep the `src` folder as the `infrastructure` layer and have `domain` and `application` sit as siblings to it. It should be possible though to eject the project and implement those changes if necessary.

### Test-Driven Development (TDD)
This project is thoroughly tested, as a result of the adoption of the TDD strategy. One can see the coverage by running the following command
```
    npm run test -- --coverage .
```
From that, the only business logic part warranting further testing should be `store`.

### Using Redux for state management
Such a simple project could stand well without an external management system. But since the use of Redux is a requirement, RTK Query was the chosen implementation, as advised by the Redux team at the moment of writing.

It's worth mentioning that the handling of pertaining error scenarios are not mentioned in the requirements and therefore have not been implemented/tested for the sake of a proper time management. Should this project move forward, this point should be addressed.

### Conventional commits
Commit messages follow a relaxed take on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). Scopes were only adopted at a late stage and programmatical enforcement is yet to be implemented, should this project proceed. Additionally, DDD-bound scopes could be adopted, as in:

- `application`, for anything sitting in the folder with the same name.
- `domain`, for anything sitting in the folder with the same name.
- As for the infrastructure layer, the scopes should represent concerns in the React implementation (e.g. `components`, `hooks`, etc.)

### Pointing device interactions
This project was designed with the use of pointing devices in mind and further work is needed to fit the usability in contexts where such a device is not present. For example, the episode name slides up when an episode on the list is hovered.

### Module paths
This project makes use of relative paths to import modules, which is not very convenient. However, changing them to aliased paths would not pay off as this project is not meant to be developed further.


