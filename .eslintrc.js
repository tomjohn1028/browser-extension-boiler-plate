module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/standard"
  ],
  plugins: ["react-hooks"],
  settings: {
    react: {
      version: "detect"
    }
  }
}
