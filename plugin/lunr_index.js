var striptags = require('striptags'),
  marked = require('marked');

var lunr_index = function (options) {
  return function (files, metalsmith, done) {
    var data = [],
      key,
      item,
      output;

    for (key in files) {
      if (!files.hasOwnProperty(key)) {
        continue;
      }

      if (key.substring(key.length - 3) !== '.md') {
        continue;
      }

      item = files[key];

      data.push(
        JSON.stringify({
          id: key.replace('.md', ''),
          title: item.title,
          text: getIndexText(item.contents.toString())
        })
      );
    }

    output = '[' + data.join(', ') + ']';

    files['lunr_index.json'] = {
      contents: output
    };

    done();
  };
};

/**
 * @param {String} str
 * @return {String}
 */
function getIndexText(str) {
  return replaceNewLines(
    striptags(
      marked(str)
    )
  );
}

/**
 * @param {String} str
 * @return {String}
 */
function replaceNewLines(str) {
  return str.replace(/\n/g, ' ');
}

// Expose the plugin
module.exports = lunr_index;
