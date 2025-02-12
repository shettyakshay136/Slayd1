import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextLimit = ({ children }) => {
  // Limit the text to 16 characters
  const limitedContent = React.Children.toArray(children).join('').slice(0, 16);

  // Add ellipsis if the content exceeds 16 characters
  const displayContent = limitedContent.length === 16 ? limitedContent + '...' : limitedContent;

  return (
    <Text style={styles.text}>
      {displayContent}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color:'#2F314A',
    fontWeight:'400'
  },
});

export default TextLimit;
