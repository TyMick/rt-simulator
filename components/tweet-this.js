import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";

export default function TweetThis({
  children,
  tweetText,
  tweetUrl,
  tweetURL,
  tweetVia,
  tweetHashtags,
  tweetRelated,
  sameWindow = false,
  tweetButtonProps,
  as: asComponent,
  className,
  ...otherProps
}) {
  const Component = asComponent || "span";

  const [colorActive, setColorActive] = useState(false);
  const activateColor = () => setColorActive(true);
  const removeColor = () => setColorActive(false);

  let intentHref = "https://twitter.com/intent/tweet?";
  if (tweetText || (typeof children === "string" && children)) {
    intentHref += `text=${encodeURIComponent(tweetText || children)}&`;
  }
  if (tweetUrl || tweetURL) {
    intentHref += `url=${encodeURIComponent(tweetUrl || tweetURL)}&`;
  }
  if (tweetVia) {
    intentHref += `via=${encodeURIComponent(tweetVia)}&`;
  }
  if (tweetHashtags) {
    let hashtagsStr;
    if (Array.isArray(tweetHashtags)) {
      hashtagsStr = tweetHashtags.join(",");
    } else {
      hashtagsStr = tweetHashtags;
    }
    intentHref += `hashtags=${encodeURIComponent(hashtagsStr)}&`;
  }
  if (tweetRelated) {
    let relatedStr;
    if (Array.isArray(tweetRelated)) {
      relatedStr = tweetRelated.join(",");
    } else {
      relatedStr = tweetRelated;
    }
    intentHref += `related=${encodeURIComponent(relatedStr)}&`;
  }
  intentHref = intentHref.slice(0, intentHref.length - 1);

  return (
    <>
      <Component
        className={clsx(
          "tweet-this",
          colorActive && "tweet-this-active",
          className
        )}
        {...otherProps}
      >
        {children}
      </Component>{" "}
      <a
        className="twitter-badge-btn"
        href={intentHref}
        rel={!sameWindow && "noopener noreferrer"}
        onMouseEnter={activateColor}
        onMouseLeave={removeColor}
        onFocus={activateColor}
        onBlur={removeColor}
        {...tweetButtonProps}
      >
        <FontAwesomeIcon icon={faTwitter} /> Tweet this
      </a>
    </>
  );
}
