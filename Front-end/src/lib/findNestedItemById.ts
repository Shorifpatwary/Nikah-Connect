const findNestedItemById = <T extends { id: number; children?: T[] }>(
  items: T[],
  id: number
): T | null => {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    if (item.children && item.children.length > 0) {
      const nestedItem = findNestedItemById(item.children, id);
      if (nestedItem) {
        return nestedItem;
      }
    }
  }
  return null;
};
export default findNestedItemById;
