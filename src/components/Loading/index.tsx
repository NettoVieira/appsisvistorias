import React, {useEffect, useState} from 'react';

import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loading: React.FC = (time, ...rest) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function startLoading() {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }

    startLoading();
  }, []);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator
        size={200}
        {...rest}
        color="#00c853"
        animating={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loading;
