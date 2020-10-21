# dotCMS Custom Field - React Markdown Editor   

This example shows to create a custom field that levergages prebuilt react components - in this case, the 
[SimpleMDE - Markdown Editor](https://github.com/sparksuite/simplemde-markdown-editor)

The patterns that this plugin uses to enable this react component can be used to incorporate any 3rd party javascript component (NG/Vue/React based) as a content control.  It uses a .vtl file to render the custom control in an iframe on the content editing screen and writes any changes made in the editor to the content's custom field value. 

## Steps:

1. Create the `Custom Field`
2. Create the `vtl file`
3. Create and build the `ReactJS app`
4. Upload the `ReactJS app` into dotCMS.
5. Create a content based on the new `Custom Field`

### 1. Create the Custom Field
- Go to `Content Model` --> `Content Types` and add a new `Content`
- Add a `Custom Field` and set a `Name` (the Name must be unique). E.g. **customReactApp**
- In the `Value` field you need to set the path of the VTL file. E.g. 
`#dotParse("/application/vtl/custom-fields/customFieldReactApp.vtl")`

### 2. Create the VTL file
- A) Go to `Site` --> `Browser` and create the `VTL` file based on the name and path set on step [1. C](#step1c)
- <a id="step2b"></a>B) Open the `VTL` file and add the following code:
```
1   <iframe
2       id="reactAppIframe"
3       style="border:0"
4       height="500px"
5       width="100%"
6   >
7   </iframe>
8
9  
10  <script>
11  const hiddenFieldValue = document.getElementById("$field.getVelocityVarName()");
12  const iframe = document.getElementById("reactAppIframe");
13  const hostname = "$request.getRequestURL()".substr(0, "$request.getRequestURL()".indexOf('/', 8));
13    
14  // Set data to the iframe to be loaded in the React App
15  iframe.dataset.value = document.getElementById("$field.getVelocityVarName()").value;
16  iframe.src = hostname + '/react-app/index.html';
17
18  iframe.onload = () => {
19      iframe.contentWindow.document.addEventListener("custom-field-react-app",
20          (event) => {
21                
22              // Prevent default and stop propagation to avoid conflict issues
23              event.preventDefault();
24              event.stopPropagation();
25                
26              // Update value of hidden field related to the custom field
27              hiddenFieldValue.value = event.detail;
28          });
29      };
30  </script>
```
***Notes:** on `line 19` the `Custom Event` name must match with the name declared later on step [3. C](#step3c)

### 3. Create and build the [ReactJS app](https://reactjs.org/)

- A) In your terminal create a ReactJS App:
```
npx create-react-app custom-field-react;
cd custom-field-react;
npm install --save-dev react-simplemde-editor;
```
- <a id="step3b"></a>B) Set homepage path as relative in your App configuration. To do it, open `package.json` file and add the following:
```
"homepage": "./"
```
- <a id="step3c"></a>C) Edit `App.js` to add the MarkdownEditor:
```
1   import React, { useState, useEffect } from 'react';
2   import SimpleMDE from 'react-simplemde-editor';
3   import 'easymde/dist/easymde.min.css';
4
5   function App() {
6       const [data, setData] = useState('');
7
8       useEffect(() => {
9            setData(window.frameElement?.dataset?.value || '');
10      }, []);
11
12      function updateMarkdown(value) {
13          const customEvent = new CustomEvent('custom-field-react-app', {
14              detail: value,
15              bubbles: true,
16              cancelable: true,
17          });
18          const elem = document.querySelector('.App');
19          elem.dispatchEvent(customEvent);
20      }
21
22      return (
23          <div className="App">
24              <SimpleMDE onChange={updateMarkdown} value={data} />
25          </div>
26      );
27  }
28
29  export default App;

```
***Notes:** on `line 13` the `Custom Event` name must match with the name declared on step [2. B](#step2b)

- D) In your terminal build your ReactJS App:
```
 npm run build;
```

### 4. Upload the ReactJS app
- Grab all files and folders from the folder `build` and upload them into the DotCMS server.

***Notes:** The location must match the one defined on the VTL file on `line 16` on step [2. B](#step2b)

### 5. Create a content based on the new `Custom Field`
- A) Go to `Content` --> `Search` and add a new Custom Content created on step [1. B](#step1b)

## <a id="sourcelinks"></a>Source code files (ReactJS app & VTL file)
- In this repository you will find the source code used to build:
   - <a href="https://github.com/dotcms-plugins/custom-field-react/tree/main/custom-field-react" target="_blank">ReactJS app</a>   
   - <a href="https://github.com/dotcms-plugins/custom-field-react/tree/main/vtl" target="_blank">VTL file</a>
