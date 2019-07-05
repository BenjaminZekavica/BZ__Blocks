import '../scss/style.scss';
import '../scss/editor.scss';

// Define Variables
const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, RichText, PanelColorSettings } = wp.editor;
const { PanelBody, Button, Modal, Dashicon, Placeholder, TextControl, ScrollLock} = wp.components;
const { Fragment } = wp.element;
const { withState }  = wp.compose;

// Add Repeater Field 
registerBlockType( 'bzblocks/iconpicker', {
	title: __('Icon Picker'), 
	description: 'Dies ist Iconpicker für die Programmierabstimmung',
	category: 'bzblocks',
	icon: {
		background: '#2478bd',
		foreground: '#ffffff',
		src: 'wordpress',
	},
	keywords: [
		__( 'icon' ),
		__( 'pr' ), 
		__( 'symbol' )
	],

	edit: ( { attributes, setAttributes } ) => {

		// Output
		return [
			<Fragment>
				<section className="page-section page-section-featurebox global-margin">
					<h4>
					Lorem Ipsum 
					</h4>
				</section>
			</Fragment>
		]
	},
	
	save: ( props ) => {

		// Import all Attr
		const {
		
		} = props; 

		return (
			<section  className="page-section page-section-featurebox global-margin">
				<h4>
					Lorem Ipsum 
				</h4>
			</section>
		);
	}
});