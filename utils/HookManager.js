export class HookManager {
  constructor(defaultHooks = {}, projectHooks = {}) {
    this.hooks = this.mergeHooks(defaultHooks, projectHooks);
  }

  mergeHooks(defaultHooks, projectHooks) {
    const result = { ...defaultHooks };

    for (const key in projectHooks) {
      if (!result[key]) result[key] = projectHooks[key];
      else {
        const defaultFn = result[key];
        const projectFn = projectHooks[key];

        result[key] = async () => {
          await defaultFn();
          await projectFn();
        };
      }
    }

    return result;
  }

  async runAll() {
    for (const key in this.hooks) {
      await this.hooks[key]();
    }
  }
}

export default HookManager;
