module.exports = async (tree, pluginOptions) => {
  const { visit } = await import("unist-util-visit");
  const { toString } = await import("mdast-util-to-string");

  visit(tree.markdownAST, "heading", (node) => {
    let { depth } = node;

    // Skip if not an h1
    if (depth !== 1) return;

    // Grab the innerText of the heading node
    let text = toString(node);

    const html = `
        <h1 style="color: rebeccapurple">
          ${text}
        </h1>
      `;

    node.type = "html";
    node.children = undefined;
    node.value = html;
  });

  return tree;
};
