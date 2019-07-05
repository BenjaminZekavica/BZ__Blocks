import '../scss/style.scss';
import '../scss/editor.scss';

// Define Variables
const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText, PanelColorSettings, MediaPlaceholder } = wp.editor;
const { PanelBody, Button, SelectControl } = wp.components;
const { withState } = wp.compose;
const { Fragment } = wp.element;


// Add Repeater Field 
registerBlockType( 'bzblocks/featureblock', {
	title: __('Feature Block'), 
	description: 'Dies ist Featureblock für die Programmierabstimmung',
	category: 'bzblocks',
	icon: {
		background: '#2478bd',
		foreground: '#ffffff',
		src: 'editor-table',
	},
	keywords: [
		__( 'feature'),
		__( 'highlights')
	],
	supports: {
		align: true,
		html: false
	},

	attributes: {

		// Featured Contents
		featuredtext: {
			selector: '.page-section-featurebox__item--content'
		},

		featuredheadline: {
			selector: '.page-section-featurebox__item--headline'
		},

		// Featured Color Settings
		featureContentColor: {
			type: 'string',
			default: '#222832',
		},

		// Featured BG Color Settings
		featureBackgroundColor: {
			type: 'string',
			default: '#f0dd00',
		},

		// Upload Image
		ImageMediaURL: {
			type: 'string'
		},

		// Select List Background Type 
		SelectBackgroundType: {
			type: 'string'
		}

	},

	edit: ( { attributes, setAttributes, className } ) => {

		// Featured Details Text   
		const FeaturedText = (e) => {
			setAttributes({
				featuredtext: e
			}); 
		}

		// Featured Headline 
		const FeaturedHeadline = (e) => {
			setAttributes({
				featuredheadline: e
			}); 
		}

		// Team Image Select
		const onSelectImage = ( media ) => {
			setAttributes( {
				ImageMediaURL: media.url
			});
		};

		// Background Image Type
		const BackgroundType = withState( {
				bgtype: 'none',
		} )( ( { bgtype, setState } ) => (

			<PanelBody
					title={__('Hintergrund Art')}
					initialOpen={true} >
					
					<SelectControl
						label='Bitte treffen Sie eine Auswahl.'
						value={ attributes.SelectBackgroundType }
						options={ [
							{ value: 'none', label: 'Kein Hintergrund' },
							{ value: 'bgcolor', label: 'Hintergrund Farbe' },
							{ value: 'bgimage', label: 'Hintergrund Bild' },
						] }
						onChange={ ( bgtype ) => { 
								setState( { bgtype } );
								setAttributes( { SelectBackgroundType: bgtype } );
							} 
						}
					/>
			</PanelBody>

		));

		// Output
		return [
		 <Fragment>
		  	<InspectorControls>

				{/*  Background Type Select List */ }
				<BackgroundType />

				{/*  Color - Setting  */ }
				{ (attributes.SelectBackgroundType === 'bgcolor') ?
					<PanelColorSettings
						title={ __( 'Farben' ) }
						initialOpen={false} 
						colorSettings={ [

							// Background color
							{
								value: attributes.featureBackgroundColor,
								onChange: ( BgcolorValue ) => setAttributes( { 
											featureBackgroundColor: BgcolorValue
										}),
								label: __( 'Hintergrundfarbe' ),
								default: '#f0dd00'
							},

							// Content color
							{
								value: attributes.featureContentColor,
								onChange: ( colorValue ) => setAttributes( { 
											featureContentColor: colorValue 
										}),
								label: __( 'Textfarbe' ),
								default: '#222832'
							}, 

						] }>
					</PanelColorSettings> 
					
					: ''
				}			
		
				{/*  Image Upload - Setting  */ }
				{ (attributes.SelectBackgroundType === 'bgimage') ?
					<PanelBody
						title={__('Hintergrund Bild')}
						initialOpen={false}>
							<section className="page-section-setting__image">
								<MediaPlaceholder 
									labels = { { title: 'Hintergrundbild' } }
									allowedTypes = { [ 'image' ] }
									multiple = { false }
									onSelect = {
										onSelectImage
									}
								/>
							</section>
					</PanelBody> 
					
					: ''
				}
			</InspectorControls>

			<section 
				style={ 
					{ 	
						color: attributes.featureContentColor, 
						backgroundColor: attributes.featureBackgroundColor 
					} 
				 }
				 className={'page-section page-section-featurebox global-margin' + className }>
					<div className="page-section-featurebox__wrapper">
						<div className="page-section-featurebox__item">
							<div className="page-section-featurebox__item--headline global-margin">
								<RichText
									style={ { color: attributes.featureContentColor } }
									placeholder="Feature Box Headline"
									tagName="h2"
									value={ attributes.featuredheadline }
									onChange={ FeaturedHeadline }
								/>
							</div>
							<RichText
								placeholder="Feature Box Beschreibung"
								tagName="div"
								className="page-section-featurebox__item--content global-margin"
								value={ attributes.featuredtext }
								onChange={ FeaturedText }
							/>
						</div>
					</div>
			</section>
		</Fragment>
		]
	},
	
	save: ( props ) => {

		// Import all Attr
		const {
			attributes: {
				featuredtext,
				featuredheadline, 
				featureContentColor, 
				featureBackgroundColor,
				featureHeadlineColor, 
				ImageMediaURL
			}, className
		} = props; 

		return (
			<section 
				
				style={ 
					{ 	color: props.attributes.featureContentColor, 
						backgroundColor: props.attributes.featureBackgroundColor 
					} 
				}
				className={ 'page-section page-section-featurebox global-margin' + className }>
				<div className="page-section-featurebox__wrapper">
					<div className="page-section-featurebox__item">
						<div className="page-section-featurebox__item--icon">
					  		<img src={ props.attributes.ImageMediaURL} />
						</div>
						<div className="page-section-featurebox__item--headline">
							<RichText.Content
								style={ { color: props.attributes.featureContentColor } }
								placeholder="Feature Box Headline"
								tagName="h2"
								className="page-section-featurebox__item--headline"
								value={ props.attributes.featuredheadline }
							/>
						</div>
						<RichText.Content
							placeholder="Feature Box Beschreibung"
							tagName="div"
							className="page-section-featurebox__item--content"
							value={ props.attributes.featuredtext }
						/>
					</div>
				</div>
			</section>
		);
	}
});