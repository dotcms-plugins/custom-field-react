# dotCMS Custom Field - React Markdown Editor   

This example shows to create a custom field that leverages prebuilt react components - in this case, the 
[SimpleMDE - Markdown Editor](https://github.com/sparksuite/simplemde-markdown-editor)

The patterns that this plugin uses to enable this react component can be used to incorporate any 3rd party javascript component (NG/Vue/React based) as a content control.  It uses a .vtl file to render the custom control in an iframe on the content editing screen and writes any changes made in the editor to the content's custom field value. 

## Steps:

1. Clone and build the `ReactJS app`
2. Upload the `ReactJS app` into dotCMS.
3. Create the `Custom Field`
4. Create a content based on the new `Custom Field`


### 1. Clone and build the [ReactJS app](https://reactjs.org/)

- A) In your terminal git clone the dotCMS Custom Field - React Markdown Editor App:
```
git clone https://github.com/dotcms-plugins/custom-field-react.git;
```

- B) Install dependencies
```
cd custom-field-react;
npm install;
```

- C) Build your ReactJS App:
```
 npm run build;
```

### 2. Upload the ReactJS app into dotCMS
- Grab all content from folder `build` and upload them into the DotCMS server, in path: 
```/react-app/```

### 3. Create the Custom Field
- Go to `Content Model` --> `Content Types` and add a new `Content`
- Add a `Custom Field` and set a `Name` (the Name must be unique). E.g. **customReactApp**
- In the `Value` field you need to set the path of the VTL file (uploaded on Step 2). E.g. 
`#dotParse("/react-app/customFieldReactApp.vtl")`

### 4. Create a content based on the new `Custom Field`
- A) Go to `Content` --> `Search` and add a new Custom Content

