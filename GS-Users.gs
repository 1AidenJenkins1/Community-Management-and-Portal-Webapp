  /* GS-Users.gs */

// ====================================================================
// USER
// ====================================================================

  class User {

    constructor(Args) {
      const { 
        robloxUsername, 
        discordUsername, 
        discordId, 
        discordAvatarHash, 
        permission, 
        rankList, 
        divisionList,
        Access,
      } = Args;
      
      // defaults to a guest account if arg not passed
      this.robloxUsername = robloxUsername || "";
      this.discordUsername = discordUsername || "";
      this.discordId = discordId || 0;
      this.discordAvatarHash = discordAvatarHash || 0;
      this.Access = Access || { 
        permission: permission || PERMISSION.GUEST, 
        rankList: rankList || [], 
        divisionList: divisionList || [],
      };
    }

  }

// ====================================================================
// GUEST
// ====================================================================

    /**
     * gets user guest account.
     * 
     * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
     * - **File:** GS-Users.gs
     * - **Section:** GUEST
     * 
     * @return {User_Account} 
     * Guest account.
    */
    function getGuestAccount_() {
      /** @type {User_Account} */
      let UserData = {};

      // set account data
      UserData.permission = PERMISSION.GUEST;
      UserData.robloxUsername = ""; 
      UserData.discordUsername = ""; 
      UserData.discordId = 0; 
      UserData.permission = PERMISSION.GUEST;
      UserData.rankList = [];
      UserData.divisionList = [];
      // UserData.Access = {
      //   permission: PERMISSION.GUEST,
      //   rankList: [],
      //   divisionList: [],
      // }

      return UserData;
    }

