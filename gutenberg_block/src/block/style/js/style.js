import '../scss/style.scss';
import '../scss/editor.scss';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { withState } = wp.compose; 
const { PanelBody, TextControl } = wp.components;

registerBlockType( 'bzblocks/styling', {
	title: __('Styling Block'), 
	description: 'Dies ist Testblock für die Programmierabstimmung',
	category: 'bzblocks',
	icon: {
		background: '#2478bd',
		foreground: '#ffffff',
		src: 'dashboard',
	},
	keywords: [
		__( 'styling' ),
		__( 'css' ),
		__( 'Gestaltung' ),
		__( 'Farben' ),
	],
	supports: {
		html: false
	},
	edit: ( props ) => {		

		return [
			// Block Settings
			<InspectorControls>
				<PanelBody
					title={__('Block Einstellungen')}
					initialOpen={false} >

						<section className="page-section-setting__textcontrol">
							<TextControl
								className="page-section-setting__textcontrol--content"
								label="Text für den Block hier anpassen."
								placeholder="Geben Sie hier Ihren Text ein."
							/>
						</section>

				</PanelBody>
			</InspectorControls>,

			// Main
			<div className={props.className}>
				<h5>
					Willkommen im Backend!
				</h5>
			</div>
		]
	},
	save: ( props ) => {
		const { className } = props; 
		return (
			<div className={props.className}>
				<h3 className="headline">
					Willkommen im Frontend!
				</h3>
			</div>
		)
	}
});