import '../scss/style.scss';
import '../scss/editor.scss';

// Global Settings
import { prwp_icon } from "../../globals/globals"; 

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, PlainText } = wp.editor;
const { Button, Modal, Dashicon } = wp.components;
const { withState } = wp.compose; 
const { Fragment } = wp.element;

// Add Repeater Field 
registerBlockType( 'bzblocks/sliderrepeater', {
	title: __('Slider Block'), 
	description: 'Dies ist Repeater für die Programmierabstimmung',
	category: 'bzblocks',
	icon: {
		background: '#2478bd',
		foreground: '#ffffff',
		src: 'image-rotate',
	},
	keywords: [
		__( 'wiederholung' ),
		__( 'repeater' ), 
		__( 'slider' )
	],

	attributes: {
		id: {
			source: "attribute",
			selector: ".carousel.slide",
			attribute: "id"
		},
		testimonials: {
			source: "query",
			default: [],
			selector: "blockquote.testimonial",
			query: {
				image: {
					source: "attribute",
					selector: "img",
					attribute: "src"
				},

				index: {
					source: "text",
					selector: "span.testimonial-index"
				},

				content: {
					source: "text",
					selector: "span.testimonial-text"
				},

				author: {
					source: "text",
					selector: "span.testimonial-author span"
				},

				link: {
					source: "text",
					selector: ".testimonial-author-link"
				}
			}
		}
	},


	edit: ( props ) => {
		const { testimonials } = props.attributes;

		if (!props.attributes.id) {
			const id = `testimonial${Math.floor(Math.random() * 100)}`;

			props.setAttributes({
				id
			});
		}

		// Delete Slide -> ( Open Modal )
		const SlideDeleteMessage  = withState( {
			isOpen: false,
		} )( ( { isOpen, setState } ) => (
			<div className="page-section-slider-item__removeslide">
				
				<Button isDefault onClick={ () => setState( { isOpen: true } ) }>
					<Dashicon icon="no-alt" />
				</Button>

				{ isOpen && (
					<Modal
						title="Slide löschen"
						onRequestClose={ () => setState( { isOpen: false } ) } >
						<p>
							Slide wird nun engütlig aus dem Slide enfernt.
						</p>
						<div className="page-section-slider-item__buttongroup">
							<Button 	
								isLarge
								isDefault
								className="slide-cancel"
								onClick={ (event) => setState( { isOpen: false } ) }>
								Abbrechen
							</Button>
							<Button 
								isPrimary
								isLarge
								onClick={ (testimonial) =>  {
									setState( { isOpen: false } );
								}}
							>
								Slide löschen
							</Button>
						</div>
					</Modal>
				) }

			</div>
		));

		// Repeater Content 
		const RepeaterContent = () => {
			return [
				<div className="page-section-slider-item__content--edit flexbox">
					<div className="page-section-slider-item__content--image">
					    <h4>
							Slide bearbeiten
						</h4>
						<Button isDefault isLarge>
							Sliderbild hochladen	
						</Button>
					</div>
				</div>
			];
		}

		// Add Element 
		const testimonialsList = testimonials.sort((a, b) => a.index - b.index).map(testimonial => {
			return [
				<section className="page-section page-section-slider-item global-margin">
					<div className="page-section-slider-item__infotext flexbox">
						<div className="page-section-slider-item__infotext--desc">
							<RepeaterContent />
						</div>
						<div className="page-section-slider-item__infotext--remove-block">
							<SlideDeleteMessage testimonial={testimonial} />
						</div>
					</div>
				</section>
			];
		});	
	
		return [
			<Fragment>
				<div className={props.className}>
					<div className="slider-wrapper__item slider-wrapper__item__append--content global-margin">
						{testimonialsList}
					</div>
					<div className="slider-wrapper__item slider-item__append--button">
						<Button isPrimary isLarge
							className="add-more-testimonial"
							onClick={content =>
								props.setAttributes({
									testimonials: [
										...props.attributes.testimonials,
										{
											index: props.attributes.testimonials.length,
											content: "",
											author: "",
											link: ""
										}
									]
								})
							}
						>Slide hinzufügen
						</Button>
					</div>
				</div>
			</Fragment>
		]
	},
	save: ( props ) => {
		return (
           <div className="test">
			   Test
		   </div>
		);
	}
});


// Set Icon to Block Category PR Module 
wp.blocks.updateCategory('bzblocks', { 
	icon: prwp_icon 
});