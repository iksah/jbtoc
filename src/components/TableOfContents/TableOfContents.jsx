import clsx from 'clsx';
import { Fragment, useEffect, useState } from "react";
import { EntitiesContext } from '../EntitiesContext';
import { HistoryContext } from '../HistoryContext';
import { Page } from "../Page/Page";
import LoadingPlaceholder from "./loading-placeholder.svg";
import "./TableOfContents.scss";

// TODO:
// [1] Use forward ref and useImperativeHandle to expose api.
// [2] Implement node selection:
// To open node by id add new context (maybe it is time to introduce redux here?)
// with ids from root to desired element. If it is presented, every page should 
// determine expanded/collapsed state by this context.
// Add and expose method to set activeurl and fill default route.
// [3] Add search with debouncing.
// Search via BFS (each top level node => their children => etc.)
// [4] Add transitions
// Use http://reactcommunity.org/react-transition-group/
// Think how properly implement transition of anchors and pages lists at the same time
// and in case when anchors rendered and pages are not.
// [5] Markup lists and listitems as tree and tree-items, implement keyboard nav. Refs:
// https://www.w3.org/TR/wai-aria-practices/#TreeView
// https://www.w3.org/TR/wai-aria-practices/exsmples/treeview/treeview-2/treeview-2a.html
// [6] Implement items highlight on scroll
// Subscribe to scroll event and check for visible anchors on page.s

export const TableOfContents = (
  {
    contentsUrl,
    className,
  }
) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topLevelIds, setTopLevelIds] = useState({});
  const [entities, setEntities] = useState({});

  const [activeUrl, setActiveUrl] = useState(window.location.pathname);
  const historyContextValue = {activeUrl, setActiveUrl};

  useEffect(() => {
    fetch(contentsUrl)
      .then(response => response.json())
      .then(
        ({ entities, topLevelIds }) => {
          setEntities(entities);
          setTopLevelIds(topLevelIds);
          topLevelIds.map((id) => console.log(entities.pages[id]));
        },
        (error) => setError(error),
      )
      .finally(() => setIsLoaded(true));
  }, [contentsUrl]);

  return (
        <nav
          className={clsx(
            "table-of-contents",
            {"table-of-contents--error": error},
            {"table-of-contents--loading": !isLoaded},
            className)}>

          {!isLoaded && (
            <Fragment>
              <img
                className="table-of-contents__loading-placeholder"
                src={LoadingPlaceholder}
                alt="loading placeholder"
                role="presentation"
                />
              <img
                className="table-of-contents__loading-placeholder"
                src={LoadingPlaceholder}
                alt="loading placeholder"
                role="presentation"
                />
            </Fragment>
          )}

          {error && (
            {error}
          )}

          {isLoaded && !error && (
            <EntitiesContext.Provider
              value={entities}>

              <HistoryContext.Provider
                value={historyContextValue}>

              <ul
                aria-label="Table of contents"
                className="table-of-contents">
                {topLevelIds.map(id => (
                  <li
                    key={id}
                    className="pages-list__item">
                    <Page
                      id={id}/>
                  </li>
                ))}
              </ul>
              </HistoryContext.Provider>
            </EntitiesContext.Provider>
          )}

          {error && (
            {error}
          )}
        </nav>
  );
}
