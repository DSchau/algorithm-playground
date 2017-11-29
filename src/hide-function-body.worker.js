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
    if (node.type === 'FunctionDeclaration') {
      const replaced = acorn.parse(`function ${node.id.name}() {}`, ACORN_OPTS);
      replaced.params = node.params;
      replacements.push([
        escodegen.generate(node),
        escodegen.generate(replaced, ESCODEGEN_OPTS)
      ]);
    } else if (
      node.type === 'ExportNamedDeclaration' ||
      node.type === 'ExportDefaultDeclaration'
    ) {
      const replaced = acorn.parse(
        `export ${(node.type === 'ExportDefaultDeclaration' && 'default') ||
          ''} function ${node.declaration.id.name}(arr) { return arr; }`,
        ACORN_OPTS
      );
      replaced.params = node.declaration.params;
      replacements.push([
        escodegen.generate(node),
        escodegen.generate(replaced, ESCODEGEN_OPTS)
      ]);
    }
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
