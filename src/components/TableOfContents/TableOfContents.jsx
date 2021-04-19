import clsx from 'clsx';
import { Fragment, useEffect, useState } from "react";
import { EntitiesContext } from '../EntitiesContext';
import { HistoryContext } from '../HistoryContext';
import { Page } from "../Page/Page";
import LoadingPlaceholder from "./loading-placeholder.svg";
import "./TableOfContents.scss";

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
