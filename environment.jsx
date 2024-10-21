export const env = {
  type: 'dev', //prod staging dev
  appUrls: {
    dev: {
      apiUrl: 'https://dorkar.aqualeafitsol.com',
      // apiUrl: 'https://unified.dorkarservice.com',
    },
    staging: {
      apiUrl: 'https://dorkar.aqualeafitsol.com',
    },
    prod: {
      apiUrl: 'https://dorkar.aqualeafitsol.com',
    },
  },
  mediaUrls: {
    dev: {
      apiUrl: 'https://dorkar.aqualeafitsol.com/storage/app/public',
      // apiUrl: 'https://unified.dorkarservice.com/storage/app/public',
    },
    staging: {
      apiUrl: 'https://dorkar.aqualeafitsol.com/storage/app/public',
    },
    prod: {
      apiUrl: 'https://dorkar.aqualeafitsol.com/storage/app/public',
    },
  },
};

export const envStore = {
  type: 'dev', //prod staging dev
  appUrls: {
    dev: {
      apiUrl: 'https://dorkarmall.aqualeafitsol.com',
    },
    staging: {
      apiUrl: 'https://dorkarmall.aqualeafitsol.com',
    },
    prod: {
      apiUrl: 'https://dorkarmall.aqualeafitsol.com',
    },
  },
  mediaUrls: {
    dev: {
      apiUrl: 'https://dorkarmall.aqualeafitsol.com/storage/app/public',
    },
    staging: {
      apiUrl: 'https://dorkarmall.aqualeafitsol.com/storage/app/public',
    },
    prod: {
      apiUrl: 'https://dorkarmall.aqualeafitsol.com/storage/app/public',
    },
  },
}
