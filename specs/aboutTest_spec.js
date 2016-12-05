
let AboutPage = require('../pageObjects/AboutPage.js').AboutPage

describe('Preserver About page', function(){
    let aboutPage = new AboutPage()
    it('About page should be open', function(){
        aboutPage.openAbout()
        browser.sleep(2000)
        expect(aboutPage.getAbout().isPresent()).toBe(true)
    })
})

