import { useState, useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';

const useOnViewableItemsChanged = () => {
  const [centeredItem, setCenteredItem] = useState(null);
  const itemRefs = useRef([]);

  const checkCenterItem = useCallback((contentOffsetY, screenHeight) => {
    let centeredIndex = null;

    itemRefs.current.forEach((item, index) => {
      if (item) {
        item.measure((fx, fy, width, height, px, py) => {
          if (py + height / 2 > contentOffsetY && py + height / 2 < contentOffsetY + screenHeight) {
            centeredIndex = index;
          }
        });
      }
    });

    setCenteredItem(centeredIndex);
  }, []);

  return {
    centeredItem,
    itemRefs,
    checkCenterItem,
  };
};

export default useOnViewableItemsChanged;