// ====================================================================
// SEARCH
// ====================================================================
  // NOTE: user data should always be in column A-D as roblox username (A), discord username (B), discord id (C), discord avatar hash (D)

  /** 
   * @typedef {object} Args_User_searchUserInSheet
   * 
   * @property {string} spreadsheetId
   * The id of the spreadsheet containing the sheet.
   * - Required
   * 
   * @property {string} sheetName
   * The name of the sheet from the spreadsheet.
   * - Required
   * 
   * @property {string} search
   * What the function will search by.
   * - Optional
   * 
   * Will search through following data types to find matching user(s).
   * - Roblox username
   * - Discord username
   * - Discord Id
   * - Discord avatar hash
   * 
   * @property {string} discordId
   * Search user(s) by discord id.
   * - Optional
   * 
   * @property {string} discordUsername
   * Search user(s) by discord username.
   * - Optional
   * 
   * @property {boolean} strict
   * Will activate all search config arguments to find exact match.
   * - Optional
   * 
   * @property {boolean} matchCase
   * Will return found users with the case matching.
   * - Optional
   * 
   * @property {boolean} exactMatch
   * Will return found users with the entire cell matching.
   * - Optional
  */
  /**
   * Searches through sheet data to find matching user(s) 
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Users.gs
   * - **Section:** SEARCH
   * 
   * @param {Args_User_searchUserInSheet} Args 
   * The config arguments for the user search function
   * 
   * Search config arguments:
   * - strict
   * - matchCase
   * - exactMatch
   * 
   * @return {Array<Array<any>>} 
   * Found rows containing matching data.
   * - 2D Array
  */
  function searchUserInSheet_(Args = { }) {
    // for now search is based on basic identifers, others will be added later (rank, division, BCT, ...) 
    let {
      spreadsheetId,
      sheetName,
      search,
      discordId, 
      discordUsername,
      // robloxUsername, // will set up later
      strict = false, 
      matchCase = false, 
      exactMatch = false, 
    } = Args;

    matchCase = (matchCase) ? matchCase : strict;
    exactMatch = (exactMatch) ? exactMatch : strict;
    console.log(`EXACT MATCH: ${exactMatch}`);

    // ensure at least one search argument passed
    if (!search && !discordUsername && !discordId) {
      throw new Error(
        `\n` + 
        `(User Manager) Cannot attempt to search for user;` + `\n` +
        `No search argument provided;`
      );
    }

    // ensure only one search argument is passed
    if ((search && discordUsername) || (search && discordId) || (discordUsername && discordId)) {
      throw new Error(
        `\n` + 
        `(User Manager) Cannot attempt to search for user;` + `\n` +
        `More than one search argument provided;`
      );
    }
    
    // function to turn row data into user object
    const UserDataFromRow = (Row, rowNumber) => {
      // add one to rowNumber because header row was removed
      const UserData = {
        row: rowNumber + 2,
        robloxUsername: Row[0],
        discordUsername: Row[1],
        discordId: Row[2],
        discordAvatarHash: Row[3]
      }
      return UserData;
    }

    let Result = [];

    // use sheet service account to fetch sheet data
    let SheetData = SheetServiceAPI.requestData({
      spreadsheetId: spreadsheetId,
      sheetName: sheetName,
      range: "A2:D", // only get A-D. (start at row 2 to skip header)
    });
    
    // search through all data to find user row
    if (search != null) {

      if (!matchCase) { search = search.toLowerCase(); };

      SheetData.forEach((Row, rowIndex) => {
        Row.forEach((dataElement) => {

          if (!matchCase) { dataElement = dataElement.toLowerCase(); }

          if (!exactMatch && dataElement.startsWith(search)) {
            Result.push(UserDataFromRow(Row, rowIndex));
          }

          if (exactMatch && dataElement === search) {
            Result.push(UserDataFromRow(Row, rowIndex));
          }

        });
      });
      return Result;
    }

    // search specific column to find user

    /*
    if (robloxUsername != null) {

      if (!matchCase) { robloxUsername.toLowerCase(); };

      SheetData.forEach((Row, rowIndex) => {

        row_robloxUsername = Row[0];
        if (!matchCase) { row_robloxUsername = row_robloxUsername.toLowerCase(); };

        if ((!exactMatch) && (row_robloxUsername.startsWith(robloxUsername))) {
          Result.push(UserDataFromRow(Row, rowIndex));
        }

        if ((exactMatch) && (row_robloxUsername === robloxUsername)) {
          Result.push(UserDataFromRow(Row, rowIndex));
        }

      });
      return Result;
    }
    */
    
    if (discordUsername != null) {

      if (!matchCase) { discordUsername = discordUsername.toLowerCase(); };

      SheetData.forEach((Row, rowIndex) => {

        let rowDiscordUsername  = Row[1];
        if (!matchCase) { rowDiscordUsername  = row_discordUsername.toLowerCase(); };

        if ((!exactMatch) && (row_discordUsername.startsWith(discordUsername))) {
          Result.push(UserDataFromRow(Row, rowIndex));
        }

        if ((exactMatch) && (rowDiscordUsername  === discordUsername)) {
          Result.push(UserDataFromRow(Row, rowIndex));
        }

      });
      return Result;
    }

    if (discordId != null) {

      if (!matchCase) { discordId = discordId.toLowerCase(); };

      SheetData.forEach((Row, rowIndex) => {

        let rowId = Row[2];
        if (!matchCase) { rowId = row_id.toLowerCase() };

        if ((!exactMatch) && (rowId.startsWith(discordId))) {
          Result.push(UserDataFromRow(Row, rowIndex));
        }

        if ((exactMatch) && (rowId === discordId)) {
          Result.push(UserDataFromRow(Row, rowIndex));
        }

      });
      return Result;
    }
    
  }

  // function mentionSearch(Args = {}) {
    //   const {
    //     id,
    //     username,
    //   } = Args;

    //   let username_matches = [];

    //   let foundRanges = searchUserInSheet_({
    //     sheetRef: SmartSpreadsheet.UserData.SmartSheet.memberArchive,
    //     userId: (id) ? id : null,
    //     userDiscordUsername: (username) ? username : null,
    //   });
    //   if (foundRanges == null) { return []; };
    //   foundRanges.forEach((range, index) => {
    //       if (index != 0) {
    //         let rowNumber = range.getRow();
    //         let rowValues = getRowValues_(SmartSpreadsheet.UserData.SmartSheet.memberArchive, rowNumber);
    //         if (rowValues) {
    //           username_matches.push(rowValues[2]); 
    //         }
    //       }
    //   });

    //   return username_matches;
    // }

    // function getAllUserMentionData() {
    //   const allUsername = getColumnValues_(SmartSpreadsheet.UserData.SmartSheet.memberArchive, "B");
    //   const allUserId = getColumnValues_(SmartSpreadsheet.UserData.SmartSheet.memberArchive, "C");

    //   let userMentionData = []
    //   allUsername.forEach((ignore, index) => {
    //     if (index != 0) { 
    //      userMentionData.push({username: allUsername[index], id: allUserId[index] });
    //     }
    //   });
    //   return userMentionData;
  // }


  /** 
   * @typedef {object} Args_User_getUserData
   * 
   * @property {boolean} writeLastActiveDate
   * Will write the current date as the last active date
   * - Optional
  */
  /**
   * Searches through sheet data to find current user and returns a user instance from the result.
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Users.gs
   * - **Section:** SEARCH
   * 
   * @param {Args_User_getUserData} Args 
   * The config arguments for the get user data function
   * 
   * config arguments:
   * - writeLastActiveDate
   * 
   * @return {User_Account} 
   * Data of current user
   * - 2D Array
  */
  function getUserData(Args = { }) {
    let {
      writeLastActiveDate = false
    } = Args;

    let UserData = {};

    // if user hasnt logged in to discord provide a guest account
    if (!checkAccess()) {
      return getGuestAccount_();
    }

    // if logged in fetch discord user data
    const DiscordUserData = fetchDiscordUser_();

    // find user in member and admin archives, use strict to find exact match
    let memberDataFoundUser = searchUserInSheet_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Member_Archive.name,
      discordId: DiscordUserData.id,
      strict: true,
    });
    let adminDataFoundUser = searchUserInSheet_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Admin_Archive.name,
      discordId: DiscordUserData.id,
      strict: true,
    });

    // if user is not in member archive provide guest account
    if (memberDataFoundUser.length === 0) {
      console.log( 
        `(User Manager) Providing guest account;` + `\n` +
        `User logged in but not in member sheet;`
      );
      return getGuestAccount_();
    }

    // get user permissions
    if (adminDataFoundUser !== 0 && DEBUG_MODE) {
      // provide USER permissions if in member archive, and admin archive, and DEBUG_MOD is on
      UserData.permission = PERMISSION.ADMIN;
    } else if (memberDataFoundUser !== 0) {
      // provide USER permissions if in member archive
      UserData.permission = PERMISSION.USER;
    }
    
    // get user row data
    let UserMemberRowData = SheetServiceAPI.requestData({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Member_Archive.name,
      row: memberDataFoundUser[0].row,
    }).flat(); // flatten to 1d array

    if (writeLastActiveDate) {  
      // get the date the user was accepted
      let current = new Date(); // todays date
      let formattedDate = Utilities.formatDate(current, "GMT-5", "EEE MMM dd yyyy h:mm:ss a");

      // mark last active date
      SheetServiceAPI.writeData({ 
        spreadsheetId: Spreadsheet.UserData.id,
        sheetName: Spreadsheet.UserData.Sheet.Member_Archive.name,
        row: memberDataFoundUser[0].row, 
        column: "11", 
        content: `=TEXT("${formattedDate}", "MM/dd/yyyy h:mm:ss AM/PM")`,
      });
    }

    // store user data as obj
    UserData.robloxUsername = null;
    UserData.discordUsername = DiscordUserData.username;
    UserData.discordId = DiscordUserData.id;
    UserData.discordAvatarHash = DiscordUserData.avatar;
    UserData.rankList = JSON.parse(UserMemberRowData[4]);
    UserData.divisionList = JSON.parse(UserMemberRowData[5]);
    // UserData.Access = {
    //   rankList: JSON.parse(UserMemberRowData[4]),
    //   divisionList: JSON.parse(UserMemberRowData[5]),
    // }
    return UserData;
  }

