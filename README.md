/* !_READ ME_!.gs */
/*

I am a high school student developing this web app as a personal project. 
If you have any questions or feedback on how I can improve the security or quality of my webportal, 
please feel free to contact me at aiden.jenkins1234@gmail.com.


helpful info/notes:

thinking of using Session Storage to act as a cache for pages

JS/CSS/HTML file - comments, code, & documentation is outdated, will need to update/rewrite

go though serverside comments and add required / optional to the variables

(half done) might rework the UI / Page system completly using somthing like 
  
  in the end of the url:
  /exec?page=About
  like: https://script.google.com/macros/s/AKfycbzTrUHrB70f8iiZCiuPIx3UOWzikhrsKkGg1bvQkhWJ/dev/exec?page=About

  in do get:
  const pageToLoad = eventObject.parameter.page;
  if (pageToLoad == "About") {
    return;
  }

  in html:  
  <a href="<?= getScriptUrl() ?>?page=About">About Page</a>

  in main gs file:
  function getScriptUrl() {
    return ScriptApp.getService().getUrl();
  }

TODO:
- Add page chaching to speed loading
- Fix Broken join request systems
- Fix Broken Rover connection
- Optimize/clean UI development/File
- add JSDoc to JS files
- update/rewrite JS/CSS/HTML file - outdated comments, code, & documentation
- Add new google drive API for google docs as class
- redo JS sheet embed class
- (DONE) Add sheet writing to sheet class
- (DONE) Fix CarouselEmbed no elements error
- Finish Mention Compose Embed
- Change member page to user elements list with hovering for more details, copy button to copy ref, clicking for more info / editing info
- Make discord API a class
- (DONE) SheetService class
- Add sheet embed sorting
- Add user alr in member archive condition to join request page
- Add target user argument to getUserData function instead of only targeting the calling (current) user 
- Once Roblox/Rover connection is working add to privacy policy

This will be removed soon, i should follow a more common naming convention of camelCase
PascalCase - for objects, lists, anything containing other data
camelCase - for variables
SCREAMING_SNAKE_CASE - for global constants

Object.freeze({}) 
  acts like an enum of strings
  the freeze makes it readonly
  A locked list for autocompletion to prevent issues with mispelling names

UI: 
  for ui you can do 
  ...((condition) ? [..elements] : [])
  if condition is true elements will show, if not elements wont show

  this works for code, the extra () at the end will make the code run
  ...((condition) ? ( () => {) )() : [])

  this can be used for a new, better way to throw errors for UI
  ...((condition) ? ( () => { throw new Error("ERROR: Error information"); } )() : [])


functions with a trailing _ cant be called by google.script.run makes security easier 
  


force functions to wait for others to finish before allowing other changes
// 1. Get a public lock
  const lock = LockService.getScriptLock();
  
  try {
    // 2. Wait up to 30 seconds for other processes to finish
    // If it takes longer than 30s, it will throw an error
    lock.waitLock(30000); 

  //   console.log("(function) Finished, releasing lock.");

  // } catch (e) {
  //   console.error("(function) Could not obtain lock: " + e.toString());
  //   return false;
  // } finally {
  //   // 3. Always release the lock, even if the script fails
  //   lock.releaseLock();
  // }

*/
/**
 * Common JSDoc Tags and Property Modifiers:
 * CORE TYPE TAGS:
 * 
 * 
 * @type {<Type>}
 * Defines the type of a property, variable, or constant.
 * // Example: @type {string}
 *
 * optional: @param {<Type>} [name]
 * or 
 * required: @param {<Type>} name
 * Documents a function parameter (argument).
 * // Example: @param {number} [count] The number of items.
 *
 * @returns {<Type>}
 * Documents the type of the value returned by a function.
 * // Example: @returns {boolean} True if successful, false otherwise.
 *
 * @typedef {<Type>} [name]
 * Creates a custom type definition, often for complex objects.
 * // Example: @typedef {object} MyType
 *
 * 
 * ADVANCED STRUCTURE TAGS:
 * 
 * 
 * @callback {<Function>} [name]
 * Documents a function signature that will be used as a callback.
 * // Example: @callback MyCallback function(error, data)
 *
 * @template {<Type>}
 * Defines a type parameter for generics (often used with classes or functions).
 * // Example: @template T
 *
 * @class {<Constructor>}
 * Documents a constructor function or ES6 class. (Also: @constructor)
 *
 * @this {<Type>}
 * Documents the type of 'this' inside a function or method.
 * // Example: @this {MyClass}
 *
 * @extends {<Type>}
 * Documents that a class inherits from another class. (Also: @augments)
 * // Example: @extends {BaseClass}
 *
 * @enum {<Type>}
 * Documents an object whose properties are treated as constant members (an enumeration).
 * // Example: @enum {string}
 *
 * @deprecated [description]
 * Marks a function, class, or property as outdated and should no longer be used.
 *
 * 
 * PROPERTY MODIFIERS (Used alongside @member):
 * 
 * 
 * @public
 * (Default) Indicates a member is publicly accessible.
 *
 * @private
 * Indicates a member is for internal use only.
 *
 * @protected
 * Indicates a member is accessible by the class itself and its subclasses.
 *
 * @readonly
 * Indicates a property's value should not be changed after initialization (e.g., const).
 */
