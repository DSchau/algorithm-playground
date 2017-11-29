// @flow
import * as buble from 'buble';
import * as acorn from 'acorn';
import * as walk from 'acorn/dist/walk';

declare var self: DedicatedWorkerGlobalScope;

const getTypeValue = node => {
  switch (node.declaration.type) {
    case 'FunctionExpression':
      return '';
    case 'VariableDeclaration':
      return node.declaration.kind;
    default:
      return '';
  }
};

const transformLastExportToReturn = code => {
  let defaultExport;
  let lastExport;
  walk.simple(
    acorn.parse(code, {
      sourceType: 'module'
    }),
    {
      ExportDefaultDeclaration(node) {
        defaultExport = 'export default';
      },
      ExportNamedDeclaration(node) {
        lastExport = [`export`, getTypeValue(node)].join(' ');
      }
    }
  );
  const statement = defaultExport || lastExport;
  return code.replace(statement, 'return ');
};

if (typeof onmessage !== 'undefined') {
  onmessage = ev => {
    const { data } = ev;
    const { code } = data;
    try {
      const { code: transformed } = buble.transform(code, {
        transforms: {
          modules: false,
          templateString: false
        },
        sourcemap: false
      });
      const exportedFn = transformLastExportToReturn(transformed);
      self.postMessage(exportedFn);
    } catch (e) {
      console.warn(e);
    }
  };
}

export default () => {};