// ====================================================================
// MANAGE
// ====================================================================

  /*
    save for later

    JSON.stringify(rankList), // save rank as JSON | both basic and division ranks stored here
    JSON.stringify(divisionList), // save division as JSON | for things like both being in R&D and robotics
    points, // points 
    // formattedDate, // todays date to show when updated/created   | idk might do somthing with later
    // "=DAYS(TODAY(), INDIRECT(\"RC[-1]\", FALSE))" // show days since updated/creation  | ^ same thing, idk
  */

  /** 
   * @typedef {object} Args_User_addUserToArchive
   * 
   * @property {string} spreadsheetId
   * The id of the spreadsheet containing the sheet.
   * - Required
   * 
   * @property {string} sheetName
   * The name of the sheet from the spreadsheet.
   * - Required
  */
  /**
   * No description available.
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Users.gs
   * - **Section:** MANAGE
   * 
   * @param {Args_User_addUserToArchive} Args 
   * The config arguments for the add user to archive function
  */
  function addUserToArchive_(Args = {}) {
    let {
      spreadsheetId,
      sheetName,
      userData,
      robloxUsername, 
      discordUsername, 
      discordId,
      discordAvatarHash, 
      data = [],
    } = Args;

    if (userData) {
      robloxUsername = userData.robloxUsername;
      discordUsername = userData.discordUsername;
      discordId = userData.discordId;
      discordAvatarHash = userData.discordAvatarHash;
    }

    let joinRequestDataFoundUser = searchUserInSheet_({
      spreadsheetId: spreadsheetId,
      sheetName: sheetName,
      discordId: discordId,
      strict: true,
    });

    if (joinRequestDataFoundUser.length != 0) {
      console.error(`(User Manager) Cannot attempt to add user;` + `\n` +
        `User ${discordId} already exists;`
      );
      return;
    }

    SheetServiceAPI.appendData({
      spreadsheetId: spreadsheetId,
      sheetName: sheetName,
      content: [
        [
          robloxUsername, // roblox username 
          discordUsername, // discord username 
          discordId, // discord id
          discordAvatarHash, // discord avatar id (profile picture)
          ...data // rest the the data to append
        ]
      ]
    });
    
  }

  /** 
   * @typedef {object} Args_User_acceptJoinRequest
   * 
   * @property {string} targetUser_id
   * The id of the user to accept.
   * - Required
  */
  /**
   * No description available.
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Users.gs
   * - **Section:** MANAGE
   * 
   * @param {Args_User_acceptJoinRequest} Args 
   * The config arguments for the accept join request function
  */
  function acceptJoinRequest(discordId) {
    // will need to add logging
    // will need to add removing join request (DONE)
    // will need to add banning

    currentUser = getUserData();
    // only admins and users can add people
    if (currentUser.permission != PERMISSION.ADMIN && currentUser.permission != PERMISSION.USER) {
      // log failed join request (`currentUser has attempted to accept the join request of targetUser but lacked the permission to do so) - (not set up yet)
      console.error(`USER ${currentUser.discordId} attempted to accept the join request of ${id} but lacked the permission to do so`);
      return;
    }

    // log accepted join request (`currentUser has accepted the join request of targetUser) - (not set up yet)
    let joinRequestDataFoundUser = searchUserInSheet_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Join_Request.name,
      discordId: discordId,
      strict: true,
    });

    if (joinRequestDataFoundUser.length == 0) {
      console.error(`NO JOIN REQUEST BY ${discordId} FOUND`);
      return;
    }

    let foundUserData = {
      robloxUsername: joinRequestDataFoundUser[0].robloxUsername,
      discordUsername: joinRequestDataFoundUser[0].discordUsername,
      discordId: joinRequestDataFoundUser[0].discordId,
      discordAvatarHash: joinRequestDataFoundUser[0].discordAvatarHash,
    };
    
    addUserToArchive_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Member_Archive.name,
      userData: foundUserData,
      data: [
        JSON.stringify([ RANK.ENLISTED ]), // ranklist
        JSON.stringify([]),  // division list
        0, // points
      ]
    });
    
    SheetServiceAPI.deleteRows({ 
      row: joinRequestDataFoundUser[0].row - 1, 
      spreadsheet: Spreadsheet.UserData,
      sheet: Spreadsheet.UserData.Sheet.Join_Request,
    });
  }

  // remove later
  function test() {

    // log accepted join request (`currentUser has accepted the join request of targetUser) - (not set up yet)
    let joinRequestDataFoundUser = searchUserInSheet_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Join_Request.name,
      discordId: discordId,
      strict: true,
    });

    if (joinRequestDataFoundUser.length == 0) {
      console.error(`NO JOIN REQUEST BY ${discordId} FOUND`);
      return;
    }

    let foundUserData = {
      robloxUsername: joinRequestDataFoundUser[0].robloxUsername,
      discordUsername: joinRequestDataFoundUser[0].discordUsername,
      discordId: joinRequestDataFoundUser[0].discordId,
      discordAvatarHash: joinRequestDataFoundUser[0].discordAvatarHash,
    };

    // get the date the user was accepted
    let current = new Date(); // todays date
    let formattedDate = Utilities.formatDate(current, "GMT-5", "EEE MMM dd yyyy h:mm:ss a");
    
    addUserToArchive_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Member_Archive.name,
      userData: foundUserData,
      data: [
        JSON.stringify([ RANK.ENLISTED ]), // ranklist
        JSON.stringify([]),  // division list
        0, // points
        false, // BCT
        0,// events hosted/cohosted
        `=TEXT("${formattedDate}", "MM/dd/yyyy h:mm:ss AM/PM")`, // last promotion date
        `=TEXT("${formattedDate}", "MM/dd/yyyy h:mm:ss AM/PM")`, // last active date
        `=LET(diff, NOW() - VALUE(INDIRECT("RC[-1]", FALSE)), 
            IF(INT(diff) > 0, INT(diff) & " days, ", "") & 
            IF(HOUR(MOD(diff, 1)) > 0, HOUR(MOD(diff, 1)) & " hours, ", "") & 
            MINUTE(MOD(diff, 1)) & " minutes"
         )` // time since last active
      ]
    });
  }

  /** 
   * @typedef {object} Args_User_denyJoinRequest
   * 
   * @property {string} discordId
   * The id of the user to deny.
   * - Required
  */
  /**
   * No description available.
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Users.gs
   * - **Section:** MANAGE
   * 
   * @param {Args_User_denyJoinRequest} Args 
   * The config arguments for the deny join request function
  */
  function denyJoinRequest(discordId) {
    // will need to add logging
    // will need to add removing join request
    // will need to add banning

    currentUser = getUserData();
    // only admins and users can add people
    if (currentUser.permission != PERMISSION.ADMIN && currentUser.permission != PERMISSION.USER) {
      // log failed join request (`currentUser has attempted to accept the join request of targetUser but lacked the permission to do so) - (not set up yet)
      console.error(`USER ${currentUser.discordId} attempted to accept the join request of ${id} but lacked the permission to do so`);
      return;
    }

    // ensure user hasent already filled out a join request
    let joinRequestDataFoundUser = searchUserInSheet_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Join_Request.name,
      discordId: discordId,
      strict: true,
    });

    if (joinRequestDataFoundUser.length == 0) {
      console.error(`NO JOIN REQUEST BY ${discordId} FOUND`);
      return;
    }

    SheetServiceAPI.deleteRows({ 
      row: joinRequestDataFoundUser[0].row - 1, 
      spreadsheet: Spreadsheet.UserData,
      sheet: Spreadsheet.UserData.Sheet.Join_Request,
    });
  }

  /** 
   * @typedef {object} Args_User_createJoinRequest
   * 
   * @property {string} Q1_Response
   * Response to question 1.
   * - Required
   * 
   * @property {string} Q2_Response
   * Response to question 1.
   * - Required
   * 
   * @property {string} Q3_Response
   * Response to question 1.
   * - Required
   * 
   * @property {string} Q4_Response
   * Response to question 1.
   * - Required
  */
  /**
   * No description available.
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Users.gs
   * - **Section:** MANAGE
   * 
   * @param {Args_User_createJoinRequest} Args 
   * The config arguments for the create join request function
   * 
  */
  function createJoinRequest({ Q1_Response, Q2_Response, Q3_Response ,Q4_Response }) {

    // ensure user is logged into discord
    // if user hasnt logged in deny join request
    if (!checkAccess()) {
      throw new Error("USER NOT LOGGED INTO DISCORD - JOIN REQUEST NOT SENT");
    }
    const DiscordUserData = fetchDiscordUser_();

    // ensure user is logged into RoVer 
    // - not working for now commented for testing
    // robloxUserData = fetchRoVerUserFromDiscordId_(DiscordUserData.id);
    // if (!robloxUserData.username) { // change depending on what the rover username response is 
    //   return;
    // }

    // ensure user isnt a member
    // if user cant be found in Member Archive they arent a member
    let memberDataFoundUser = searchUserInSheet_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Member_Archive.name,
      discordId: DiscordUserData.id,
      strict: true,
    });

    if (memberDataFoundUser.length != 0) {
      throw new Error(`USER ${DiscordUserData.id} IS ALREADY A MEMBER - JOIN REQUEST NOT SENT`);
    }

    // ensure user isnt blacklisted (ID)
    // - not set up yet

    // ensure user hasent already filled out a join request
    let joinRequestDataFoundUser = searchUserInSheet_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Join_Request.name,
      discordId: DiscordUserData.id,
      strict: true,
    });

    if (joinRequestDataFoundUser.length != 0) {
     throw new Error(`USER ${DiscordUserData.id} HAS ALREADY CREATED JOIN REQUEST - JOIN REQUEST NOT SENT`);
    }

    // get the date the join request was sent
    let current = new Date(); // todays date
    let formattedDate = Utilities.formatDate(current, "GMT-5", "EEE MMM dd yyyy h:mm:ss a");

    // send data to join request sheet
    addUserToArchive_({
      spreadsheetId: Spreadsheet.UserData.id,
      sheetName: Spreadsheet.UserData.Sheet.Join_Request.name, 
      robloxUsername: null, 
      discordUsername: DiscordUserData.username, 
      discordId: DiscordUserData.id, 
      discordAvatarHash: DiscordUserData.avatar,
      data: [
        Q1_Response,
        Q2_Response,
        Q3_Response,
        Q4_Response,
        `=TEXT("${formattedDate}", "MM/dd/yyyy h:mm:ss AM/PM")`, // add hours and minutes and AM/PM
        `=LET(diff, NOW() - VALUE(INDIRECT("RC[-1]", FALSE)), 
            IF(INT(diff) > 0, INT(diff) & " days, ", "") & 
            IF(HOUR(MOD(diff, 1)) > 0, HOUR(MOD(diff, 1)) & " hours, ", "") & 
            MINUTE(MOD(diff, 1)) & " minutes"
         )` // show days since sent 
      ],
    })
  }

