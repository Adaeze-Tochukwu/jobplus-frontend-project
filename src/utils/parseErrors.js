export const parseErrors = (err) => {
  //check if the error is a VALIDATION ERROR
  if (err?.response?.data?.error?.name === "ValidationError") {
    return {
      message: err?.response?.data?.error?.message,
      details: err?.response?.data?.error?.dstails?.errors,
    };
  }

  //check if it is a NETWORK ERROR, the url is wrong. That is, it can't get to the backend. We use "console.log(err)" to check it
  if (err?.message === "Network Error") {
    return {
      message: "Unable to connect to the server end point",
      details: [],
    };
  }

  //check for FORBIDDEN ERROR, if you are not given access to register for something
  if (err?.response?.status === 403) {
    return {
      message: "Your role does not have access to this resource",
      details: [],
    };
  }

  //check for GENERIC ERROR
  return {
    message: "An unexpected error occcured, contact support",
    details: [],
  };
};
