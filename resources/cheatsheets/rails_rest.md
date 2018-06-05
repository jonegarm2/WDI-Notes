| HTTP Verb | Path/URI  | Rails controller#method | Default View    | Purpose |
|-----------|------------------|------------------|-----------------|-----------------|
|    GET    |  /posts          |   posts#index    |  index.html.erb | List all posts |
|    GET    |  /posts/:id      |   posts#show     |  show.html.erb  | Show a single post | 
|    GET    |  /posts/new      |   posts#new      |  new.html.erb   | Provide form for<br>submitting new post<br>to the create action |
|    POST   |  /posts          |   posts#create   |  no default     | Create a new post,<br>then redirect to ? |
|    GET    |  /posts/:id/edit |   posts#edit     |  edit.html.erb  | Provide form for<br>editing a post<br>and sending to the<br>update action |
|    PUT    |  /posts/:id      |   posts#update   |  no default     | Update a post,<br>then redirect to ? |
|    PATCH  |  /posts/:id      |   posts#update   |  no default     | Same as PUT |
|    DELETE |  /posts/:id      |   posts#destroy  |  no default     | Delete a post,<br>then redirect to ? |