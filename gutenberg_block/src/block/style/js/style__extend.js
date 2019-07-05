/*
*   Function Name: Blockstyle
*   @documentation: https://developer.wordpress.org/block-editor/tutorials/javascript/extending-the-block-editor/ 
*/ 

import { StyleGutenbergRegister } from "../../globals/globals"; 
const BlockNamePackage = 'bzblocks/styling';

StyleGutenbergRegister( BlockNamePackage, 'bg-orange', 'Orange'); 
StyleGutenbergRegister( BlockNamePackage, 'bg-blue', 'Blau'); 