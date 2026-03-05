/* GS-Security.gs */

// ====================================================================
// FILTER
// ====================================================================

// do later
// function validateAccessInstance(Access = {}) {
//  if (Access.permission) {
//     if (!instanceOfEnum(UIElementType, Access.permission)) {
//     throw new Error(
//       `\n` + 
//       `(Security) Invalid Access Instance;` + `\n` +
//       `details of error;` 
//     );
//    }
//   }
//   // filter trough all ranks/divsions and if any arent a valid instance throw error
//   if (Access.rankList) {
    

//   }
//   if (Access.divisionList) {
    

//   }
// }

/**
 * Filters UI element(s) by the users current access.
 * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
 * - **File:** GS-Security.gs
 * - **Section:** FILTER
 * 
 * @param {Array<object>} Target 
 * The UI element(s) to filter.
 * 
 * @return {Array<object>} The filtered UI elements.
*/
function securityFilter_(Target) {
  let UserData = getUserData();
  let userPermission = UserData.permission;
  let userRankList = UserData.rankList;
  let userDivisionList = UserData.divisionList;

  // dont bother filtering for admin accounts just return the list
  if (userPermission == PERMISSION.ADMIN) return Target;

  if (Array.isArray(Target)) {
    let FilteredItems = [];
    Target.forEach((Item)=>{
      const FilteredItem = itemSecurityFilter_(Item, userPermission, userRankList, userDivisionList);
      if (FilteredItem) {
        if (FilteredItem.type == "container") {
          FilteredItem.content = securityFilter_(FilteredItem.content);
        }
        FilteredItems.push(FilteredItem);
      }
    })
    return FilteredItems;
  }
  if (typeof Target === "object") {
    const FilteredItem = itemSecurityFilter_(Target, userPermission, userRankList, userDivisionList);
    return FilteredItem;
  }
  // throw error if not object or array remember to do
}

/**
 * Filters a UI element by the access provided.
 * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
 * - **File:** GS-Security.gs
 * - **Section:** FILTER
 * 
 * @param {object} Item 
 * The UI element to filter.
 * 
 * @property {Enum_Security_Permission} permission 
 * The permission level to filter by.
 * 
 * @property {Array<Enum_Security_Rank>} rankList 
 * The list of ranks to filter by.
 * 
 * @property {Array<Enum_Security_Division>} divisionList
 * The list of divisions to filter by.
 * 
 * @return {Array<object> | null} The UI element, or null if the element was rejected.
*/
function itemSecurityFilter_(Item, userPermission, userRankList, userDivisionList) {

  // dont bother checking for admin accounts just return the item
  if (userPermission === PERMISSION.ADMIN) return Item;

  // if user doesnt have permission to view the item in the first place dont bother checking
  // none takes priority over all
  if (Item.Access.permission === PERMISSION.NONE) { return null; } 

  if (Item.Access.permission !== PERMISSION.ALL) { 
    // only check if user has permission if user isnt admin and the item doesent have ALL and NONE
    if (Item.Access.permission !== userPermission) { return null; }
  }

  // deny takes priority over allow
  let rankHasDenyAll = Item.Access.rankList.includes(RANK_DENY.ALL); // returns true if !ALL is in rank access list;
  let divisionHasDenyAll = Item.Access.rankList.includes(DIVISION_DENY.ALL); // returns true if !ALL is in division access list;

  let rankAllowed = Item.Access.rankList.includes(RANK.ALL); // returns true if ALL is in rank access list;
  let divisionAllowed = Item.Access.divisionList.includes(DIVISION.ALL); // returns true if ALL is in division access list;

  let rankBlocked = userRankList.some(rank => Item.Access.rankList.includes(`!${rank}`)) || rankHasDenyAll;
  let divisionBlocked = userDivisionList.some(division => Item.Access.divisionList.includes(`!${division}`)) || divisionHasDenyAll;

  if (!rankAllowed) {
    // if the user has at least one rank allowed in rankList
    rankAllowed = userRankList.some(rank => Item.Access.rankList.includes(rank));
  } 
  if (!divisionAllowed) {
    // if the user has at least one division allowed in divisonList
    divisionAllowed = userDivisionList.some(division => Item.Access.divisionList.includes(division));
  }
  
  let passedRankRequirements = rankAllowed && !rankBlocked
  let passedDivisionRequirements = divisionAllowed && !divisionBlocked;
  
  if (passedRankRequirements && passedDivisionRequirements) {
    // if the user passes item requirements, return item
    return Item;
  }
  return null; // if user does not pass item requirements, return null
}