/**
 * @typedef {string[]} user_data_array_rankList - list of rank enums for a user
 * @property {user_data_array_rankList} ranklist - the list of ranks the user has, used for identification and security. 
*/




































// SAVED OLD OAUTH2 google sheet service 


// // ====================================================================
// // AUTH
// // ====================================================================

//   /**
//    * **Documentation:** 
//    * - https://docs.cloud.google.com/iam/docs/service-account-overview
//    * - https://github.com/googlesamples/apps-script-oauth2#1-create-the-oauth2-service
//    * 
//    * Gets the service for google sheets of the google sheets service account API
//    * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
//    * - **File:** GS-API-OAuth2-Service-Account-GoogleSheets.gs
//    * - **Section:** AUTH
//    * 
//    * @return {OAuth2.Service} 
//    * Google sheets service.
//   */
//   function getServiceGoogleSheets() {
//     const service_Account_spreadsheet_Email = SCRIPT_PROPERTIES_SERVICE.getProperty("SERVICE_ACCOUNT_SPREADSHEET_EMAIL");
//     const service_Account_spreadsheet_Private_Key = SCRIPT_PROPERTIES_SERVICE.getProperty("SERVICE_ACCOUNT_SPREADSHEET_PRIVATE_KEY").replace(/\\n/g, `\n`); /* fix script properties string formatting */
//     return OAuth2.createService('SheetsService')
//       .setIssuer(service_Account_spreadsheet_Email)
//       .setPrivateKey(service_Account_spreadsheet_Private_Key)
//       .setScope('https://www.googleapis.com/auth/spreadsheets')
//       .setTokenUrl('https://oauth2.googleapis.com/token');
//   }

// // ====================================================================
// // FORMAT RANGE
// // ====================================================================

//   /**
//    * @typedef {object} Args_OAuth2_serviceAccountAPI_googleSheet_formatSheetRange
//    *
//    * @property {string} spreadsheetId
//    * The id of the spreadsheet containing the sheet.
//    * - Required
//    * 
//    * @property {string} sheetName
//    * The name of the sheet from the spreadsheet.
//    * - Required
//    * 
//    * @property {string} [range]
//    * 
//    * **Documentation:** https://developers.google.com/workspace/sheets/api/guides/concepts
//    * 
//    * The range to format as A1 notation.
//    * 
//    * - Optional
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [column] 
//    * The letter indicating the column of the range to format.
//    * - Optional
//    * - Compatable with row argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//    * 
//    * @property {string|number} [row] 
//    * The number/string indicating the row of the range to format.
//    * - Optional
//    * - Compatable with column argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//   */
//   /**
//    * Formats range arguments into a range readable by the sheet service account API.
//    * At least one optional argument required.
//    * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
//    * - **File:** GS-API-OAuth2-Service-Account-GoogleSheets.gs
//    * - **Section:** FORMAT RANGE
//    *  
//    * @param {Args_OAuth2_serviceAccountAPI_googleSheet_formatSheetRange} Args 
//    * The config arguments for the format function
//    * 
//    * Required Arguments:
//    * - sheetName
//    * - spreadsheetId
//    * 
//    * Optional Arguments:
//    * - range
//    * - column
//    * - row
//    * 
//    * @return {string} 
//    * Formatted range.
//   */
//   function formatSheetRange(Args) {
//     let {
//       spreadsheetId, // technically not needed but required to be passed for debug reasons
//       sheetName,
//       range,
//       column,
//       row,
//     } = Args;
    
