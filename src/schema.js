const schema = [
  {
    func: "log",
    event: "Log",
    restrict: {
      category: ["info", "warn", "error"]
    },
    format: {
      category: "{type|String}",
      action: "[{version|String}] {content|String}",
      label: "[{time|String:optional}] {content|String}"
    }
  },
  {
    func: "perform",
    event: "Performance",
    format: {
      category: "{type|String}",
      action: "[{version|String}] {content|String}",
      label: "[{time|String:optional}] {content|String}"
    }
  }
];

export default schema;

/** 
 * {
    category: {
      type: "String"
    },
    action: {
      version: 'String',
      content: 'String
    },
    label: {
      time: 'String:optional',
      content: 'String'
    },
  }; 
 */
