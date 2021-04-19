# Table of contents component
We need better readme here.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm lint` and `npm lint-fix`

Launches linter or linter with fix.

### `npm run compile`

Compiles lib to be used within other projects.

## TODO

- Use forward ref and useImperativeHandle to expose api.  
- Implement node selection:
To open node by id add new context (maybe it is time to introduce redux here?)
with ids from root to desired element. If it is presented, every page should 
determine expanded/collapsed state by this context.
Add and expose method to set activeurl and fill default route.
- Add search with debouncing.
Search via BFS (each top level node => their children => etc.)
- Add transitions
Use http://reactcommunity.org/react-transition-group/
Think how properly implement transition of anchors and pages lists at the same time
and in case when anchors rendered and pages are not.
- Markup lists and listitems as tree and tree-items, implement keyboard nav. Refs:
https://www.w3.org/TR/wai-aria-practices/#TreeView
https://www.w3.org/TR/wai-aria-practices/exsmples/treeview/treeview-2/treeview-2a.html
- Implement items highlight on scroll
Subscribe to scroll event and check for visible anchors on page.s
- Add storybook or proper demo