//     // if no spreadsheet id or invalid spreadsheet id provided, warn 
//     if (typeof spreadsheetId !== `string`) { 
//       console.warn(
//         `\n` + 
//         `(Service Account) Initalizing attempt to format sheet range of sheet ${sheetName};` + `\n` +
//         `No spreadsheet id as string provided, errors messages may be unclear;` 
//       );
//     };

//     // if no sheet name or invalid sheet name provided, throw error
//     if (typeof sheetName !== `string`) { 
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to format sheet range of spreadsheet (${spreadsheetId});` + `\n` +
//         `Must provide sheet name from spreadsheet as string;` 
//       );
//     };

//     // if range passed ensure it is a string, if not throw error
//     if (range && (typeof range !== `string`)) {
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to format sheet range of spreadsheet (${spreadsheetId});` + `\n` +
//         `Range argument must be passed as a string instance;` 
//       );
//     }

//     // if column passed ensure it is a string, if not throw error
//     if (column && (typeof column !== `string`)) {
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to format sheet range of spreadsheet (${spreadsheetId});` + `\n` +
//         `Column argument must be passed as a string;` 
//       );
//     }
    
//     // if row passed ensure it is a string or number, if not throw error
//     if (row && (typeof row !== `string` && typeof row !== `number`)) {
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to format sheet range of spreadsheet (${spreadsheetId});` + `\n` +
//         `Row argument must be passed as a string or number;` 
//       );
//     }

//     // set the range the service account is fetching

//     // ensure there isnt conflicting range arguments, if so console error
//     if (range && column || range && row) { 
//       console.error(
//         `\n` + 
//         `(Service Account) Initializing range format for sheet (${sheetName}), from spreadsheet (${spreadsheetId});` + `\n` + 
//         `Defaulting to range argument;` + `\n` +
//         `Cannot have both a range and a column or row argument for range format;`
//       );
//       column = null;
//       row = null;
//     }
//     // just range
//     else if (range) {
//       range = `${sheetName}!${range}`;
//     }
//     // both column and row
//     else if (column && row) {
//       range = `${sheetName}!${column}${row}`
//     }
//     // just column
//     else if (!row && column) { 
//       range = `${sheetName}!${column}:${column}`;
//     }
//     // just row
//     else if (!column && row) { 
//       range = `${sheetName}!${row}:${row}`;
//     }
//     // no range arguments passed (entire sheet)
//     else if (!range && !column && !row) { 
//       console.log(
//         `(Service Account) Attempting range format for sheet (${sheetName}), from spreadsheet (${spreadsheetId});` + `\n` + 
//         `Range initialized as entire sheet;` + `\n` +
//         `No range arguments provided for range format;`
//       ); 
//       range = `${sheetName}`;
//     }

//     // encode range to fully format it
//     let formattedRange = encodeURIComponent(range);

//     // return formatted range
//     return formattedRange;
//   }

// // ====================================================================
// // REQUEST SHEET DATA
// // ====================================================================

