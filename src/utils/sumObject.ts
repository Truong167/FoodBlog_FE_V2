export const sumObjects = (arr: INGREDIENT.TDetailIngredientItem[]) => {
    const res = [];
    const map = new Map();
    for (const obj of arr) {
      const key = obj.ingredientId + obj.unit;
      if (map.has(key)) {
        map.get(key).amount += obj.amount;
      } else {
        map.set(key, { ...obj });
        res.push(map.get(key));
      }
    }
    return res;
  };