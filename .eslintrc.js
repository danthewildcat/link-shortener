module.exports = {
  extends: [
    'airbnb',
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
    'plugin:flowtype/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  plugins: [
    // https://github.com/benmosher/eslint-plugin-import
    'import',

    // https://github.com/dustinspecker/eslint-plugin-no-use-extend-native
    'no-use-extend-native',

    // https://github.com/bryanrsmith/eslint-plugin-prefer-object-spread
    'prefer-object-spread',

    // https://github.com/xjamundx/eslint-plugin-promise
    'promise',

    // https://github.com/sindresorhus/eslint-plugin-unicorn
    'unicorn',

    // https://flow.org
    'flowtype',

    // https://reactjs.org/
    'react',
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
  env: {
    // Don't assume we're targeting either node or a browser.
    // These flags might be set by one of our plugins.
    node: true,
    browser: false,
    // But it's reasonable to assume we're targeting one or the other.
    'shared-node-browser': true,
  },
  rules: {
    // ---------------------- Base --------------------- //
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: false,
    }],
    'callback-return': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    'func-name-matching': ['warn', 'always'],
    'func-style': ['error', 'declaration', {
      allowArrowFunctions: true,
    }],
    'function-paren-newline': ['error', 'consistent'],

    'import/no-extraneous-dependencies': ['error', {
      devDependencies: false,
      optionalDependencies: false,
    }],

    'import/unambiguous': 'off',

    indent: ['error', 2],
    'max-len': ['error', 120, 2, {
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
    }],
    'no-else-return': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      // airbnb restricts "ForOfStatement" but it's fine and often easier to
      // read than a forEach((foo) => {}) arrow.
      'LabeledStatement',
      'WithStatement',
    ],
    'no-sync': 'warn',
    'no-unused-vars': ['error', {
      args: 'after-used',
      argsIgnorePattern: '_+',
    }],
    'no-underscore-dangle': ['error', {
      // Allow underscores to indicate private members.
      allowAfterThis: true,
      allowAfterSuper: true,
    }],
    'object-curly-spacing': ['error', 'never'],
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: {
          minProperties: 0,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: 0,
          multiline: true,
          consistent: true,
        },
        // We don't want to enforce newlines on destructuring:
        ObjectExpression: {
          minProperties: 0,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 0,
          multiline: true,
          consistent: true,
        },
      },
    ],

    semi: ['error', 'always'],

    // Don't screw with native classes.
    'no-use-extend-native/no-use-extend-native': 'error',

    // Prefer spread over Object.assign().
    'prefer-object-spread/prefer-object-spread': 'error',

    // When you say "if (!foo.length)", we know what you mean.
    'unicorn/explicit-length-check': 'off',

    // Sometimes we want to catch 'e'. Sometimes we want to catch 'err'.
    'unicorn/catch-error-name': 'off',

    'promise/always-return': 'error',

    // Bluebird now says:
    // >  Promise.defer is deprecated and will be removed in a future version.
    // >  Use new Promise instead.
    'promise/avoid-new': 'off',

    // Promises must be returned or errors handled. This avoids swallowing errors.
    //   Note that there are some options for this rule:
    //   https://github.com/xjamundx/eslint-plugin-promise#allowthen
    'promise/catch-or-return': 'error',
    'promise/no-callback-in-promise': 'error',
    // Using native Promise (versus importing from Bluebird) is ok.
    //   TODO: We may want to consider turning this on since we use Bluebird in most projects.
    'promise/no-native': 'off',
    'promise/no-nesting': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'promise/prefer-await-to-then': 'error',


    // ---------------------- FlowType --------------------- //
    // The eslint-plugin-import rule correctly handles the fact that
    // 'import type {} from foo' and 'import {} from foo {}' are not
    // duplicate imports. The builtin no-duplicate-imports rule does not.
    // https://github.com/babel/eslint-plugin-babel/issues/59
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
    'import/no-duplicates': 'error',
    'no-duplicate-imports': 'off',

    // This rule otherwise prevents type declarations like:
    // type Foo =
    //   | A
    //   | B
    //   ;
    'semi-style': 'off',

    // `flow gen-flow-files` as of version 0.37.4 generates invalid code for a
    // default exports:
    //   https://github.com/facebook/flow/issues/2830
    //
    // The invalid generated code starts with a line that looks like:
    //    declare export default class { … }
    //
    'import/prefer-default-export': 'off',

    // Derived from plugin/flowtype:recommended
    'flowtype/boolean-style': [
      'error',
      'boolean',
    ],
    'flowtype/define-flow-type': 'warn',
    'flowtype/delimiter-dangle': [
      'error',
      'always-multiline',
    ],
    'flowtype/generic-spacing': [
      'error',
      'never',
    ],
    // This rule is buggy:
    // https://github.com/gajus/eslint-plugin-flowtype/pull/302
    'flowtype/no-dupe-keys': 'off',
    'flowtype/no-primitive-constructor-types': 'error',
    'flowtype/no-weak-types': 'off', // …

    // We would like to use commas for object types and
    // semicolon for class/interface types, but that isn't
    // an option currently.
    'flowtype/object-type-delimiter': 'off',

    'flowtype/require-parameter-type': 'off',
    'flowtype/require-return-type': [
      'error',
      'always', {
        excludeArrowFunctions: 'expressionsOnly',
        annotateUndefined: 'never',
      },
    ],

    'flowtype/require-valid-file-annotation': [
      'error',
      'always', {
        annotationStyle: 'block',
      },
    ],
    'flowtype/semi': ['error', 'always'],
    'flowtype/sort-keys': 'off',
    'flowtype/space-after-type-colon': [
      'error',
      'always',
    ],
    'flowtype/space-before-generic-bracket': [
      'error',
      'never',
    ],
    'flowtype/space-before-type-colon': [
      'error',
      'never',
    ],
    'flowtype/type-id-match': [
      'error',
      '^([A-Z][A-Za-z0-9]*)$',
    ],
    'flowtype/union-intersection-spacing': [
      'error',
      'always',
    ],
    'flowtype/use-flow-type': 'warn',
    'flowtype/valid-syntax': 'warn',


    // ---------------------- React --------------------- //
    'import/extensions': 'warn',
    'jsx-quotes': 'warn',
    'react/display-name': 'off',
    'react/forbid-prop-types': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'react/jsx-curly-spacing': 'warn',
    'react/jsx-equals-spacing': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-handler-names': 'warn',
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-key': 'warn',
    'react/jsx-max-props-per-line': ['warn', {maximum: 2}],
    'react/jsx-no-bind': 'warn',
    'react/jsx-no-duplicate-props': 'warn',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-undef': 'warn',
    'react/jsx-pascal-case': 'warn',
    'react/sort-prop-types': 'warn',
    'react/jsx-sort-props': 'warn',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    'react/no-danger': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'react/no-did-update-set-state': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/no-is-mounted': 'warn',
    'react/no-multi-comp': ['warn', {ignoreStateless: true}],
    'react/no-set-state': 'off',
    'react/no-string-refs': 'warn',
    'react/no-unknown-property': 'warn',
    'react/prefer-es6-class': 'warn',
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/self-closing-comp': 'warn',
    'react/sort-comp': ['warn', {
      order: [
        '/^.+Store$/',
        'type-annotations',
        'lifecycle-defs',
        'static-methods',
        'everything-else',
        'lifecycle',
        'behavior-defs',
        'render-defs',
      ],
      groups: {
        'lifecycle-defs': [
          'mixins',
          'displayName',
          'statics',
          'getStores',
          'contextTypes',
          'propTypes',
          'defaultProps',
          'getDefaultProps',
          'props',
          'getInitialState',
          'state',
          'childContextTypes',
          'getChildContext',
        ],
        lifecycle: [
          'constructor',
          'componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'calculateState',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'componentDidUpdate',
          'componentWillUnmount',
        ],
        'behavior-defs': [
          '/^_?on.+$/',
          '/^_?handle.+$/',
        ],
        'render-defs': [
          '/^_?render.+$/',
          'render',
        ],
      },
    }],
  },
  globals: {
    // Extracted from `scripts/get-flow-globals --base`
    $All: false,
    $Call: false,
    $CharSet: false,
    $Compose: false,
    $ComposeReverse: false,
    $Diff: false,
    $Either: false,
    $ElementType: false,
    $Enum: false,
    $Exact: false,
    $Exports: false,
    $Facebookism$Idx: false,
    $Facebookism$Merge: false,
    $Facebookism$MergeDeepInto: false,
    $Facebookism$MergeInto: false,
    $Facebookism$Mixin: false,
    $Flow$DebugPrint: false,
    $Flow$DebugSleep: false,
    $Flow$DebugThrow: false,
    $Keys: false,
    $NonMaybeType: false,
    $ObjMap: false,
    $ObjMapi: false,
    $Pred: false,
    $PropertyType: false,
    $ReadOnly: false,
    $ReadOnlyArray: false,
    $Refine: false,
    $Rest: false,
    $Shape: false,
    $Subtype: false,
    $Supertype: false,
    $SymboIsConcatSpreadable: false,
    $SymbolHasInstance: false,
    $SymbolIterator: false,
    $SymbolMatch: false,
    $SymbolReplace: false,
    $SymbolSearch: false,
    $SymbolSpecies: false,
    $SymbolSplit: false,
    $SymbolToPrimitive: false,
    $SymbolToStringTag: false,
    $SymbolUnscopables: false,
    $TupleMap: false,
    $Type: false,
    $TypedArray: false,
    $Values: false,
    CallSite: false,
    Function$Prototype$Apply: false,
    Function$Prototype$Bind: false,
    Function$Prototype$Call: false,
    Object$Assign: false,
    Object$GetPrototypeOf: false,
    Object$SetPrototypeOf: false,


    // React
    $JSXIntrinsics: false,
    LegacyReactComponent: false,
    React$CloneElement: false,
    React$Component: false,
    React$ComponentType: false,
    React$CreateClass: false,
    React$CreateElement: false,
    React$Element: false,
    React$ElementConfig: false,
    React$ElementFactory: false,
    React$ElementProps: false,
    React$ElementRef: false,
    React$ElementType: false,
    React$Key: false,
    React$Node: false,
    React$PropType$ArrayOf: false,
    React$PropType$InstanceOf: false,
    React$PropType$ObjectOf: false,
    React$PropType$OneOf: false,
    React$PropType$OneOfType: false,
    React$PropType$Primitive: false,
    React$PropType$Shape: false,
    React$PureComponent: false,
    React$Ref: false,
    React$StatelessFunctionalComponent: false,
    SyntheticAnimationEvent: false,
    SyntheticClipboardEvent: false,
    SyntheticCompositionEvent: false,
    SyntheticDragEvent: false,
    SyntheticEvent: false,
    SyntheticFocusEvent: false,
    SyntheticInputEvent: false,
    SyntheticKeyboardEvent: false,
    SyntheticMouseEvent: false,
    SyntheticTouchEvent: false,
    SyntheticTransitionEvent: false,
    SyntheticUIEvent: false,
    SyntheticWheelEvent: false,
  },
};
