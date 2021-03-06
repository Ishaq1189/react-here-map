import React, { useEffect, useState } from "react";
import loadMap from "./../../libs/loadMap";
import defaults from "./../../libs/defaults";
import merge from "lodash.merge";
import initPlatform from "./../../libs/initPlatform";

const optionMerger = options => merge(defaults, options);

function Platform(props) {
  const [platformData, setPlatformData] = useState({
    platform: {},
    options: {}
  });
  useEffect(() => {
    // const { version, interactive, includeUI, includePlaces } = props;
    loadMap(props).then(options => {
      const platform = initPlatform(options);
      setPlatformData({ platform, options });
    });
  }, [platformData.platform.A]);
  const { platform, options } = platformData;
  // console.log("Got here");

  return platform.A == "api.here.com" && options.app_code
    ? React.Children.map(props.children, child => {
        console.log(child);
        return React.cloneElement(child, { platform, options });
      })
    : null;
}

export default Platform;
