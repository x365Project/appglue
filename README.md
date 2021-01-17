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

#### If there are cross dependencies...

For brevity, we'll refer to the target project as "leaf" and local module as "parent".

1. Use `lerna` to add the leaf module.
```
lerna add @appglue/parent --scope=@appglue/leaf
```
    - This will create a symlink between @appglue/leaf/node_modules/@appglue/parent and appglue/parent directory.
    - package.json is updated.

2. Update tsconfig.json of "parent" module. See appglue.common/ts.build.config.
    - Set "composite" to true.

3. Update tsconfig.json of "leaf" project. See appglue.server/ts.build.config.
    - Add relative path of leaf node's ts configuration file like this:
    ```json
    {
        //...
        "references": [
            {
                "path": "../app.glue/parent/tsconfig.build.json"
            }
        ]

    }
    ```
4. Update package.json of "leaf" project.
    - Build the project with "tsc --build".