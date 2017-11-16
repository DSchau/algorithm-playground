import * as buble from 'buble';
import * as acorn from 'acorn';
import * as walk from 'acorn/dist/walk';

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

const getName = node => {
  switch (node.declaration.type) {
    case 'FunctionExpression':
      return node.declaration.id.name;
    case 'VariableDeclaration':
      return node.declaration.declarations[0].id.name;
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
      postMessage(exportedFn);
    } catch (e) {
      console.warn(e);
    }
  };
}

export default () => {};
