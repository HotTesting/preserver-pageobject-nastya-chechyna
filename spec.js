//Импорт пейдж обджекта из другого файла
let NotesPage = require('./pageObjects/NotesPage.js').NotesPage
let ArchievePage = require('./pageObjects/ArchievePage.js').ArchievePage
let HomePage = require('./pageObjects/HomePage.js').HomePage
let DeletePage = require('./pageObjects/DeletePage.js').DeletePage

//Просто наш базовый URL для работы
let URL = 'http://www.hiteshbalar.com/preserver/notes'

describe('Preserver tests', function () {
    let notesPage = new NotesPage()
 
    //   browser.get(URL)
    //   browser.sleep(5000)

beforeEach(function () {
      browser.get(URL)
      browser.sleep(2000)

      //browser.params.users[1]
    })

    //This function will be executed after each IT block in this DESCRIBE block
    afterEach(function () {
      // Wiping cookie files ONLY for current domain
      browser.manage().deleteAllCookies()
      // Wiping local and session storage
      browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
        .then(undefined,
          function (err) {
            // Errors will be thrown when browser is on default data URL.
            // Session and Local storage is disabled for data URLs
          })
      //Wiping indexedDB     
      browser.executeScript(`
      indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args){
            for (let dbname of sender.target.result) {
                indexedDB.deleteDatabase(dbname)
            }
        };
      `).then(undefined,
          function (err) {
            // Errors will be thrown when browser is on default data URL.
            // indexedDB storage is disabled for data URLs
        })
    })

    it('should be created when title and body provided', function () {
        
        notesPage.createNote('Test', 'Test')
          browser.sleep(2000)
        expect(notesPage.getNotes().count()).toBe(1, 'Notes count should be 1 after created')
    })

    it('should be created when only title provided', function () {
        
        notesPage.createNote('Test', '')
          browser.sleep(2000)
        expect(notesPage.getNotes().count()).toBe(1, 'Notes count should be 1 after created')
    })

    it('should be created when only body provided', function () {

        notesPage.createNote('', 'Test')
          browser.sleep(2000)
        expect(notesPage.getNotes().count()).toBe(1, 'Notes count should be 1 after created')
         
    })

    it('should NOT be created when nothing provided', function () {

        notesPage.createNote('', '')
          browser.sleep(2000)
        expect(notesPage.getNotes().count()).toBe(0, 'Notes count should be 0')
      
    })
    

})

describe('Preserver Achieve tests', function() {
    let archievePage = new ArchievePage()
    let homePage = new HomePage()
    // browser.get(URL)
    // browser.sleep(2000)
    beforeEach(function () {
      browser.get(URL)
      browser.sleep(2000)

      //browser.params.users[1]
    })

    //This function will be executed after each IT block in this DESCRIBE block
    afterEach(function () {
      // Wiping cookie files ONLY for current domain
      browser.manage().deleteAllCookies()
      // Wiping local and session storage
      browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
        .then(undefined,
          function (err) {
            // Errors will be thrown when browser is on default data URL.
            // Session and Local storage is disabled for data URLs
          })
      //Wiping indexedDB     
      browser.executeScript(`
      indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args){
            for (let dbname of sender.target.result) {
                indexedDB.deleteDatabase(dbname)
            }
        };
      `).then(undefined,
          function (err) {
            // Errors will be thrown when browser is on default data URL.
            // indexedDB storage is disabled for data URLs
        })
    })
 
    it('Should be moved to Achieve Notes', function () {
        homePage.createNotes('Title note for achieving', 'Test description for archieving')
        browser.sleep(2000)
        archievePage.archieveNote()
        browser.sleep(5000)
    
    expect(archievePage.getNotes().count()).toBe(1, 'Notes count should be 1 after archieved')
    })

})

describe('Preserver Delete tests', function() {
    let deletePage = new DeletePage()
    let homePage = new HomePage()
    // browser.get(URL)
    // browser.sleep(2000)
    beforeEach(function () {
      browser.get(URL)
      browser.sleep(2000)

      //browser.params.users[1]
    })

    //This function will be executed after each IT block in this DESCRIBE block
    afterEach(function () {
      // Wiping cookie files ONLY for current domain
      browser.manage().deleteAllCookies()
      // Wiping local and session storage
      browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
        .then(undefined,
          function (err) {
            // Errors will be thrown when browser is on default data URL.
            // Session and Local storage is disabled for data URLs
          })
      //Wiping indexedDB     
      browser.executeScript(`
      indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args){
            for (let dbname of sender.target.result) {
                indexedDB.deleteDatabase(dbname)
            }
        };
      `).then(undefined,
          function (err) {
            // Errors will be thrown when browser is on default data URL.
            // indexedDB storage is disabled for data URLs
        })
    })
 
    it('Should be removed to recycle bin', function () {
        homePage.createNotes('Title for deleting', 'Test delete')
        browser.sleep(2000)
        deletePage.deleteNote()
        browser.sleep(2000)
    
    expect(deletePage.getNotes().count()).toBe(1, 'Notes count in recycle bin should be 1')
    })

})