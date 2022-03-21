import { LightningElement,api } from 'lwc';
import CAROUSEL_IMAGES from '@salesforce/resourceUrl/cover3';
export default class Customcarouselwrapper extends LightningElement {

    @api title;
    @api slogan;
    @api heroDetailsPosition;
    
    @api titleColor;
    @api internalResource;
    @api sloganColor;

    slides=[
        {
            image:`${CAROUSEL_IMAGES}/photo3.png`,
            heading:"1",
            description:"11",
            

        },
        {
            image:`${CAROUSEL_IMAGES}/photo4.png`,
            heading:"2",
            description:"22",

        },
        {
            image:`${CAROUSEL_IMAGES}/photo5.png`,
            heading:"3",
            description:"33",

        },
    ]




    
   get heroDetailsPositionClass() {
        if (this.heroDetailsPosition === 'left') {
            return 'c-hero-center-left';
        } else if (this.heroDetailsPosition === 'right') {
            return 'c-hero-center-right';
        }

        return 'c-hero-center-default';
    }

    renderedCallback(){
        this.template.querySelector("h1").style.color= this.titleColor;
        this.template.querySelector("p").style.color= this.sloganColor;
    }
}