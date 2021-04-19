import clsx from "clsx";
import { useContext, useState } from "react";
import { EntitiesContext } from "../EntitiesContext";
import { HistoryContext } from "../HistoryContext";
import Chevron from "./chevron.svg";
import "./Page.scss";

export const Page = ({ id }) => {
  const entities = useContext(EntitiesContext);

  const { title, url, pages, anchors, level } =  entities.pages[id];

  const {activeUrl, setActiveUrl} = useContext(HistoryContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = url && activeUrl === url;

  const showAnchors = anchors?.length && isActive;
  const showPages = pages?.length && isExpanded;
  const showExpandButton = pages?.length;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const onLinkClick = (e) => {
    e.preventDefault();

    if (!url || isActive) {
      toggleExpand();
      return;
    }

    if (url) {
      window.history.pushState({}, title, url);
      setActiveUrl(url);
    }
    setIsExpanded(true);
  }

  return (
    <div
      className={clsx(
        "page",
        {"page--active": isActive},
      )}
      style={{
        '--level': level,
      }}>

      {showExpandButton && (
        <button
          aria-label="Expand subpages"
          onClick={toggleExpand}
          className="page__toggle">

          <img
            aria-hidden="true"
            alt=""
            src={Chevron} />
        </button>
      )}

      <a
        href={url}
        onClick={onLinkClick}
        className="page__link"
      >
        {title}
      </a>

      {showAnchors && (
        <ul
          aria-label="Page anchors"
          className="pages-list">
          {anchors.map(id => (
            <li
              key={id}
              className="pages-list__item">
              <Anchor
                id={id}
                parentLevel={level}/>
            </li>
          ))}
        </ul>
      )}

      {showPages && (
        <ul
          aria-label="Subpages"
          className="pages-list">
          {pages.map(id => (
            <li
              key={id}
              className="pages-list__item">
              <Page
                id={id}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

const Anchor = ({ id, parentLevel }) => {
  const entities = useContext(EntitiesContext);
  const { title, url, anchor, level } =  entities.anchors[id];

  return (
    <div
      className={clsx(
        "page",
        "page--active",
      )}
      style={{
        '--level': parentLevel + level,
      }}>

      <a
        href={url + anchor}
        className="page__link"
      >
        {title}
      </a>
    </div>
  )
};