//   /** 
//    * @typedef {object} Args_OAuth2_serviceAccountAPI_googleSheet_requestSheetData
//    *
//    * @property {string} sheetName
//    * The name of the sheet from the spreadsheet.
//    * - Required
//    * 
//    * @property {string} spreadsheetId
//    * The id of the spreadsheet containing the sheet.
//    * - Required
//    * 
//    * @property {string} [formattedRange]
//    * the range to request, formatted using the formatSheetRange() function.
//    * - Optional
//    * - ⚠️ Conflicts with range argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️ 
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [range] 
//    * 
//    * **Documentation:** https://developers.google.com/workspace/sheets/api/guides/concepts
//    * 
//    * The range to request as A1 notation. 
//    * 
//    * - Optional
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️ 
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [column] 
//    * The letter indicating the column of the range to request.
//    * - Optional
//    * - Compatable with row argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//    * 
//    * @property {string|number} [row] 
//    * The number/string indicating the row of the range to request.
//    * - Optional
//    * - Compatable with column argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//   */
//   /**
//    * Requests cached sheet data, if no data cached, cache sheet data.
//    * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
//    * - **File:** GS-API-OAuth2-Service-Account-GoogleSheets.gs
//    * - **Section:** REQUEST SHEET DATA
//    *  
//    * @param {Args_OAuth2_serviceAccountAPI_googleSheet_requestSheetData} Args 
//    * The config arguments for the request function
//    * 
//    * Required Arguments:
//    * - sheetName
//    * - spreadsheetId
//    * 
//    * Optional Arguments:
//    * - formattedRange
//    * - range
//    * - column
//    * - row
//    * 
//    * @return {Array<Array<any>>} 
//    * Cached sheet data. 
//    * - 2D array
//   */
//   function requestSheetData(Args = {}) {
//     let {
//       spreadsheetId,
//       sheetName,
//       formattedRange,
//       range,
//       column,
//       row,
//     } = Args;
    
//     // if no spreadsheet id or invalid spreadsheet id provided, throw error
//     if (!spreadsheetId || typeof spreadsheetId !== `string`) { 
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to request sheet data;` + `\n` +
//         `Must provide spreadsheet id as string;` 
//       );
//     };

//     // if no formatted range provided use args to get formatted range 
//     if (!formattedRange) {
//       formattedRange = formatSheetRange(Args);
//     }
//     // if formatted range is invalid, throw error
//     if (formattedRange && typeof formattedRange !== `string`) {
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to request cached sheet (${sheetName}) data, from spreadsheet (${spreadsheetId});` + `\n` +
//         `Must provide formatted range as string;` 
//       );
//     }

//     // get data from cache and parse from JSON string
//     let dataCacheKey = `${spreadsheetId}_DATA_${formattedRange}`;
//     // SCRIPT_CACHE_SERVICE.remove(dataCacheKey) // Debug only to ensure cache is working
//     let Data = JSON.parse(SCRIPT_CACHE_SERVICE.get(dataCacheKey));

//     // if no data is in cache, cache sheet and store response
//     if (!Data) {
//       console.log(
//         `(Service Account) Attempting to request cached sheet (${sheetName}) data, in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//         `Initializing data cache of sheet;`  + `\n` +
//         `No data cached as ${dataCacheKey};`
//       ); 
//       Data = cacheSheetData_(Args);
//     } else {
//       console.log(
//         `(Service Account) Retrieved cached sheet (${sheetName}) data, in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//         `Range data retrieved from ${dataCacheKey};`
//       ); 
//     }

//     // return data from cache
//     return Data;
//   }

// // ====================================================================
// // CACHE SHEET DATA
// // ====================================================================

//   /**
//    * @typedef {object} Args_OAuth2_serviceAccountAPI_googleSheet_cacheSheetData
//    *
//    * @property {string} sheetName
//    * The name of the sheet from the spreadsheet.
//    * - Required
//    * 
//    * @property {string} spreadsheetId
//    * The id of the spreadsheet containing the sheet.
//    * - Required
//    * 
//    * @property {string} [formattedRange]
//    * the range to cache, formatted using the formatSheetRange() function.
//    * - Optional
//    * - ⚠️ Conflicts with range argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️ 
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [range] 
//    * 
//    * **Documentation:** https://developers.google.com/workspace/sheets/api/guides/concepts
//    * 
//    * The range to cache as A1 notation. 
//    * 
//    * - Optional
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️ 
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [column] 
//    * The letter indicating the column of the range to cache.
//    * - Optional
//    * - Compatable with row argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//    * 
//    * @property {string|number} [row] 
//    * The number/string indicating the row of the range to cache.
//    * - Optional
//    * - Compatable with column argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//   */
//   /**
//    * Uses service account API to fetch data from a google sheet then cache it.
//    * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
//    * - **File:** GS-API-OAuth2-Service-Account-GoogleSheets.gs
//    * - **Section:** CACHE SHEET DATA
//    *  
//    * @param {Args_OAuth2_serviceAccountAPI_googleSheet_cacheSheetData} Args 
//    * The config arguments for the cache function
//    * 
//    * Required Arguments:
//    * - sheetName
//    * - spreadsheetId
//    * 
//    * Optional Arguments:
//    * - formattedRange
//    * - range
//    * - column
//    * - row
//    * 
//    * @return {Array<Array<any>>} 
//    * Data cached from the fetchSheetData_() function. 
//    * - 2D array
//   */
//   function cacheSheetData_(Args = {}) {
//     let {
//       spreadsheetId,
//       sheetName,
//       formattedRange,
//       range,
//       column,
//       row,
//     } = Args;

