# Using Paperclip to Enable File Attachment

This article is a tutorial of the basic functionality of the [Paperclip library](https://github.com/thoughtbot/paperclip).

### What is Paperclip?

What is Paperclip?

From the Paperclip documentation:

> Paperclip is intended as an easy file attachment library for ActiveRecord. The intent behind it was to keep setup as easy as possible and to treat files as much like other attributes as possible.

Basically, Paperclip makes it easy to add the "Upload File" functionality to your applications. Using this library you can then create an application where a user has the ability to upload a file or an image.

### Configuration

To get Paperclip working on our Machines we need to install a dependency that Paperclip will be looking for called `ImageMagick`. Installing `ImageMagick` using Homebrew is easy:

```bash
$ brew install imagemagick
```

### Creating an Amazon Web Services Account

Amazon has a service called Amazon Web Services or AWS. This won't be the last you hear of AWS because AWS is used by the majority of companies that build web applications. AWS does **a lot** of stuff. For this lecture we will focus on AWS's image and file hosting capabilities. AWS allows us to easily store images and files on the Internet. We will use only one of the services that AWS offers called the Simple Storage Service (S3). Let's watch a brief [video](https://aws.amazon.com/s3/?sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=google&sc_medium=s3_b&sc_content=s3_e&sc_detail=amazon%20s3&sc_category=s3&sc_segment=175056484523&sc_matchtype=e&sc_country=US&s_kwcid=AL!4422!3!175056484523!e!!g!!amazon%20s3&ef_id=WExdWQAABCPRlhVJ:20170418212714:s) to see what S3 does. S3 is basically like a really performant Dropbox for our assets.

Let's create an AWS account. Go [here](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?nc2=h_ct) and follow the registration steps. You will be asked for your credit card information. Don't be alarmed. Select a "basic" plan and you won't be charged today. Historically Amazon has given "basic" plans a 12-month free trial so remember to cancel your account within one year.

## An Extended Example...

Once ImageMagik is installed and your AWS account is setup you now have all the necessary dependencies to use Paperclip. Let's create a new Rails application called `ppclipy_fun`:

```bash
$ rails new ppclipy_fun -T --database=postgresql
```

To use Paperclip with AWS, we will need to use 3 different Ruby gems which we can do by adding the following to our `Gemfile`<sup>0</sup>:

```ruby
gem "paperclip", "~> 6.0.0"
gem 'aws-sdk-s3'
gem "figaro"
```
<sup>0</sup>Add these to the "global" gems not the development or production gems

Once you have added all three of these Gems to your `Gemfile` you must install these Gems:

```bash
$ bundle install
```

>The figaro gem lets us set what are called environment variables. Environment variables are settings that affect how our application runs. The reason why we don't want to hard code these environment variables into our code base - and instead keep them locally in a file that doesn't get committed - is that often times environment variables are secret. If someone besides you knew these secrets your application would be more vulnerable to exploitation

After all our Gems are successfully installed we need to add an initializer for our `figaro` gem. We can do so by running this inside the root directory of our project:

```bash
$ bundle exec figaro install
```

Next is to hook up our application with our Amazon S3 bucket. To do so find your `./config/environments/development.rb` file and add the following code inside the Ruby block:

```ruby
config.paperclip_defaults = {
  storage: :s3,
  s3_protocol: 'http',
  s3_region: 'us-west-1',
  s3_host_name: "s3-us-west-1.amazonaws.com",
  s3_credentials: {
    bucket: ENV["AWS_S3_BUCKET"],
    access_key_id: ENV["AWS_ACCESS_KEY_ID"],
    secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"]
  }
}

```

For deployment using Heroku add the above code snippet to `./config/environments/production.rb`.

What the above code is saying to our app, is when our application is in development mode (`http://localhost:3000`) we want to use AWS S3, which we have access to from our `aws` gem. The `ENV` refers to our **environment variable** which has information about the environment in which we are developing in.

Did you run `rails db:create`?

### Getting our AWS Keys

We need to set a few environment variables which `development.rb` references (`ENV` refers to environment variables). We add these environment variables to our `application.yml` file. It should be noted that our `application.yml` is included in our `.gitignore` file.

Navigate back to your AWS account and sign into the AWS Console (https://console.aws.amazon.com) if you don't already have it opened. Next follow these steps:

1. Once signed in find the `Storage` option under the `Services` drop down menu. Click on `S3` inside this drop down menu.
2. Next let's create our first **S3 bucket**. An S3 bucket is just a place where we can throw assets into and retrieve them later. Find the blue `Create Bucket` button and click on it
3. When you click on it a modal will appear. Fill out the forms inside this modal.
  - For the region select `US West (N. California)`
4. Once successfully created you will be brought to a page that will display to you some information about your bucket
5. Next we need the keys. Keys are simply just cryptographically signed alphanumeric strings that allows AWS to authenticate us. (If none of that made sense to you don't worry). Go to [this](https://console.aws.amazon.com/iam/home?region=us-west-2#/security_credential) page.
6. Once on that page scroll down to the middle and click on `Access Keys (Access Key ID and Secret Access Key)` and click `Create New Access Key`
7. Once that button is clicked it will generate a  `csv` file containing your keys. This file will be automatically downloaded. Open this file.
8. In your `application.yml` file add `AWS_ACCESS_KEY_ID:` with your key and `AWS_SECRET_ACCESS_KEY:` with your secret and save the file
9. Lastly paste the name of your bucket into the `AWS_S3_BUCKET:` field

At the end of this your `application.yml` file should look something like this:

```
AWS_ACCESS_KEY_ID: "<key>"
AWS_SECRET_ACCESS_KEY: "<secret-acces-key>"
AWS_S3_BUCKET: "jtamsut-practice"
```

### Our Application Code

With all of our set up out of the way we need to now set up our application. We are going to make a single table `user` that will have the following attributes:
  - name: string
  - description: string
  - image: attachment

To do this we need to generate a blank migration and model file which we can accomplish with:

```bash
$ rails g model User name description region image:attachment
```

Next let's finish setting up our database:

```bash
$ rails db:create
$ rails db:migrate
```

### Our Controller

Let's now write our controller code and define our route:

Change `config/routes.rb` to look like this:

```ruby
Rails.application.routes.draw do
  resources :users
end
```

Let's manually create our `user_controller.rb` file and make an `index` action:

```ruby
class UsersController < ApplicationController
  def index
  end
end
```

The final step is to now add our view! Go inside of `app/views` and make a new folder called `users`. Inside `users` create an `index.html.erb` file.

Next lets run our server:

```bash
$ rails s
```

### Our Application Functionality

Let's add a `private` method to sanitize our parameters. This prevents "garbage values" from being stored in the database:

```ruby
private
  def user_params
    params.require(:user).permit(:name, :description, :image)
  end
```

Next let's update our User model in `user.rb`:

```ruby
class User < ApplicationRecord
  has_attached_file :image, styles: { medium: "500x500>", thumb: "250x250>" }, presence: true
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
```

The `has_attached_file` and `validates_attachment_content_type` both come from Paperclip and allow the user to upload an image and not any other file type.

Let's create a way to create new users. Let's make a view for this in `app/views/users/new.html.erb`. Add the following coded to `new.html.erb`:

```ERB
<%= form_for @user, url: users_path, html: { multipart: true } do |form| %>
  <%= form.label :name %>
  <%= form.text_field :name %><br>

  <%= form.label :description %>
  <%= form.text_field :description %><br>

  <%= form.file_field :image %><br><br>

  <%= form.submit 'Create User!' %>
<% end %>
```

Inside this form, we see something new: `html: { multipart: true }`. This template logic tells Rails that we will be adding a form with multiple fields to this page.

Now let's add a `new` and `create` action to our UsersController:

```ruby
def new
  @user = User.new
end

def create
  @user = User.new(user_params)

  if @user.save
    redirect_to users_path
  else
    render :new
  end
end
```

Now let's go back to our form and add a new user. If everything goes well we should be redirected back to our Users index page.

### Viewing users

Let's write our conroller and view logic to display users. Update the `index` action in the UsersController:

```ruby
def index
  @users = User.all
end
```
Let's update `index.html.erb`:

```erb
<h1>Users</h1>
<hr>

<ul>
	<% @users.each do |user| %>
		<li>Name:<p><%= user.name %></p></li>
		<li>Description<p><%= user.description %></p></li>
		<%= image_tag user.image.url %>
		<%= link_to 'View user', user_path(user) %>
	<% end %>
</ul>

<%= link_to 'Create User', new_user_path %>
```

### Independently if Time Permits

If time permits write code for the `show` action.