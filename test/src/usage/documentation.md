---
title: Documentation files
priority: 20
---

Documentation files are simple Markdown files with a header containing metadata:

```markdown
---
title: Documentation files
priority: 20
---

Page content starts here.
```

## Metadata

The page metadata is contained in the header, surrounded by three dashes: `---`.

* The `title` setting is used for both the page title and the title shown in the navigation sidebar.
* The `priority` setting is used to order pages with a collection.

## Content

The documentation itself is written in [Github Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Links to other pages

Links to other pages are relative to the "root path", which is the `src` directory in the [configuration JSON]({{ rootPath }}usage/config).

The link above points to `usage/config.md`, relative to the root path, and is written like this:

<pre class="language-markdown"><code class="language-markdown">directory in the [configurationJSON](&#123;&#123; rootPath &#125;&#125;usage/config).</code></pre>

The _previous_ and _next_ links to sibling pages in a collection are created automatically.
