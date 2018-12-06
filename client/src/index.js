import React from "react";
import ReactDOM from "react-dom";

import {Generator} from './generator';

const Index = () => {
  return (
    <div>
      <Generator />
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));
