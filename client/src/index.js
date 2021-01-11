import React from "react";
import ReactDOM from "react-dom";

import {Generator} from './generator';
import {TopLinks} from './top-links';

const Index = () => {
  return (
    <div>
      <Generator />
      <TopLinks />
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));
