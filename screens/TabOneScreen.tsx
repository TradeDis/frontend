import * as React from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen(this: any) {
  return (
    <View style={styles.container}>
        <Button
          title="Add some friends"
          onPress={() =>
            this.props.navigation.navigate('Friends')
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: '25%', 
  },
});
