# Todo App

This project is a responsive and feature-rich Todo App built with React and React Router. It supports adding, editing, deleting, and toggling the completion status of todos. Additionally, the app includes a responsive UI and a modal for enhanced user experience.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- **Responsive Design**: Optimized for mobile and desktop using Tailwind CSS.
- **Todo List Management**:
  - Add new todos.
  - Edit existing todos.
  - Delete todos.
  - Toggle completion status.
- **Pagination**: Divide todos into pages for easier navigation.
- **Todo Modal**: Add or edit todos with a user-friendly modal.
- **Routing**: Seamless navigation using React Router.
- **Reusable Components**:
  - `TodoItem` for individual todos.
  - `Pagination` for page controls.
  - `TodoModal` for adding/editing todos.
  - `SearchBar` to filter todos by title in real-time..

## Pages

1. **TodoList Page**:
   - Displays a paginated list of todos.
   - Options to add, edit, delete, or view details of todos.
2. **Todo Details Page**:
   - View detailed information about a specific todo.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

## Folder Structure

- `src/components`: Contains reusable components such as `TodoItem`, `Pagination`, and `TodoModal`.
- `src/pages`: Includes the main pages like `HomePage` and `TodoDetailsPage`.
- `src/styles`: Contains Tailwind CSS configurations and custom styles.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Future Enhancements

- Add user authentication.
- Integrate a backend API for persisting todos.
- Add search and filtering functionality.
- Improve accessibility compliance (ARIA attributes, keyboard navigation).

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/todo-app.git

   ```

2. cd todo-app
3. npm install
4. npm start
