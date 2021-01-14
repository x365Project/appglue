const customViewports = {
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1920px',
      height: '1080px'
    }
  },
  Laptop: {
    name: 'Laptop',
    styles: {
      width: '1366px',
      height: '768px'
    }
  },
  Tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '680px'
    }
  },
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '320px',
      height: '680px'
    }
  }
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: { viewports: customViewports },
}