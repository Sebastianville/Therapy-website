//! https://medium.com/@mohsinansari.dev/simplified-guide-to-setting-up-a-global-error-handler-in-express-js-daf8dd640b69#:~:text=your%20application's%20users.-,Express.,js%20applications.

//? https://dev.to/srishtikprasad/error-handling-with-express-40pk#:~:text=Error%20Handling:%20Since%20an%20error,with%20a%20custom%20error%20message

export function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
}
  
