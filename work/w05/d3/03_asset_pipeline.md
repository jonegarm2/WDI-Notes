A link to the slides can be found [here](https://slides.com/jonathantamsut/the-rails-asset-pipeline).

# A Meditation on the Asset Pipeline

The Rails asset pipeline is a set of tools baked into Rails that makes it easy to manage your assets. Assets include custom JavaScript scripts, images and stylesheets. 


## Rails Default Asset Directories 

By default Rails comes with 3 asset directories each with their own purpose:
* `app/assets`: assets specific to the present application
* `lib/assets`: assets for libraries written by your dev team
* `vendor/assets`: assets from third-party vendors (e.g., other dev teams)

## Pipeline

What makes the *asset pipeline* a *pipeline*? A **pipeline** arises whenever you have a number of computational tasks that are done in series, one after another and the output of one task is used as the input of another task.

What makes this asset pipeline pipeline-y is the Sprockets gem

Sprockets performs the asset packaging which takes the assets from all the specified paths, compiles them together and places them in public/assets directory.

**Take a moment to look in the public/assets directory**

### Minification 

**Minification** refers to removing all un-necessary characters from a file so as to reduce its file size and reduce the number of bytes that need to be transmitted over the network; this often involves shortening all variables names as much as possible​

### Concatenation

Concatenation or bundling - taking multiple files and putting them all into one: this reduces the number of files that need to be requested by   your web pages; reducing HTTP requests decreases the amount of time a web page takes to load in a browser

### Pre-Process

Browsers only know how to "read" HTML, JS and CSS. Sometimes we code in other languages like SASS, ERB or CoffeeScript. A transpiler must perform some pre-processing in order to convert these to a language browsers speak before the browser can render this code.

##### Sprocket 

Sprockets transpiles files based on file extension

For example the file index.html.erb is going to first get run through the ERB pre-processor then served to the client as an HTML file

### Manifest Files 

A manifest file is a file that Sprockets looks at to see which assets it should include in its pipeline. You specify which assets you want to include by including directives in a manifest file.

> "With these directives, Sprockets loads the files specified, processes them if necessary, concatenates them into one single file and then compresses them. By serving one file rather than many, the load time of pages can be greatly reduced because the browser makes fewer requests. Compression also reduces file size, enabling the browser to download them faster." - Rails Docs

### ERB in JS

If you add an .erb extension to a JavaScript asset, making it something such as application.js.erb you can then use the asset_path helper in your JavaScript (see code snippet below)

When writing JS (and CSS) we can use our "squids" inside our CSS and JS files because these files go through the asset pipeline
