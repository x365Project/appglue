# First usage:

Run the commands:
```bash
git clone git@github.com:x365Project/appglue.git
cd appglue/
npm install
npm run bootstrap # installs dependencies
npm run build # build contennt
npm run bootstrap # set @appglue scope dependencies
```


# Add new project:

1. Run the commands:
    ```bash
    mkdir appglue.project
    cd appglue.project/
    npm init -y
    ```
2. Change `name` in `package.json` to `@appglue/project` (name of the folder)
3. Add `appglue.project` to `lerna.json` in the root folder


# Add new module to some project

## For remote dependencies:
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

## For local dependencies:

For brevity, we'll refer to the target project as "leaf" and local dependency as "parent". Refer to `appglue.server`(leaf), `appglue.node`(parent), `appglue.node`(parent).

### 1. Use `lerna` to add the leaf module.
```
lerna add @appglue/parent --scope=@appglue/leaf
```
- This will create a symlink between @appglue/leaf/node_modules/@appglue/parent and appglue/parent directory.
- package.json is updated.

### 2. Update tsconfig.json of "parent" module.
- See `appglue.common/ts.build.config`.
- Set "composite" to true.

### 3. Update tsconfig.json of "leaf" project. 
- See `appglue.server/ts.build.config` or [See Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

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
### 4. Update package.json of "leaf" project.
```json
 {
  //...
  "prebuild": "rm -rf dist/ *.tsbuildinfo", // Optional
  "build": "tsc --build"  
 }
```
This would:
- Find all referenced projects
- Detect if they are up-to-date
- Build out-of-date projects in the correct order

# Evaluation of lerna typescript monorepo

## Pros:
- More Code-sharing
- Easier to manage common external dependencies versioning.

## Cons:
- More complex CI/CD. Require configuration of workflow to add special trigger rules for each of the applications to decouple deployments.
- Multi-stage docker build becomes tricky as you need additional steps to deal with symlinked local dependencies.
- Size of transpiled code might be increased. Can consider bundling tool such as webpack to reduce size.
- Addition of a new "parent" module to a leaf project can be cumbersome as seen above. Any misstep would cause the compiler to complain.