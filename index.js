function getTask(step) {
  const platform = process.platform;

  if (step[platform]) {
    return step[platform];
  } else if (step["_"]) {
    return step["_"];
  } else {
    throw new Error(
      `Function for current platform ("${platform}") is not defined!`
    );
  }
}

function pick(...procedure) {
  const platform = process.platform;

  const getNextProcedure = () => {
    const step = procedure.shift();

    if (!step) {
      throw new Error(`No suitable job for "${platform}"`);
    }

    const job = getTask(step);

    if (typeof job !== "function") {
      throw new Error(
        "Job has to be a function which returns value or Promise"
      );
    }

    let task;
    try {
      task = job();
    } catch (e) {
      task = Promise.reject(e);
    }

    if (!(task instanceof Promise)) {
      task = Promise.resolve(task);
    }

    return task.catch(e => getNextProcedure());
  };

  return getNextProcedure();
}

module.exports = pick;
