import '../scss/style.scss';
import '../scss/editor.scss';

// Define Variables
const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { RangeControl, PanelBody, ServerSideRender, ToggleControl } = wp.components;
const { Fragment }  = wp.element;
const { withState }  = wp.compose;

// Add Repeater Field 
registerBlockType( 'bzblocks/articletile', {
	title: __('Portfolio Auflistung'), 
	description: 'Dies ist Artikel Auflistung für die Programmierabstimmung',
	category: 'bzblocks',
	icon: {
		background: '#2478bd',
		foreground: '#ffffff',
		src: 'feedback',
	},
	keywords: [
		__( 'icon' ),
		__( 'pr' ), 
		__( 'symbol' )
	],
	supports: {
		align: true,
		html: false
	},
	attributes: {

		// Number of Posts 
		anzahlposts: {
			type: 'number', 
			default: 3
		},

		// Number of Posts 
		paginationdisplay: {
			type: 'boolean', 
			default: true
		}
	},

	edit: ( { attributes, setAttributes, className } ) => {

		// Output
		return [
			<Fragment>
				<InspectorControls>
					<PanelBody
						title="Portfolio Einstellungen"
						initialOpen={ true }>

						<RangeControl
							label="Gesamtzahl der Portfolio Beiträge"
							value={ attributes.anzahlposts }
							onChange={  ( event ) =>  {   
											setAttributes( { anzahlposts: event } );  
										} 
									} 
							min={ 1 }
							max={ 6 }
						/>
						<h4>
						Erweiterte Einstellungen
						</h4>

						<ToggleControl 
							label='Pagination anzeigen'
							checked={ attributes.paginationdisplay }
							onChange={ (event) => { setAttributes( { paginationdisplay: event }) } } 
						/>

					</PanelBody>
				</InspectorControls>

				<section className={'page-section page-section-articletile global-margin '  + className }>
					<ServerSideRender 
						block="bzblocks/articletile"
						attributes={ attributes } 
					/>
				</section>
			</Fragment>
		]
	},
	
	save: ( props ) => {
		return null;
	}
});