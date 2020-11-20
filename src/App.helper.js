/**
 * addFriend
 *
 * @param {any} list
 * @param {any} item
 */
export const addFriend = (list, item) => [item, ...list];

/**
 * search
 *
 * @param {any} id
 * @param {any} list
 */
export const search = (id, list) => list.find((item) => item.id === id);

/**
 * addToFav
 *
 * @param {any} friend
 */
export const addToFav = (friend) => ({
  ...friend,
  isComplete: !friend.isComplete,
});

/**
 * removeFriend
 *
 * @param {any} list
 * @param {any} updatedItem
 * @returns
 */

export const removeFriend = (list, item) => [item, ...list];
