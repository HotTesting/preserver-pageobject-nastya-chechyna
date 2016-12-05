let NotesPage = require('../pageObjects/NotesPage.js').NotesPage
let DeletePage = require('../pageObjects/DeletePage.js').DeletePage

describe('Preserver Delete tests', function() {
    let deletePage = new DeletePage()
    let notesPage = new NotesPage()
    
    it('Should be removed to recycle bin', function () {
        notesPage.createNote('Title for deleting', 'Test delete')
        browser.sleep(2000)
        deletePage.deleteNote()
        browser.sleep(2000)
        expect(deletePage.getNotes().count()).toBe(1, 'Notes count in recycle bin should be 1')
    })

})

