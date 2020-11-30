### First usage:

Run the commands:
```bash
git clone git@github.com:x365Project/appglue.git
cd appglue/
npm install
npm run bootstrap # installs dependencies
npm run build # build contennt
npm run bootstrap # set @appglue scope dependencies
```


### Add new project:

1. Run the commands:
    ```bash
    mkdir appglue.project
    cd appglue.project/
    npm init -y
    ```
2. Change `name` in `package.json` to `@appglue/project` (name of the folder)
3. Add `appglue.project` to `lerna.json` in the root folder


### Add new module to some project

Run the command:
```bash
cd appglue/
npx lerna add MODULE-NAME --scope=@appglue/PROJECT
```

Example of adding `material-ui` module to `appglue.site` project in `dependencies`:
```bash
cd appglue/
npx lerna add material-ui --scope=@appglue/site
```

Example of adding `webpack` module to `appglue.site` project in `devDependencies`:
```bash
cd appglue/
npx lerna add webpack --dev --scope=@appglue/site
```
