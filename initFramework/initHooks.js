import fwHooks from "../hooks/hooks.js";

export async function initHooks(projectHooks) {
  const result = { ...fwHooks };

  for (const key in projectHooks) {
    if (!result[key]) {
      result[key] = projectHooks[key];
    } else {
      const defaultFn = result[key];
      const projectFn = projectHooks[key];

      result[key] = async (...args) => {
        await defaultFn(...args);
        await projectFn(...args);
      };
    }
  }

  return result;
}
