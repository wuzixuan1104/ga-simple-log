import TagManager from "react-gtm-module";

const send = ({ event, category, action, label }) => {
  if (!event || !category || !action) return;

  try {
    TagManager.dataLayer({
      dataLayer: {
        event,
        category,
        action,
        label
      }
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[GA] send error", e);
  }
};

export default send;
