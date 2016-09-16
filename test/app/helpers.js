export default {
  beforeMock(lean) {
    this.lean = lean;
    this.Query = this.lean.Query;
    this.Object = this.lean.Object;
  },
  unMock() {
    this.lean.Query = this.Query;
    this.lean.Object = this.Object;
  },
  mockLeanQuery(args, data) {
    this.lean.Query = modelName => Object.assign({ // eslint-disable-line
      limit: () => {},
      descending: () => {},
      equalTo: () => {},
      find: () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(data || {});
        }, 10);
      }),
      get: () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(data || {});
        }, 10);
      }),
    }, args);
  },

  mockLeanQueryFailure(err) {
    this.mockLeanQuery({
      find: () => Promise.reject(err || 'unknown error'),
      get: () => Promise.reject(err || 'unknown error'),
    });
  },

  mockLeanSave(data) {
    this.lean.Object = {
      extend: (model) => {
        return function() {
          this.save = () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => resolve(data || {}), 20);
            });
          };
        };
      },
    };
    this.lean.Object.createWithoutData = this.lean.Object.extend;
  },

  mockLeanSaveFailure(err) {
    this.lean.Object = {
      extend: (model) => {
        return function() {
          this.save = () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => reject(err || 'unknown error'), 20);
            });
          };
        };
      },
    };
    this.lean.Object.createWithoutData = this.lean.Object.extend;

  },
};
