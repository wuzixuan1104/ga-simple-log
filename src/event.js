/**
 * GA Send
 */

// GA.log(type, action, label, value);
// GA.perform(type, action, label, value);

import schema from "./schema";
import { get, size } from "lodash";
// import { NotFoundException } from "./exception";
import send from "./send";

const splitAllCol = (params, allows) => {
  console.log(params, allows);
  const splitParams = {};
  allows.forEach((allow) => {
    const str = get(params, allow);
    if (!str) return;
    console.log(str, str.match(/(\{([A-Za-z0-9|:]*)\})/gi));

    splitParams[allow] = makeCallParams(
      str
        .match(/(\{([A-Za-z0-9|:]*)\})/gi)
        .map((fish) => fish.replace(/{\|}/g, ""))
    );
  });
  return splitParams;
};

const makeCallParams = (sources) => {
  const cols = {};
  sources.forEach((source) => {
    const sep = source.split("|");
    if (size(sep) > 0) {
      cols[sep[0]] = sep[1];
    }
  });
  return cols;
};

const checkParams = (customCol, options) => {
  const newCols = {};
  Object.keys(customCol).forEach((colKey) => {
    const needCol = get(customCol, colKey);
    const optionsCol = get(options, colKey);
    if (typeof needCol !== "string") {
      newCols[colKey] = checkParams(needCol, optionsCol);
    }
    // validate
    newCols[colKey] = optionsCol;
  });
  return newCols;
};

const checkRestict = (restrict, format) => {
  if (!restrict) return true;
  return Object.keys(restrict).some((col) => {
    const values = restrict.col;
    if (Array.isArray(values) && values.indexOf(format[col]) === -1)
      return false;
    if (typeof values === "string" && values !== format[col]) return false;
    return true;
  });
};

const convertToSend = (format, tpl) => {
  const cpTpl = {};
  console.log(format, cpTpl);
  Object.keys(format).forEach((col) => {
    Object.keys(format[col]).forEach((attr) => {
      const pattern = new RegExp(`{${attr}\\|.*}`);
      cpTpl[col] = tpl[col].replace(pattern, format[col][attr]);
      // console.log(tpl[col]);
    });
  });
  return cpTpl;
};
const GL = {};

schema.forEach((item) => {
  const Func = get(item, "func");
  const Event = get(item, "event");
  const params = get(item, "format");
  const restrict = get(item, "restrict");

  console.log("p", item);
  const customCol = splitAllCol(params, ["category", "label", "action"]);

  GL[Func] = (options) => {
    const format = checkParams(customCol, options);
    if (!format) return false;
    const isRestrict = checkRestict(restrict, format);
    if (!isRestrict) return false;
    const convertRes = convertToSend(format, params);
    console.log(convertRes);
    // const sendParams = {
    //   event: Event,
    //   category: get(format, "category").replace(/{}/)
    // };
    // send({
    //   event: Event,
    //   category,
    //   action,
    //   // label: `[${time}${numMulti}] ${chk}`,
    //   value
    // });
  };

  // GL[Func].column = customCol;
  // console.log(GL[Name].column);
});

GL.log({
  category: {
    type: "info"
  },
  action: {
    version: "v1.0.0",
    content: "test"
  },
  label: {
    time: "123",
    content: "test"
  }
});

export { GL };
