module.exports = {
    presets: [
      // Your presets, e.g. 'react-app'
    ],
    plugins: [
      ["@babel/plugin-transform-class-properties", { "loose": false }],
      ["@babel/plugin-transform-private-methods", { "loose": false }],
      ["@babel/plugin-transform-private-property-in-object", { "loose": false }]
    ]
  };
  