//     // if no spreadsheet id or invalid spreadsheet id provided, throw error
//     if (typeof spreadsheetId !== `string`) { 
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to cache sheet data` + `\n` +
//         `Must provide spreadsheet id as string;` 
//       );
//     };
    

//     // if no formatted range provided use args to get formatted range 
//     if (!formattedRange) {
//       formattedRange = formatSheetRange(Args);
//     };
//     // if formatted range is invalid, throw error
//     if (formattedRange && typeof formattedRange !== `string`) {
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to cache sheet (${sheetName}) data, from spreadsheet (${spreadsheetId});` + `\n` +
//         `Must provide formatted range as string;` 
//       );
//     }

//     // fetch sheet data
//     let Data = fetchSheetData_(Args);

//     // time in seconds cached data is valid (time to live)
//     let dataTTL_S = SHEET_CACHE_TTL_S; // default as entire sheet TTL_S
//     if (formattedRange.includes("!")) { dataTTL_S = SHEET_RANGE_CACHE_TTL_S;} // use shorter range lifespan if formattedRange includes ! (meaning it has a range)

//     // store fetched data in cache as JSON string
//     let dataCacheKey = `${spreadsheetId}_DATA_${formattedRange}`;
//     console.log(
//       `(Service Account) Cached sheet (${sheetName}) data, in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//       `Range data cached as ${dataCacheKey};`
//     ); 
//     SCRIPT_CACHE_SERVICE.put(dataCacheKey, JSON.stringify(Data), dataTTL_S);

//     // return data
//     return Data;
//   }

// // ====================================================================
// // FETCH SHEET DATA
// // ====================================================================

//   /**
//    * @typedef {object} Args_OAuth2_serviceAccountAPI_googleSheet_fetchSheetData
//    *
//    * @property {string} sheetName
//    * The name of the sheet from the spreadsheet.
//    * - Required
//    * 
//    * @property {string} spreadsheetId
//    * The id of the spreadsheet containing the sheet.
//    * - Required
//    * 
//    * @property {string} [formattedRange]
//    * the range to fetch from, formatted using the formatSheetRange() function.
//    * - Optional
//    * - ⚠️ Conflicts with range argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️ 
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [range] 
//    * 
//    * **Documentation:** https://developers.google.com/workspace/sheets/api/guides/concepts
//    * 
//    * The range to fetch from as A1 notation. 
//    * 
//    * - Optional
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️ 
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [column] 
//    * The letter indicating the column of the range to fetch from.
//    * - Optional
//    * - Compatable with row argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//    * 
//    * @property {string|number} [row] 
//    * The number/string indicating the row of the range to fetch from.
//    * - Optional
//    * - Compatable with column argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//   */
//   /**
//    * **Documentation:** 
//    * - https://developers.google.com/workspace/add-ons/guides/connect-third-party-service
//    * - https://developers.google.com/workspace/sheets/api/guides/concepts
//    * - https://github.com/googlesamples/apps-script-oauth2#1-create-the-oauth2-service
//    * 
//    * Uses service account API to fetch data from a google sheet.
//    * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
//    * - **File:** GS-API-OAuth2-Service-Account-GoogleSheets.gs
//    * - **Section:** FETCH SHEET DATA
//    *  
//    * @param {Args_OAuth2_serviceAccountAPI_googleSheet_fetchSheetData} Args 
//    * The config arguments for the fetch function
//    * 
//    * Required Arguments:
//    * - sheetName
//    * - spreadsheetId
//    * 
//    * Optional Arguments:
//    * - formattedRange
//    * - range
//    * - column
//    * - row
//    * 
//    * @return {Array<Array<any>>} 
//    * Data received from the API fetch call. 
//    * - 2D array
//   */
//   function fetchSheetData_(Args = {}) {
//     let {
//       spreadsheetId,
//       sheetName,
//       formattedRange,
//       range,
//       column,
//       row,
//     } = Args;

