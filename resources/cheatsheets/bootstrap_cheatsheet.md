# How To Add Twitter Bootstrap To Your Rails App

![Bootstrap](http://andrewembler.com/application/files/4814/3187/9931/twitter-bootstrap.jpg)

## Overview

Follow these steps to **Bootstrapify** your Rails App.



### Step 1

Add Bootstrap Gem

``` 
gem 'bootstrap-sass', '~> 3.2.0'
gem 'bootstrap_form'  # if you want bootstrap forms!
```

***Check your ticks!***

### Step 2

From Command Line:

``` 
bundle install
```

### Step 3

Start Servers in different Command Line tabs 

`rails s` or `rails server`



### Step 4

Within the App > Assets > Javascripts > Application.js

Add:

``` 
//= require bootstrap-sprockets
//= require bootstrap
```

to directives ***in this order:***

``` 
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require bootstrap
//= require_tree .

```

### Step 5

Within the App > Assets > Stylesheets > Application.css

Add to bottom of file:

``` 
 *
 *= require rails_bootstrap_forms
 *= require_tree .
 *= require_self
 */

@import "bootstrap-sprockets";
@import "bootstrap";
```



Then rename file Application.css***.scss***

Make sure you keep them in this order! As you can see, we're also adding 

bootstrap forms to make our forms simpler!

### Step 6

Within the Apps > Views > Layouts > Application.html.erb

Add these scripts/links to the HEAD:



``` 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
```

This enables jquery animations!

### Bootstrap Away!

# getbootstrap.com