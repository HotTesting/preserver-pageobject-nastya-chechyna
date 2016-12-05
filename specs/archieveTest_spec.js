let NotesPage = require('../pageObjects/NotesPage.js').NotesPage
let ArchievePage = require('../pageObjects/ArchievePage.js').ArchievePage

describe('Preserver Achieve tests', function() {
    let archievePage = new ArchievePage()
    let notesPage = new NotesPage()
 
    it('Should be moved to Achieve Notes', function () {
        notesPage.createNote('Title note for achieving', 'Test description for archieving')
        browser.sleep(2000)
        archievePage.archieveNote()
        browser.sleep(5000)
        expect(archievePage.getNotes().count()).toBe(1, 'Notes count should be 1 after archieved')
    })

})
