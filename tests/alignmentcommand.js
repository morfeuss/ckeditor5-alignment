/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import AlignmentCommand from '../src/alignmentcommand';

import { getData as getModelData, setData as setModelData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';

import Command from '@ckeditor/ckeditor5-core/src/command';
import ModelTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/modeltesteditor';

describe( 'AlignmentCommand', () => {
	let editor, model, command, defaultAlignmentCommand;

	beforeEach( () => {
		return ModelTestEditor.create()
			.then( newEditor => {
				model = newEditor.model;
				command = new AlignmentCommand( newEditor, 'center', false );
				defaultAlignmentCommand = new AlignmentCommand( newEditor, 'left', true );
				editor = newEditor;

				editor.commands.add( 'alignCenter', command );
				editor.commands.add( 'alignLeft', defaultAlignmentCommand );

				model.schema.register( 'paragraph', { inheritAllFrom: '$block' } );
				model.schema.extend( '$block', { allowAttributes: 'alignment' } );
			} );
	} );

	afterEach( () => {
		editor.destroy();
	} );

	it( 'is a command', () => {
		expect( AlignmentCommand.prototype ).to.be.instanceOf( Command );
		expect( command ).to.be.instanceOf( Command );
	} );

	describe( 'value', () => {
		it( 'is true when selection is in block with command type alignment', () => {
			setModelData( model, '<paragraph alignment="center">x[]x</paragraph>' );

			expect( command ).to.have.property( 'value', true );
		} );

		it( 'is false when selection is inside block that has different alignment', () => {
			setModelData( model, '<paragraph alignment="justify">x[]x</paragraph>' );

			expect( command ).to.have.property( 'value', false );
		} );

		it( 'is true when selection is in block with default alignment', () => {
			setModelData( model, '<paragraph>x[]x</paragraph>' );

			expect( defaultAlignmentCommand ).to.have.property( 'value', true );
		} );

		it( 'is false when selection is inside block that has different alignment (default option)', () => {
			setModelData( model, '<paragraph alignment="justify">x[]x</paragraph>' );

			expect( defaultAlignmentCommand ).to.have.property( 'value', false );
		} );
	} );

	describe( 'isEnabled', () => {
		it( 'is true when selection is in a block which can have added alignment', () => {
			setModelData( model, '<paragraph>x[]x</paragraph>' );

			expect( command ).to.have.property( 'isEnabled', true );
		} );
	} );

	describe( 'execute()', () => {
		describe( 'applying alignment', () => {
			it( 'adds alignment to block element', () => {
				setModelData( model, '<paragraph>x[]x</paragraph>' );

				editor.execute( 'alignCenter' );

				expect( getModelData( model ) ).to.equal( '<paragraph alignment="center">x[]x</paragraph>' );
			} );

			it( 'should remove alignment from single block element if already has one', () => {
				setModelData( model, '<paragraph alignment="center">x[]x</paragraph>' );

				editor.execute( 'alignCenter' );

				expect( getModelData( model ) ).to.equal( '<paragraph>x[]x</paragraph>' );
			} );

			it( 'adds alignment to all selected blocks', () => {
				setModelData( model, '<paragraph>x[x</paragraph><paragraph>xx</paragraph><paragraph>x]x</paragraph>' );

				editor.execute( 'alignCenter' );

				expect( getModelData( model ) ).to.equal(
					'<paragraph alignment="center">x[x</paragraph>' +
					'<paragraph alignment="center">xx</paragraph>' +
					'<paragraph alignment="center">x]x</paragraph>'
				);
			} );

			it( 'sets alignment on all selected blocks as first block', () => {
				setModelData(
					model,
					'<paragraph>x[x</paragraph>' +
					'<paragraph >xx</paragraph>' +
					'<paragraph alignment="center">x]x</paragraph>'
				);

				editor.execute( 'alignCenter' );

				expect( getModelData( model ) ).to.equal(
					'<paragraph alignment="center">x[x</paragraph>' +
					'<paragraph alignment="center">xx</paragraph>' +
					'<paragraph alignment="center">x]x</paragraph>'
				);
			} );
		} );

		describe( 'applying default alignment', () => {
			it( 'removes alignment from block element', () => {
				setModelData( model, '<paragraph alignment="justify">x[]x</paragraph>' );

				editor.execute( 'alignLeft' );

				expect( getModelData( model ) ).to.equal( '<paragraph>x[]x</paragraph>' );
			} );

			it( 'removes alignment from all selected blocks', () => {
				setModelData( model,
					'<paragraph alignment="center">x[x</paragraph>' +
					'<paragraph alignment="center">xx</paragraph>' +
					'<paragraph alignment="center">x]x</paragraph>'
				);

				editor.execute( 'alignLeft' );

				expect( getModelData( model ) ).to.equal(
					'<paragraph>x[x</paragraph><paragraph>xx</paragraph><paragraph>x]x</paragraph>'
				);
			} );

			it( 'removes alignment from all selected blocks even if one has no alignment defined', () => {
				setModelData( model,
					'<paragraph alignment="center">x[x</paragraph>' +
					'<paragraph>xx</paragraph>' +
					'<paragraph alignment="center">x]x</paragraph>'
				);

				editor.execute( 'alignLeft' );

				expect( getModelData( model ) ).to.equal(
					'<paragraph>x[x</paragraph><paragraph>xx</paragraph><paragraph>x]x</paragraph>'
				);
			} );
		} );
	} );
} );