//     // throw error if there is invalid or nothing for spreadsheet id or sheet name passed
//     if (typeof spreadsheetId !== `string`) { 
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to fetch sheet data;` + `\n` +
//         `Must provide spreadsheet id as string;` 
//       );
//     };
//     if (typeof sheetName !== `string`) { 
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to fetch sheet data from spreadsheet (${spreadsheetId});` + `\n` +
//         `Must provide sheet name from spreadsheet as string;` 
//       );
//     };

//     // if no formatted range provided use args to get formatted range 
//     if (!formattedRange) {
//       formattedRange = formatSheetRange(Args);
//     }
//     // if formatted range is invalid, throw error
//     if (formattedRange && typeof formattedRange !== `string`) {
//       throw new Error(
//         `\n` + 
//         `(Service Account) Cannot attempt to fetch sheet (${sheetName}) data, from spreadsheet (${spreadsheetId});` + `\n` +
//         `Must provide formatted range as string;` 
//       );
//     }
    
//     const service = getServiceGoogleSheets();

//     // ensure the service account has access
//     if (!service.hasAccess()) {
//       console.error(
//         `\n` + 
//         `(Service Account) Cannot attempt to fetch sheet (${sheetName}) data, in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//         `Failure to get valid access token;` 
//       ); 
//       return null;
//     }

//     if (service.hasAccess()) {
//       // format the fetch call
//       const accessToken = service.getAccessToken();
//       const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${formattedRange}`;
//       const options = {
//         method: 'get',
//         muteHttpExceptions: true, // Prevents script from stopping on 400/500 errors
//         headers: {
//           'Authorization': 'Bearer ' + accessToken,
//           'Accept': 'application/json',
//         }
//       };
//       try {
//         // send fetch call and store response
//         const response = UrlFetchApp.fetch(apiUrl, options);
//         const responseCode = response.getResponseCode();

//         console.log(`HTTP ${responseCode}`);
//         console.log(response.getContentText());
        
//         // code 200 means success
//         if (responseCode === 200) {

//           // parse response and return empty list if response isnt valid
//           const data = JSON.parse(response.getContentText());
//           return data.values || [];

//         } else {
//           // send error if the call failed
//           const errorText = response.getContentText();
//           console.error(
//             `\n` + 
//             `(Service Account) Attempting to fetch sheet (${sheetName}) data, in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//             `API fetch data failure (${responseCode});` + `\n` +
//             `${errorText}`
//           ); 
//           return [];
//         }
//       } catch (error) {
//         // send error if attemping to send call failed
//         console.error(
//           `\n` + 
//           `(Service Account) Attempting to fetch sheet (${sheetName}) data, in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//           `URL fetch failure;` + `\n` +
//           `${error.toString()}`
//         );
//         return [];
//       }
      
//     } 
//   }

// // ====================================================================
// // WRITE SHEET DATA
// // ====================================================================

