---
title: Text alignment
category: features
---

{@snippet features/build-text-alignment-source}

The {@link module:alignment/alignment~Alignment} feature enables support for text alignment. You can use it to align your content to left, right and center or justify it. 

## Demo

{@snippet features/text-alignment}

## Configuring alignment options

It is possible to configure which alignment options are available in the editor by setting the {@link module:alignment/alignment~AlignmentConfig#options `alignment.options`} configuration option. You can choose from `'left'`, `'right'`, `'center'` and `'justify'`;  note that `'left'` should always be included.

For example, the following editor will support only two alignment options: to the left and to the right:

```js
ClassicEditor
	.create( document.querySelector( '#editor' ), {
		alignment: {
			options: [ 'left', 'right' ]
		},
		toolbar: [
			'headings', '|', 'bulletedList', 'numberedList', 'alignmentDropdown', 'undo', 'redo'
		]
	} )
	.then( ... )
	.catch( ... );
```

{@snippet features/custom-text-alignment-options}

## Configuring the toolbar

You can choose to use the alignment drop-down (`'alignmentDropdown'`) or configure the toolbar to use separate buttons for each of the options:

```js
ClassicEditor
	.create( document.querySelector( '#editor' ), {
		toolbar: [
			'headings', '|', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify'
		]
	} )
	.then( ... )
	.catch( ... );
```

{@snippet features/custom-text-alignment-toolbar}

## Installation

To add this feature to your editor install the [`@ckeditor/ckeditor5-alignment`](https://www.npmjs.com/package/@ckeditor/ckeditor5-alignment) package:

```
npm install --save @ckeditor/ckeditor5-alignment
```

And add it to your plugin list and toolbar configuration:

```js
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Alignment, ... ],
		toolbar: [ 'alignmentDropdown', ... ]
	} )
	.then( ... )
	.catch( ... );
```

<info-box info>
	Read more about {@link builds/guides/development/installing-plugins installing plugins}.
</info-box>

## Common API

The {@link module:alignment/alignment~Alignment} plugin registers:

* Drop-down: `'alignmentDropdown'`.
* Buttons and commands: `'alignLeft'`, `'alignRight'`, `'alignCenter'`, `'alignJustify'`.

	The number of options and their names are based on the {@link module:alignment/alignment~AlignmentConfig#options `alignment.options`} configuration option).

	You can align the currently selected block(s) by executing one of these commands:

	```js
	editor.execute( 'alignCenter' );
	```

## Contribute

The source code of the feature is available on GitHub in https://github.com/ckeditor/ckeditor5-alignment.
