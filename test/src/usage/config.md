---
title: Configuration
priority: 10
---

Create a `gwadocs.json` file in the root of your document.

```bash
{
  "project": "My project",
  "src": "path/to/markdown",
  "dest": "path/to/build",
  "collections": {
    "Section": {
      "pattern": "section/**/*.html",
      "sortBy": "priority"
    }
  }
}
```

## Settings

* `project` is the name of the project.
* `src` is the path to the markdown files that contain the documentation.
* `dest` is the path to the directory the compiled documentation should be saved to.
* `collections` defines how the documentation pages are grouped and sorted.

## Collections

In the configuration above, one collection (or section) is defined, called `Section`. The files in the `section` subdeirectory of the `src` directory are added to this collection, sorted by the `priority` metadata setting made in the file itself.
