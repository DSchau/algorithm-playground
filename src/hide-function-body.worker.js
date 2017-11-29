// @flow
import * as buble from 'buble';
import * as acorn from 'acorn';
import * as escodegen from 'escodegen';

declare var self: DedicatedWorkerGlobalScope;

const ACORN_OPTS = {
  sourceType: 'module'
};
const ESCODEGEN_OPTS = {
  format: {
    indent: {
      style: '  '
    }
  }
};

const replace = (node: acorn.Node) => {
  const isExport =
    node.type === 'ExportNamedDeclaration' ||
    node.type === 'ExportDefaultDeclaration';
  const base = isExport ? node.declaration : node;
  const replaced = [
    isExport
      ? `export` +
        ((node.type === 'ExportDefaultDeclaration' && ` default`) || '')
      : '',
    `function`,
    base.id.name,
    `(${(isExport && 'arr') || ''}) {
      ${(isExport && 'return arr') || ''}
    }`
  ].join(' ');
  return [
    escodegen.generate(node),
    escodegen.generate(acorn.parse(replaced, ACORN_OPTS), ESCODEGEN_OPTS)
  ];
};

const removeFunctionBody = code => {
  let comments = [];
  let tokens = [];
  let replacements = [];
  let ast = acorn.parse(code, {
    onComment: comments,
    okToken: tokens,
    ranges: true,
    ...ACORN_OPTS
  });
  ast.body.slice(0).forEach(node => {
    replacements.push(replace(node));
  });
  escodegen.attachComments(ast, comments, tokens);
  return replacements.reduce(
    (replaced: string, [block, emptyBlock]: string[]) => {
      return replaced.replace(block, `${emptyBlock}\n`);
    },
    escodegen.generate(ast, {
      comment: true
    })
  );
};

if (typeof onmessage !== 'undefined') {
  onmessage = ev => {
    const { data } = ev;
    const { code } = data;
    let removed = code;
    try {
      removed = removeFunctionBody(code);
    } catch (e) {
      console.warn(e);
    }
    self.postMessage(removed);
  };
}

export default () => {};
