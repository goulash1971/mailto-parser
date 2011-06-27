mail-parser - Module for MailTo parsing
===========

### Overview

MailTo-Parser is a module that provides functions for parsing `mailto:` URLs that is loosly based upon the standard 
`url` module within `node`.  Parsing is derived from the **excellent** `parseUri` function by 
[Steven Levithan](http://stevenlevithan.com), but stripped down for the `mailto` scheme.

#### What's a `mailto:` URL?

The best place to start if you want to know more about `mailto:` UTRLs (of course) the wikipedia article on
[MailTo](http://en.wikipedia.org/wiki/Mailto) and [MailTo Syntax](http://www.ianr.unl.edu/internet/mailto.html).

### Installation
	npm install mailto-parser

### Using the Module
The 'mailto-parser' module is accessed in the standard way by calling `require("mailto-parser");` and once loaded 
you have access to the following objects and functions.

#### Class `mailto-parser.Parser`
The `Parser` class is a wrapper object class that provides access to an object that can be 
used to parse `mailto:` instances.

This class has the following interface:

##### Constructor `Parser(options)`
Creates a new instance with the specified options

##### Method `Parser.parse(mailtoStr, strictMode)`
Parses an MailTo into components (optionally in *strict* mode)

##### Method `Parser.complete(obj)`
Creates a *complete* MailTo definition from its components

##### Method `Parser.format(obj)`
Formats an MailTo definition into a well-formed MailTo string

#### Function `mailto-parser.parse`
The `parse` function is a proxy to the `Parser.parse(mailtoStr, strictMode)` method on a singleton `Parser`
instance that is created for the module.

#### Function `mailto-parser.complete`
The `complete` function is a proxy to the `Parser.complete(obj)` method on a singleton `Parser`
instance that is created for the module.

#### Function `mailto-parser.format`
The `format` function is a proxy to the `Parser.format(obj)` method on a singleton `Parser`
instance that is created for the module.

### Contributors
- [Stuart Hudson](https://github.com/goulash1971)

### License
MIT License

### Acknowledgements
- [Steven Levithan](http://stevenlevithan.com) for the `parseUri` function that is the basis of this module

---
### Author
Stuart Hudson		 