// ====================================================================
// USER UI
// ====================================================================

  /** 
   * @typedef {object} Args_User_createUserProfileUI
   * 
   * @property {string} discordUsername
   * discord username.
   * - Optional
   * 
   * @property {string} discordId
   * discord id.
   * - Optional
   * 
   * @property {string} discordAvatarHash
   * Discord avatar hash.
   * - Optional
   * 
   * @property {string} UserData
   * User data.
   * - Optinal
   * 
   * @property {string} Access
   * Access.
   * - Required
  */
  /**
   * No description available.
   * Only give UserData or discord arguments not both (temp info)
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Users.gs
   * - **Section:** USER UI
   * 
   * @param {Args_User_createUserProfileUI} Args 
   * The config arguments for the create user profile UI function
   * 
   * @return {object} 
   * Join user profile UI
   * 
  */
  function createUserProfileUI(Args = {}) {
    let {
      discordUsername,
      discordId,
      discordAvatarHash,
      UserData,
      Access,
    } = Args;
    if (!UserData) {
      UserData = {
        discordUsername: discordUsername,
        discordId: discordId,
        discordAvatarHash: discordAvatarHash,
      }
    } 
    if (!Access) {
      Access = { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] };
    }
    const UserProfileUI = 
      [ 
        {
          type: UIElementType.CONTAINER, id:"user-profile-container", className: "profile-container",
          Access: Access,
          content: [
            {
              type: UIElementType.IMAGE, className: "profile-img",
              Access: Access,
              imageUrl: getDiscordAvatarUrl(UserData.discordId, UserData.discordAvatarHash, 128),
            },
            {
              type: UIElementType.CONTAINER, id:"user-profile-info-container",
              Access: Access,
              content: [
                { 
                  type: UIElementType.TEXT, textType:TextType.H1, id: "join-request-user-username-text",  
                  Access: Access,
                  content: UserData.discordUsername,
                },
                { 
                  type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-user-id-text",  
                  Access: Access,
                  content: UserData.discordId,
                },
              ]
            },
          ]
        }
      ]
    return UserProfileUI;
  }

  /**
   * Will get all join requests and format it into a accept box.
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Users.gs
   * - **Section:** USER UI
   * 
   * @return {object} 
   * Join request manager carousel UI
   * 
  */
  function getjoinRequestManagerCarouselUI() {
    // header
    // container
    /*
      next and back buttons in one line (flex box container)
      discord user profile picture
      discord user name
      discord user id
      Q1 response
      Q2 response
      Q3 response
      Q4 response
      accept and deny buttons in one line (flex box container)
    */
    const joinRequestManagerUI_permission = PERMISSION.USER;
    const joinRequestManagerUI_rankList = [ RANK.ALL ];
    const joinRequestManagerUI_divisionList = [ DIVISION.ALL ];

    const getJoinRequestUIFromSheet = () => {
      let UI = []
      const joinRequestData = SheetServiceAPI.requestData({ 
        spreadsheetId: Spreadsheet.UserData.id, 
        sheetName: Spreadsheet.UserData.Sheet.Join_Request.name,
      });
      joinRequestData.forEach((row, index) => {
        if (index == 0) {
          return;
        }
        const discordUsername = row[1];
        const discordId = row[2];
        const discordAvatarHash = row[3];
        const responseQ1 = row[4];
        const responseQ2 = row[5];
        const responseQ3 = row[6];
        const responseQ4 = row[7];
        const JoinRequestUI = [
          {
            type: UIElementType.CONTAINER, id:`join-request-${discordId}`,
            Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
            content: [
              ...createUserProfileUI({ discordUsername: discordUsername, discordId: discordId, discordAvatarHash: discordAvatarHash }),
              { 
                type: UIElementType.TEXT, textType:TextType.H2, id: "question-1-response-text-header",  
                Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                content: "Q1) What is the United States Provisional Authority?",
              },
              {
                type: UIElementType.CONTAINER, id:"question-1-textBox", className:"textBox",
                Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                content: [
                  { 
                    type: UIElementType.TEXT, textType:TextType.P, id: "question-1-response-text",  
                    Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                    content: responseQ1,
                  },
                ]
              },
              { 
                type: UIElementType.TEXT, textType:TextType.H2, id: "question-2-response-text-header",  
                Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                content: "Q2) How long have you been in Wasteland Blues?",
              },
              {
                type: UIElementType.CONTAINER, id:"question-2-textBox", className:"textBox",
                Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                content: [
                  { 
                    type: UIElementType.TEXT, textType:TextType.P, id: "question-2-response-text",  
                    Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                    content: responseQ2,
                  },
                ]
              },
              { 
                type: UIElementType.TEXT, textType:TextType.H2, id: "question-3-response-text-header",  
                Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                content: "Q3) How where you introduced to the United States Provisional Authority?",
              },
              {
                type: UIElementType.CONTAINER, id:"question-3-textBox", className:"textBox",
                Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                content: [
                  { 
                    type: UIElementType.TEXT, textType:TextType.P, id: "question-3-response-text",  
                    Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                    content: responseQ3,
                  },
                ]
              },
              { 
                type: UIElementType.TEXT, textType:TextType.H2, id: "question-4-response-text-header",  
                Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                content: "Q4) Do you have any experience you have in the wasteland genre?",
              },
              {
                type: UIElementType.CONTAINER, id:"question-4-textBox", className:"textBox",
                Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                content: [
                  { 
                    type: UIElementType.TEXT, textType:TextType.P, id: "question-4-response-text",  
                    Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
                    content: responseQ4,
                  },
                ]
              },
              { 
                type: UIElementType.BUTTON, id: "accept-join-request", label: "ACCEPT", description: "Accept user join request", 
                Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                onClick: () => {
                  let discordId = document.getElementById("join-request-user-id-text").textContent;
                  let joinRequestContainer = document.getElementById(`join-request-${discordId}`);
                  
                  // Please wait msg
                  joinRequestContainer.innerHTML = "";
                  fillContainerWith({ 
                    container: joinRequestContainer, 
                    elements: [
                      { 
                        type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-please-wait-text",  
                        Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                        content: `PLEASE WAIT...`,
                      },
                    ] 
                  });

                  // msg user
                  bootMessage.add({ bootMessage: ["ACCEPTING JOIN REQUEST..."] });
                  google.script.run
                    .withSuccessHandler(() => {
                      bootMessage.addThenClear({ 
                        bootMessage: ["JOIN REQUEST ACCEPT SUCCESS."], 
                        withSuccessHandler: () => { setMenuUI(UIGroup.JOIN_REQUEST_MANAGER); },
                      });
                    })
                    .withFailureHandler((error) => {
                      bootMessage.addThenClear({ 
                        bootMessage: ["JOIN REQUEST ACCEPT FAILURE.", `Error: ${error}`],
                        withSuccessHandler: () => { joinRequestContainer.innerHTML = ""; }
                      });
                    })
                    .acceptJoinRequest(discordId)
                }, 
              },
              { 
                type: UIElementType.BUTTON, id: "deny-join-request", label: "DENY", description: "Deny user join request", 
                Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                onClick: () => {
                  let discordId = document.getElementById("join-request-user-id-text").textContent;
                  let joinRequestContainer = document.getElementById(`join-request-${discordId}`);
                  
                  // Please wait msg
                  joinRequestContainer.innerHTML = "";
                  fillContainerWith({ 
                    container: joinRequestContainer, 
                    elements: [
                      { 
                        type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-please-wait-text",  
                        Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                        content: `PLEASE WAIT...`,
                      },
                    ] 
                  });

                  // msg user
                  bootMessage.add({ bootMessage: ["DENYING JOIN REQUEST..."] });
                  google.script.run
                    .withSuccessHandler(() => {
                      bootMessage.addThenClear({ 
                        bootMessage: ["JOIN REQUEST DENY SUCCESS."], 
                        withSuccessHandler: () => { setMenuUI(UIGroup.JOIN_REQUEST_MANAGER); },
                      });
                    })
                    .withFailureHandler((error) => {
                      bootMessage.add({ 
                        bootMessage: ["JOIN REQUEST DENY FAILURE.", `Error: ${error}`],
                        withSuccessHandler: () => { joinRequestContainer.innerHTML = ""; }
                      });
                    })
                    .denyJoinRequest(discordId)
                }, 
              },
            ]
          } 
        ]
        UI.push(JoinRequestUI);

      });
      return UI;
    }; 

    let joinRequestManagerUI = [
      {
        type: UIElementType.CONTAINER, id:"join-request-display-textBox", className:"textBox",
        Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
        content: [
          {
            type: UIElementType.CAROUSEL_EMBED,  
            Access: { permission: joinRequestManagerUI_permission, rankList: joinRequestManagerUI_rankList, divisionList: joinRequestManagerUI_divisionList },
            content: [
              ...getJoinRequestUIFromSheet()
            ]
          },
        ]
      }
    ];

    return joinRequestManagerUI;
  }