//   /** 
//    * @typedef {object} Args_OAuth2_serviceAccountAPI_googleSheet_writeSheetData
//    *
//    * @property {string} sheetName
//    * The name of the sheet from the spreadsheet.
//    * - Required
//    * 
//    * @property {string} spreadsheetId
//    * The id of the spreadsheet containing the sheet.
//    * - Required
//    * 
//    * @property {Array<Array<any>>} content
//    * Data you are writing onto the sheet. 
//    * - Required
//    * - 2D array 
//    * 
//    * @property {string} [formattedRange]
//    * the range to write data, formatted using the formatSheetRange() function.
//    * - Optional
//    * - ⚠️ Conflicts with range argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️ 
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [range] 
//    * 
//    * **Documentation:** https://developers.google.com/workspace/sheets/api/guides/concepts
//    * 
//    * The range to write data as A1 notation. 
//    * 
//    * - Optional
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with column argument ⚠️ 
//    * - ⚠️ Conflicts with row argument ⚠️
//    * 
//    * @property {string} [column] 
//    * The letter indicating the column of the range to write data.
//    * - Optional
//    * - Compatable with row argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//    * 
//    * @property {string|number} [row] 
//    * The number/string indicating the row of the range to write data.
//    * - Optional
//    * - Compatable with column argument
//    * - ⚠️ Conflicts with formattedRange argument ⚠️
//    * - ⚠️ Conflicts with range argument ⚠️
//   */
//   /**
//    * **Documentation:** 
//    * - https://developers.google.com/workspace/add-ons/guides/connect-third-party-service
//    * - https://developers.google.com/workspace/sheets/api/guides/concepts
//    * - https://github.com/googlesamples/apps-script-oauth2#1-create-the-oauth2-service
//    * 
//    * Uses service account API to write data onto a google sheet then caches the sheet.
//    * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
//    * - **File:** GS-API-OAuth2-Service-Account-GoogleSheets.gs
//    * - **Section:** WRITE SHEET DATA
//    *  
//    * @param {Args_OAuth2_serviceAccountAPI_googleSheet_writeSheetData} Args 
//    * The config arguments for the write function
//    * 
//    * Required Arguments:
//    * - sheetName
//    * - spreadsheetId
//    * - content
//    * 
//    * Optional Arguments:
//    * - formattedRange
//    * - range
//    * - column
//    * - row
//    * 
//    * @return {boolean} 
//    * If the API write call succeeded.
//   */
//   function writeSheetData_(Args) {
//     let {
//       spreadsheetId,
//       sheetName,
//       content,
//       formattedRange,
//       range,
//       column,
//       row,
//     } = Args;

//     // if no formatted range provided use args to get formatted range 
//     if (!formattedRange) {
//       formattedRange = formatSheetRange(Args);
//     }
//     // give warning that without defined range the service account will default write into cell A1
//     if (!formattedRange.includes("!")) {
//       console.warn(
//         `(Service Account) Initializing data write onto sheet (${sheetName}), in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//         `No range argument passed;` + `\n` +
//         `Service account API will default write onto cell A1;`
//       ); 
//     }

//     const service = getServiceGoogleSheets();

//     // ensure the service account has access
//     if (!service.hasAccess()) {
//       console.error(
//         `\n` + 
//         `(Service Account) Cannot attempt to write data onto sheet (${sheetName}), in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//         `Failure to get valid access token;` 
//       ); 
//       return false;
//     }

//     // format the write call
//     const data = {
//       values: content,
//     }

//     const accessToken = service.getAccessToken();
//     const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${formattedRange}?valueInputOption=USER_ENTERED`;
//     const options = {
//       method: 'put',
//       muteHttpExceptions: true, // Prevents script from stopping on 400/500 errors
//       headers: {
//         'Authorization': 'Bearer ' + accessToken,
//         'Content-Type': 'application/json',
//       },
//       payload: JSON.stringify(data)
//     };

//     try {
//       // send write call and store response
//       const response = UrlFetchApp.fetch(apiUrl, options);
//       const responseCode = response.getResponseCode();

//       // code 200 means success
//       if (responseCode === 200) {
//         return true;
//       } else {
//         // send error if the call failed
//         const errorText = response.getContentText();
//         console.error(
//           `\n` + 
//           `(Service Account) Attempting to write data onto sheet (${sheetName}), in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//           `API fetch data failure (${responseCode});` + `\n` +
//           `${errorText}`
//         ); 
//         return false;
//       }
//     } catch (error) {
//       // send error if attemping to send call failed
//       console.error(
//         `\n` + 
//         `(Service Account) Attempting to write data onto sheet (${sheetName}), in range ${formattedRange}, from spreadsheet (${spreadsheetId});` + `\n` + 
//         `URL fetch failure;` + `\n` +
//         `${error.toString()}`
//       );
//       return false;
//     }

//   }
