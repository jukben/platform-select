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
  let returnValue;
  let step;

  while ((step = procedure.shift())) {
    try {
      returnValue = getTask(step)();
    } catch (e) {
      continue;
    }

    return returnValue;
  }

  throw new Error(`No suitable job for "${platform}"`);
}

module.exports = pick;
