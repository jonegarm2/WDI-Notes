## Computer Networking for Web Developers: An Introduction to HTTP

A link to slides are [here](https://presentations.generalassemb.ly/031c64f676cd38900c119b754ab639b0#/).

---

## Book Recs

* *Where the Wizards Stay Up Late: The Origins of the Internet** by Lyon and Hafner 
* *Weaving the Web: The Original Design and Ultimate Destiny of the World Wide Web by its Inventor* by Tim Berners-Lee

---

HTTP stands for **H**yper**T**ext **T**ransfer **P**rotocol**.

* HyperText: text that links to other text (like HTML)
* Transfer: moving HTML across cables
* Protocol: an agreed way of behavior between two parties 

---

## curl

For the remainder of this lecture we will be using `curl` with the `-i` flag to see the results of our HTTP requests. 

---

## The Cast: Request/Response Cycle

What happens when you type in `https://www.facebook.com/` to your Web Browser's address bar:

1. Your web browser makes a **REQUEST** for http://www.facebook.com.

2. A server **RESPONDS** to your request and sends the HTML, CSS and JS for http://www.facebook.com to your computer.

A **server** is a computer that is connected to the Internet and listens for requests for resources (web pages, images, videoes) from other computers.

---

## IP Address

All computers on the internet have a unique numeric address. This is the way computers find "each other" when communicating. You may recognize the format below - it's an **Internet Protocol** or IP address:

<br>

`123.123.123.123`

<br>

| Domain Name  | IP Address    |
|--------------|---------------|
| apple.com    | 17.172.224.47 |
| facebook.com | 31.13.65.1    |
| google.com   | 216.58.192.46 |

---

## As a Class

What happens when you perform a `GET` request using `apple.com`'s IP address?

Let's try this out using our browsers.

---

### What is a Resource

A **resource** is just a general term for something you would want to retrieve on the web, like an HTML file or an audio file or an image or a JavaScript file.

---

### HTTP and The Web

![the web](https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/images/TheWeb.png)

---

## The Internet

* The World Wide Web is a massive distributed client/server information system as depicted in the diagram on the previous slide
* Many applications are running concurrently over the Web, such as web browsing/surfing, e-mail, file transfer, audio & video streaming, and so on
* In order for proper communication to take place between the client and the server, these applications must agree on a specific application-level protocol such as HTTP.

---

#### What is HTTP: A Second Look

* HTTP (Hypertext Transfer Protocol) is perhaps the most popular application protocol used in the World Wide Web
* HTTP is an request-response client-server protocol:
    1. An HTTP client sends a request message to an HTTP server
    2. The server, in turn, returns a response message

---

#### HTTP is Stateles

* HTTP is a stateless protocol. In other words, the current request does not know what has been done in the previous requests
* Each request has **ALL** information necessary to make the request; the server does need to have any memory of previous requests to full a new request

---

#### Your Browser

* Whenever you issue a URL from your browser to get a web resource using HTTP, e.g. http://www.nowhere123.com/index.html, the browser turns the URL into a request message and sends it to a server the "speaks" HTTP
* The HTTP server interprets the request message, and returns you an appropriate response message, which is either the resource you requested or an error message. This process is illustrated below:

![http example](https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/images/HTTP_Steps.png)

---

#### Uniform Resource Locator

* U - an agreed upon standard that many people know how to speak
* R - some thing on the web that you'd want to request
* L - this is a unique identifier that helps you locate a resource 

---

#### URL's

* A URL (Uniform Resource Locator) is used to uniquely identify a resource (e.g., web page, audio file) over the web. URL has the following syntax:

`protocol://hostname:port/path-and-file-name`

---

#### URL's: A Second Look


![url](https://docs.google.com/drawings/d/1raO7TFBsutwWHavSEX6BuF-W6wI-kHalyQStTnAKi-k/pub?w=721&h=176)


Element | About
------|--------
protocol | the most popular application protocol used on the world wide web is HTTP. Other familiar types of application protocols include FTP, SSH, GIT, FILE, HTTPS
host/domain name | the host or domain name is looked up in DNS to find the IP address of the host - the server that's providing the resource
path | web servers can organize resources into what is effectively files in directories; the path indicates to the server which file from which directory the client wants
query-string | the client can pass parameters to the server through the query-string (in a GET request method); the server can then use these to customize the response - such as values to filter a search result
hash/fragment | the URI fragment is generally used by the client to identify some portion of the content in the response; interestingly, a broken hash will not break the whole link - it isn't the case for the previous elements

---

#### IP Addresses and URLs

* URLs and IP addresses refer to the same resource
* URLs are simply "human friendly" IP addresses
    - `apple.com` vs. `17.172.224.47`
* When you type in a URL it first gets converted to an IP address by Domain Name Servers; this is called a "DNS lookup"

---

#### Verbs

* URLs reveal the *identity* of the particular host with which we want to communicate, but the *action* that should be performed on the host is specified via HTTP verbs
* HTTP verbs tells us what *action* to perform on a host


---

The most commonly used request verbs are:

* `GET`: fetch an existing resource. The URL should contain all the necessary information the server needs to locate and return the resource.
* `POST`: create a new resource. POST requests usually carry a **payload** that specifies the data for the new resource.
* `PUT`: update an existing resource. The payload may contain the updated data for the resource.
* `DELETE`: delete an existing resource.

The above four verbs are the most popular, and most tools and frameworks explicitly expose these request verbs.

---

## Quiz

Let's say I was building a web application and I want to list the names of all customers in my customer database. What HTTP verb should I use?

---

## Quiz

Let's say I was building a web application and had a Users table in my database. What HTTP verb should I use when a user wants to update their contact information?

---

An HTTP Request and Response is composed of 2 main parts:

* A **header** usually contains meta-data about an HTTP request/response
    - A header is comprised of multiple fields; each header field consists of a name followed by a colon (`:`) 
* The **body** can either be empty or contain the data being transferred


### Status Codes

* With URLs and verbs, the client can initiate requests to the server. In return, the server responds with **status codes** and message payloads.
* The status code is important and tells the client how to interpret the server response. The HTTP specification defines certain number ranges for specific types of responses:

---

#### 2xx: Successful

* This tells the client that the request was successfully processed. The most common code is `200 OK`. 
* For a `GET` request the server sends the resource in the message body. 
* Another relatively less common `2xx` response code is `202 Accepted`
    - A `202` response code says that the request was accepted but may not include the resource in the response. This is useful for async processing on the server side. The server may choose to send information for monitoring.


---

#### 3xx: Redirection

* This requires the client to take additional action. The most common use-case is to jump to a different URL in order to fetch the resource.
* `301 Moved Permanently`: the resource is now located at a new URL.
* `303 See Other`: the resource is temporarily located at a new URL. 
* 304 Not Modified: the server has determined that the resource has not changed and the client should use its cached copy. This relies on the fact that the client is sending ETag (Enttity Tag) information that is a hash of the content. The server compares this with its own computed ETag to check for modifications.

---

#### 4xx: Client Error
* These codes are used when the server thinks that the client is at fault, either by requesting an invalid resource or making a bad request. The most popular code in this class is `404 Not Found`, which I think everyone will identify with. `404` indicates that the resource is invalid and does not exist on the server. The other codes in this class include:
* `400 Bad Request`: the request was malformed.
* `401 Unauthorized`: request requires authentication. The client can repeat the request with the Authorization header. If the client already included the Authorization header, then the credentials were wrong.
* `403 Forbidden`: server has denied access to the resource.
* `404 Resource Not Found`: Resource no longer exists at provided IP address

---

#### 5xx: Server Error

* This class of codes are used to indicate a server failure while processing the request. The most commonly used error code is `500 Internal Server Error`. The others in this class are:
* `501 Not Implemented`: the server does not yet support the requested functionality.
* `503 Service Unavailable`: this could happen if an internal system on the server has failed or the server is overloaded. Typically, the server won't even respond and the request will timeout.

---

### Request and Response Message Formats
- So far, we've seen that URLs, verbs and status codes make up the fundamental pieces of an HTTP request/response pair.

![example](http://i.imgur.com/yjsMrwx.png)

---

### Viewing HTTP Traffic

![chrome](http://i.imgur.com/gsLVSax.png)

- Open DevTools
- browse to the `Network` tab
- view all requests and notice the methods being used and their status codes!

---

## Quiz: Request-Response

Draw out and label the request and response cycle. Make sure to include the following in your diagram:

 * client 
 * server 
 * `GET` Request 
 * Response Status Code of 404 and 202
 
---

## What's in a Request and Response

* Header: meta-data (data about data) about the request or response
* Body: the actual contents of the resource we are requesting.

Let's see this in Postman using http://www.jtamsut.com.

---

## HTTPS

* HTTPS is HTTP + Transport Layer Security Protocol
* TLS is a cryptographic protocol that encrypts your network requests and responses
* Encrypting is the process where we make our requests/responses un-readable to an interceptor

Why would we want to encrypt?

---

### Summary

We reviewed URL structure, verbs and status codes: the three pillars of HTTP communication.

The request and response messages are mostly the same, except for the first line and message headers. Finally, we reviewed how you can modify the request and response headers in web frameworks and libraries.

Understanding HTTP is crucial for having a clean, simple, and RESTful interface between two endpoints. Remember CRUD when thinking of HTTP verbs, and remember status codes for accessing the information of those endpoints.
